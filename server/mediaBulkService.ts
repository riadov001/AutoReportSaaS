import { storage } from "./storage";
import { downloadMedia, deleteMedia, uploadMedia } from "./mediaService";
import * as path from "path";
import { quoteMedia, invoiceMedia } from "@shared/schema";
import { db } from "./db";
import { eq, inArray } from "drizzle-orm";

export async function bulkDeleteMedia(mediaIds: string[]) {
  const allMedia = [
    ...(await db.select().from(quoteMedia).where(inArray(quoteMedia.id, mediaIds))),
    ...(await db.select().from(invoiceMedia).where(inArray(invoiceMedia.id, mediaIds)))
  ];

  for (const m of allMedia) {
    try {
      await deleteMedia(m.filePath);
    } catch (e) {
      console.error(`Failed to delete physical file ${m.filePath}`, e);
    }
  }

  await db.delete(quoteMedia).where(inArray(quoteMedia.id, mediaIds));
  await db.delete(invoiceMedia).where(inArray(invoiceMedia.id, mediaIds));
  
  return { success: true, count: allMedia.length };
}

export async function bulkRenameMedia(mediaIds: string[], newNames: string[]) {
  // This is a complex operation because physical storage might need renaming or just DB record
  // Simplified: Rename in DB and try to rename in storage if possible, or just update display name
  // Actually, mediaService uses filePath as key. Changing filePath means moving the object.
  
  const results = [];
  for (let i = 0; i < mediaIds.length; i++) {
    const id = mediaIds[i];
    const newName = newNames[i];
    
    // Check quoteMedia
    const qm = await db.select().from(quoteMedia).where(eq(quoteMedia.id, id)).limit(1);
    if (qm.length > 0) {
      await db.update(quoteMedia).set({ fileName: newName }).where(eq(quoteMedia.id, id));
      results.push({ id, status: 'updated' });
      continue;
    }
    
    // Check invoiceMedia
    const im = await db.select().from(invoiceMedia).where(eq(invoiceMedia.id, id)).limit(1);
    if (im.length > 0) {
      await db.update(invoiceMedia).set({ fileName: newName }).where(eq(invoiceMedia.id, id));
      results.push({ id, status: 'updated' });
    }
  }
  return results;
}
