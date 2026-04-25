import fs from 'fs';
import path from 'path';
import { db } from './db';
import { quoteMedia, invoiceMedia } from '@shared/schema';
import { eq, like } from 'drizzle-orm';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const BACKUP_DIR = path.join(UPLOADS_DIR, 'backup_media');

function ensureUploadsDir() {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function getMimeType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.gif': 'image/gif', '.webp': 'image/webp', '.pdf': 'application/pdf',
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
    '.doc': 'application/msword', '.zip': 'application/zip',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

export async function renameMediaFile(oldPath: string, newFileName: string): Promise<string> {
  try {
    if (oldPath.startsWith('/objects/')) {
      const { ObjectStorageService } = await import('./replit_integrations/object_storage');
      const objStore = new ObjectStorageService();
      
      // Download old file
      const buffer = await objStore.downloadFileBuffer(oldPath);
      if (!buffer) throw new Error("Impossible de télécharger le fichier source");
      
      // Upload with new name in the same parent directory
      const parentDir = path.dirname(oldPath);
      const newPath = await objStore.uploadFileBuffer(buffer, newFileName, parentDir);
      
      // Delete old file
      await objStore.deleteFile(oldPath);
      return newPath;
    } else if (oldPath.startsWith('/uploads/')) {
      const fullOldPath = path.join(process.cwd(), oldPath);
      const parentDir = path.dirname(fullOldPath);
      const fullNewPath = path.join(parentDir, newFileName);
      
      if (fs.existsSync(fullOldPath)) {
        fs.renameSync(fullOldPath, fullNewPath);
        return oldPath.replace(path.basename(oldPath), newFileName);
      }
    }
    return oldPath;
  } catch (err) {
    console.error(`[MediaService] Rename failed:`, err);
    throw err;
  }
}

export async function isObjectStorageAvailable(): Promise<boolean> {
  try {
    const { ObjectStorageService } = await import('./replit_integrations/object_storage');
    const svc = new ObjectStorageService();
    const testPath = svc.getPrivateObjectDir();
    return !!testPath;
  } catch {
    return false;
  }
}

async function sendLocalMediaAlert(fileName: string, reference: string, localUrl: string) {
  try {
    const { sendEmail } = await import('./emailService');
    const adminEmail = process.env.ADMIN_EMAIL || 'contact@autoreport.com';
    await sendEmail({
      to: adminEmail,
      cc: 'rbelmahi90@gmail.com',
      subject: `🚨 ALERTE: Média en local - Réf: ${reference}`,
      html: `
        <h3>Alerte Migration Média</h3>
        <p>Le fichier <strong>${fileName}</strong> lié à la référence <strong>${reference}</strong> a été enregistré en local car aucun stockage cloud n'était disponible.</p>
        <p>URL locale : <code>${localUrl}</code></p>
        <p><strong>Action requise :</strong> Une migration vers le cloud doit être effectuée dès que possible pour garantir la pérennité des données.</p>
      `
    });
    console.log(`[MediaService] Alerte admin envoyée pour ${fileName} (CC: rbelmahi90@gmail.com)`);
  } catch (err) {
    console.error(`[MediaService] Erreur lors de l'envoi de l'alerte admin:`, err);
  }
}

export async function uploadMedia(
  fileData: Buffer,
  fileName: string,
  folder: string = 'uploads',
  garageSlug?: string,
  reference: string = 'Inconnue'
): Promise<string> {
  const tenantFolder = garageSlug ? `${garageSlug}/${folder}` : folder;
  
  // 1. Priorité : Object Storage (Replit)
  try {
    const { ObjectStorageService } = await import('./replit_integrations/object_storage');
    const objStore = new ObjectStorageService();
    
    const isPublic = folder.includes('public') || folder.includes('quote') || folder.includes('invoice');
    const publicDir = objStore.getPublicObjectSearchPaths()[0] || 'public';
    const uploadFolder = isPublic ? `${publicDir}/${tenantFolder}` : tenantFolder;
    
    const objectPath = await objStore.uploadFileBuffer(fileData, fileName, uploadFolder);
    console.log(`[MediaService] Upload Object Storage OK: ${objectPath}`);
    return objectPath;
  } catch (objErr: any) {
    console.warn(`[MediaService] Object Storage indisponible: ${objErr.message}`);
  }

  // 2. Fallback : Cloudflare R2
  try {
    const { isCloudflareR2Configured, uploadToR2 } = await import('./cloudflareR2Service');
    if (isCloudflareR2Configured()) {
      const result = await uploadToR2(fileData, fileName, tenantFolder);
      console.log(`[MediaService] Upload Cloudflare R2 OK: ${result.url}`);
      return result.url;
    }
  } catch (r2Err: any) {
    console.warn(`[MediaService] Cloudflare R2 indisponible: ${r2Err.message}`);
  }

  // 3. Fallback : Firebase Storage
  try {
    const { isFirebaseConfigured, uploadToFirebaseStorage } = await import('./firebase');
    if (isFirebaseConfigured()) {
      const firebasePath = await uploadToFirebaseStorage(fileData, fileName, tenantFolder);
      console.log(`[MediaService] Upload Firebase OK: ${firebasePath}`);
      return firebasePath;
    }
  } catch (fbErr: any) {
    console.warn(`[MediaService] Firebase indisponible: ${fbErr.message}`);
  }

  // 4. Dernier recours : Local + Alerte Admin
  ensureUploadsDir();
  const tenantDir = garageSlug ? path.join(UPLOADS_DIR, garageSlug) : UPLOADS_DIR;
  if (!fs.existsSync(tenantDir)) fs.mkdirSync(tenantDir, { recursive: true });
  
  const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}_${fileName}`;
  const localPath = path.join(tenantDir, uniqueName);
  fs.writeFileSync(localPath, fileData);
  
  const localUrl = garageSlug ? `/uploads/${garageSlug}/${uniqueName}` : `/uploads/${uniqueName}`;
  console.error(`[MediaService] TOUS LES CLOUDS ÉCHOUÉS. Enregistré en LOCAL: ${localUrl}`);
  
  // Envoi de l'alerte
  sendLocalMediaAlert(fileName, reference, localUrl);
  
  // Background migration attempt
  isObjectStorageAvailable().then(available => {
    if (available) {
      migrateLocalToObjectStorage().catch(err => 
        console.error("[MediaService] Background migration failed:", err)
      );
    }
  });
  
  return localUrl;
}

export async function downloadMedia(filePath: string): Promise<Buffer | null> {
  try {
    if (filePath.startsWith('/objects/')) {
      const { ObjectStorageService } = await import('./replit_integrations/object_storage');
      const objStore = new ObjectStorageService();
      return await objStore.downloadFileBuffer(filePath);
    } else if (filePath.startsWith('/r2/')) {
      const { downloadFromR2, extractR2Key } = await import('./cloudflareR2Service');
      const key = extractR2Key(filePath);
      if (key) {
        const { data } = await downloadFromR2(key);
        return data;
      }
    } else if (filePath.startsWith('/gdrive/')) {
      const { extractFileId, downloadFromGoogleDrive } = await import('./googleDriveStorage');
      const fileId = extractFileId(filePath);
      if (fileId) {
        const result = await downloadFromGoogleDrive(fileId);
        return result.data;
      }
    } else if (filePath.startsWith('https://')) {
      const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
      if (publicUrl && filePath.startsWith(publicUrl)) {
        const { downloadFromR2, extractR2Key } = await import('./cloudflareR2Service');
        const key = extractR2Key(filePath);
        if (key) {
          const { data } = await downloadFromR2(key);
          return data;
        }
      }
      const response = await fetch(filePath);
      if (response.ok) return Buffer.from(await response.arrayBuffer());
    } else if (filePath.startsWith('/uploads/')) {
      // Check for file in uploads or backup_media
      const localPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(localPath)) return fs.readFileSync(localPath);
      
      const fileName = path.basename(filePath);
      const backupPath = path.join(BACKUP_DIR, fileName);
      if (fs.existsSync(backupPath)) return fs.readFileSync(backupPath);
    } else {
      const localPath = filePath.startsWith('/') ? `.${filePath}` : filePath;
      if (fs.existsSync(localPath)) return fs.readFileSync(localPath);
    }
  } catch (err) {
    console.error(`[MediaService] Download failed ${filePath}:`, err);
  }
  return null;
}

export async function deleteMedia(filePath: string): Promise<void> {
  try {
    if (filePath.startsWith('/objects/')) {
      const { ObjectStorageService } = await import('./replit_integrations/object_storage');
      const objStore = new ObjectStorageService();
      await objStore.deleteFile(filePath);
    } else if (filePath.startsWith('/r2/')) {
      const { deleteFromR2, extractR2Key } = await import('./cloudflareR2Service');
      const key = extractR2Key(filePath);
      if (key) await deleteFromR2(key);
    } else if (filePath.startsWith('/gdrive/')) {
      const { extractFileId, deleteFromGoogleDrive } = await import('./googleDriveStorage');
      const fileId = extractFileId(filePath);
      if (fileId) await deleteFromGoogleDrive(fileId);
    } else if (filePath.startsWith('https://')) {
      const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
      if (publicUrl && filePath.startsWith(publicUrl)) {
        const { deleteFromR2, extractR2Key } = await import('./cloudflareR2Service');
        const key = extractR2Key(filePath);
        if (key) await deleteFromR2(key);
      }
    } else {
      const localPath = filePath.startsWith('/') ? `.${filePath}` : filePath;
      if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
    }
  } catch (err) {
    console.error(`[MediaService] Delete failed ${filePath}:`, err);
  }
}

export function serveMediaHeaders(filePath: string): { contentType: string } {
  return { contentType: getMimeType(filePath) };
}

export async function migrateLocalToObjectStorage(): Promise<{
  migrated: number;
  errors: number;
  skipped: number;
  details: Array<{ file: string; oldPath: string; newPath: string; status: string }>;
}> {
  console.log(`[MediaMigration] Demarrage migration local -> Object Storage...`);

  const results: Array<{ file: string; oldPath: string; newPath: string; status: string }> = [];
  let migrated = 0;
  let errors = 0;
  let skipped = 0;

  let objStoreAvailable = false;
  let objStore: any;
  try {
    const { ObjectStorageService } = await import('./replit_integrations/object_storage');
    objStore = new ObjectStorageService();
    objStoreAvailable = true;
  } catch {
    console.warn(`[MediaMigration] Object Storage non disponible, tentative via Cloudflare R2 API...`);
  }

  let r2Available = false;
  try {
    const { isCloudflareR2Configured } = await import('./cloudflareR2Service');
    r2Available = isCloudflareR2Configured();
  } catch {}

  if (!objStoreAvailable && !r2Available) {
    console.error(`[MediaMigration] Aucun stockage cloud disponible, migration impossible`);
    return { migrated: 0, errors: 0, skipped: 0, details: [] };
  }

  const allLocalMedia = [
    ...(await db.select({ id: quoteMedia.id, filePath: quoteMedia.filePath, fileName: quoteMedia.fileName, table: quoteMedia.fileType }).from(quoteMedia)).filter(m => m.filePath.startsWith('/uploads/')).map(m => ({ ...m, entityTable: 'quote_media' as const })),
    ...(await db.select({ id: invoiceMedia.id, filePath: invoiceMedia.filePath, fileName: invoiceMedia.fileName, table: invoiceMedia.fileType }).from(invoiceMedia)).filter(m => m.filePath.startsWith('/uploads/')).map(m => ({ ...m, entityTable: 'invoice_media' as const })),
  ];

  console.log(`[MediaMigration] ${allLocalMedia.length} fichiers locaux a migrer`);

  for (const media of allLocalMedia) {
    const localFilePath = path.join(process.cwd(), media.filePath);

    if (!fs.existsSync(localFilePath)) {
      console.warn(`[MediaMigration] Fichier introuvable: ${media.filePath}`);
      results.push({ file: media.fileName, oldPath: media.filePath, newPath: '', status: 'missing' });
      skipped++;
      continue;
    }

    try {
      const fileData = fs.readFileSync(localFilePath);
      let newPath: string;

      if (objStoreAvailable) {
        newPath = await objStore.uploadFileBuffer(fileData, media.fileName, 'uploads');
      } else {
        const { uploadToR2 } = await import('./cloudflareR2Service');
        const result = await uploadToR2(fileData, media.fileName, 'uploads');
        newPath = result.url;
      }

      if (media.entityTable === 'quote_media') {
        await db.update(quoteMedia).set({ filePath: newPath }).where(eq(quoteMedia.id, media.id));
      } else {
        await db.update(invoiceMedia).set({ filePath: newPath }).where(eq(invoiceMedia.id, media.id));
      }

      fs.unlinkSync(localFilePath);

      results.push({ file: media.fileName, oldPath: media.filePath, newPath, status: 'migrated' });
      migrated++;
      console.log(`[MediaMigration] ${media.filePath} -> ${newPath}`);
    } catch (err: any) {
      results.push({ file: media.fileName, oldPath: media.filePath, newPath: '', status: `error: ${err.message}` });
      errors++;
      console.error(`[MediaMigration] Erreur migration ${media.filePath}:`, err.message);
    }
  }

  const localFiles = fs.existsSync(UPLOADS_DIR)
    ? fs.readdirSync(UPLOADS_DIR).filter(f => !f.startsWith('.') && f !== 'ocr')
    : [];

  for (const file of localFiles) {
    const localFilePath = path.join(UPLOADS_DIR, file);
    const stat = fs.statSync(localFilePath);
    if (stat.isDirectory()) continue;

    const isReferenced = allLocalMedia.some(m => m.filePath === `/uploads/${file}`);
    if (isReferenced) continue;

    try {
      const fileData = fs.readFileSync(localFilePath);
      let newPath: string;

      if (objStoreAvailable) {
        newPath = await objStore.uploadFileBuffer(fileData, file, 'uploads');
      } else {
        const { uploadToR2 } = await import('./cloudflareR2Service');
        const result = await uploadToR2(fileData, file, 'uploads');
        newPath = result.url;
      }

      fs.unlinkSync(localFilePath);
      results.push({ file, oldPath: `/uploads/${file}`, newPath, status: 'migrated-orphan' });
      migrated++;
      console.log(`[MediaMigration] Orphelin: /uploads/${file} -> ${newPath}`);
    } catch (err: any) {
      errors++;
      console.error(`[MediaMigration] Erreur fichier orphelin ${file}:`, err.message);
    }
  }

  console.log(`[MediaMigration] Termine: ${migrated} migres, ${errors} erreurs, ${skipped} ignores`);
  return { migrated, errors, skipped, details: results };
}
