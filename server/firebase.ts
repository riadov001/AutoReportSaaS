import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const firebaseConfig = {
  projectId: "autoreport-96119",
  storageBucket: "autoreport-96119.appspot.com",
};

let app: ReturnType<typeof initializeApp> | undefined;

export function initializeFirebase() {
  if (getApps().length === 0) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      try {
        const serviceAccount = JSON.parse(serviceAccountKey);
        app = initializeApp({
          credential: cert(serviceAccount),
          storageBucket: firebaseConfig.storageBucket,
        });
        console.log("[Firebase] Initialized with service account");
      } catch (error) {
        console.error("[Firebase] Error parsing service account key:", error);
        app = initializeApp({
          projectId: firebaseConfig.projectId,
          storageBucket: firebaseConfig.storageBucket,
        });
        console.log("[Firebase] Initialized without credentials (limited access)");
      }
    } else {
      app = initializeApp({
        projectId: firebaseConfig.projectId,
        storageBucket: firebaseConfig.storageBucket,
      });
      console.log("[Firebase] Initialized without service account (set FIREBASE_SERVICE_ACCOUNT_KEY for full access)");
    }
  }
  return app;
}

export function getFirebaseStorage() {
  if (!app) {
    initializeFirebase();
  }
  return getStorage();
}

export function isFirebaseConfigured(): boolean {
  return !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
}

export async function uploadToFirebaseStorage(
  fileBuffer: Buffer,
  fileName: string,
  folder: string = "uploads"
): Promise<string> {
  const storage = getFirebaseStorage();
  const bucket = storage.bucket();
  
  const ext = path.extname(fileName).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.gif': 'image/gif', '.webp': 'image/webp', '.pdf': 'application/pdf',
  };
  const mimeType = mimeTypes[ext] || 'application/octet-stream';

  const filePath = `${folder}/${Date.now()}_${fileName}`;
  const file = bucket.file(filePath);
  
  await file.save(fileBuffer, {
    metadata: {
      contentType: mimeType,
    },
  });
  
  try {
    await file.makePublic();
    return `https://storage.googleapis.com/${firebaseConfig.storageBucket}/${filePath}`;
  } catch (err) {
    console.warn("[Firebase] Could not make file public, using signed URL instead");
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    });
    return url;
  }
}

export async function deleteFromFirebaseStorage(fileUrl: string): Promise<void> {
  try {
    const storage = getFirebaseStorage();
    const bucket = storage.bucket();
    
    const urlPrefix = `https://storage.googleapis.com/${firebaseConfig.storageBucket}/`;
    if (fileUrl.startsWith(urlPrefix)) {
      const filePath = fileUrl.replace(urlPrefix, "");
      const file = bucket.file(filePath);
      await file.delete();
      console.log(`[Firebase] Deleted file: ${filePath}`);
    }
  } catch (error) {
    console.error("[Firebase] Error deleting file:", error);
  }
}

export { firebaseConfig };
