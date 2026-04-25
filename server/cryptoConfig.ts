import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const KEY_ENV = process.env.CONFIG_ENCRYPTION_KEY || "";

function deriveKey(): Buffer {
  if (!KEY_ENV) {
    return crypto.scryptSync("autoreport-default-insecure-key", "autoreport-salt", 32);
  }
  return crypto.scryptSync(KEY_ENV, "autoreport-salt", 32);
}

export function encryptValue(plaintext: string): string {
  const key = deriveKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

export function decryptValue(ciphertext: string): string {
  const key = deriveKey();
  const buf = Buffer.from(ciphertext, "base64");
  const iv = buf.subarray(0, 12);
  const authTag = buf.subarray(12, 28);
  const encrypted = buf.subarray(28);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

export function isEncryptionKeySet(): boolean {
  return !!KEY_ENV;
}
