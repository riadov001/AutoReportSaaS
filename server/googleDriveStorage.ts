import { google, drive_v3 } from "googleapis";
import { Readable } from "stream";

let driveClient: drive_v3.Drive | null = null;
let rootFolderId: string | null = null;
const subFolderCache: Record<string, string> = {};

const KNOWN_ROOT_FOLDER_ID = "1NwXGj35U9A-rYOhh5hNRkSs9DB3F0J5o";

function getOAuth2Client() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Drive OAuth not configured (GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN required)");
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

function getDriveClient(): drive_v3.Drive {
  if (driveClient) return driveClient;

  const auth = getOAuth2Client();
  driveClient = google.drive({ version: "v3", auth });
  console.log("[GoogleDrive] Drive client initialized with OAuth2");
  return driveClient;
}

async function getOrCreateRootFolder(): Promise<string> {
  if (rootFolderId) return rootFolderId;

  const drive = getDriveClient();

  try {
    const folder = await drive.files.get({
      fileId: KNOWN_ROOT_FOLDER_ID,
      fields: "id,name",
    });
    if (folder.data.id) {
      rootFolderId = folder.data.id;
      console.log(`[GoogleDrive] Root folder verified: ${rootFolderId} (${folder.data.name})`);
      return rootFolderId;
    }
  } catch (e: any) {
    console.warn(`[GoogleDrive] Known folder ID not accessible, searching by name...`, e.message);
  }

  const folderName = process.env.GOOGLE_DRIVE_FOLDER_NAME || "AutoReport";
  console.log(`[GoogleDrive] Searching for root folder: ${folderName}`);
  const list = await drive.files.list({
    q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id,name)",
    spaces: "drive",
  });

  if (list.data.files && list.data.files.length > 0) {
    rootFolderId = list.data.files[0].id!;
    console.log(`[GoogleDrive] Root folder found: ${rootFolderId}`);
    return rootFolderId;
  }

  console.log(`[GoogleDrive] Folder '${folderName}' not found, creating...`);
  const folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id",
  });

  rootFolderId = folder.data.id!;
  console.log(`[GoogleDrive] Root folder created: ${rootFolderId}`);
  return rootFolderId;
}

async function getOrCreateSubFolder(subfolderName: string): Promise<string> {
  if (subFolderCache[subfolderName]) return subFolderCache[subfolderName];

  const drive = getDriveClient();
  const parentId = await getOrCreateRootFolder();

  const list = await drive.files.list({
    q: `'${parentId}' in parents and name='${subfolderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: "files(id,name)",
  });

  if (list.data.files && list.data.files.length > 0) {
    subFolderCache[subfolderName] = list.data.files[0].id!;
    console.log(`[GoogleDrive] Subfolder '${subfolderName}' found: ${subFolderCache[subfolderName]}`);
    return subFolderCache[subfolderName];
  }

  const folder = await drive.files.create({
    requestBody: {
      name: subfolderName,
      parents: [parentId],
      mimeType: "application/vnd.google-apps.folder",
    },
    fields: "id",
  });

  subFolderCache[subfolderName] = folder.data.id!;
  console.log(`[GoogleDrive] Subfolder '${subfolderName}' created: ${subFolderCache[subfolderName]}`);
  return subFolderCache[subfolderName];
}

function getMimeType(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    mp4: "video/mp4",
    webm: "video/webm",
    mov: "video/quicktime",
    pdf: "application/pdf",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

export async function uploadToGoogleDrive(
  fileBuffer: Buffer,
  fileName: string,
  folder: string = "uploads"
): Promise<{ fileId: string; filePath: string }> {
  const drive = getDriveClient();
  const folderId = await getOrCreateSubFolder(folder);

  const uniqueName = fileName;
  const mimeType = getMimeType(fileName);

  const stream = new Readable();
  stream.push(fileBuffer);
  stream.push(null);

  console.log(`[GoogleDrive] Uploading ${uniqueName} to folder ${folderId}...`);

  const res = await drive.files.create({
    requestBody: {
      name: uniqueName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: stream,
    },
    fields: "id",
  });

  const fileId = res.data.id!;
  console.log(`[GoogleDrive] File uploaded successfully: ${fileId} (${uniqueName})`);

  return {
    fileId,
    filePath: `/gdrive/${fileId}/${encodeURIComponent(fileName)}`,
  };
}

export async function downloadFromGoogleDrive(fileId: string): Promise<{ data: Buffer; mimeType: string }> {
  const drive = getDriveClient();

  const meta = await drive.files.get({
    fileId,
    fields: "mimeType,size",
  });

  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "arraybuffer" }
  );

  return {
    data: Buffer.from(response.data as ArrayBuffer),
    mimeType: meta.data.mimeType || "application/octet-stream",
  };
}

export async function deleteFromGoogleDrive(fileId: string): Promise<void> {
  const drive = getDriveClient();
  try {
    await drive.files.delete({ fileId });
    console.log(`[GoogleDrive] File deleted: ${fileId}`);
  } catch (error: any) {
    console.error(`[GoogleDrive] Error deleting file ${fileId}:`, error.message);
  }
}

export function isGoogleDrivePath(filePath: string): boolean {
  return filePath.startsWith("/gdrive/");
}

export function extractFileId(filePath: string): string | null {
  if (!isGoogleDrivePath(filePath)) return null;
  const parts = filePath.split("/");
  return parts[2] || null;
}

export function isGoogleDriveConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  );
}

export function getGoogleAuthUrl(): string {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET required");
  }

  const gDomain = process.env.REPLIT_DOMAINS?.split(",")[0]?.trim() || process.env.REPLIT_DEV_DOMAIN || "localhost:5000";
  const gProto = gDomain.includes("localhost") ? "http" : "https";
  const redirectUri = `${gProto}://${gDomain}/api/admin/gdrive/callback`;
  
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive"],
    prompt: "consent",
  });
}

export async function exchangeCodeForTokens(code: string): Promise<{ refreshToken: string }> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET required");
  }

  const gDomain = process.env.REPLIT_DOMAINS?.split(",")[0]?.trim() || process.env.REPLIT_DEV_DOMAIN || "localhost:5000";
  const gProto = gDomain.includes("localhost") ? "http" : "https";
  const redirectUri = `${gProto}://${gDomain}/api/admin/gdrive/callback`;
  
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  const { tokens } = await oauth2Client.getToken(code);

  if (!tokens.refresh_token) {
    throw new Error("No refresh token received. Try revoking access at https://myaccount.google.com/permissions then retry.");
  }

  return { refreshToken: tokens.refresh_token };
}
