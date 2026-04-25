import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";

const LOGO_PATH = path.join(process.cwd(), "attached_assets", "logo-autoreport-n2iUZrkN_1759796960103.png");

export async function addWatermarkToImage(
  imageBuffer: Buffer,
  reference: string,
  mimeType: string
): Promise<Buffer> {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) {
      console.log("[Watermark] Could not get image dimensions, returning original");
      return imageBuffer;
    }

    const width = metadata.width;
    const height = metadata.height;
    const compositeOperations: sharp.OverlayOptions[] = [];

    // ── Reference text bar at the bottom ─────────────────────────────────────
    const fontSize = Math.max(18, Math.round(Math.min(width, height) * 0.045));
    const barH = fontSize + 32;

    // Logo sizing: 25% of smaller dimension, max 200px
    const logoSize = Math.max(80, Math.min(Math.min(width, height) * 0.25, 200));

    // Text bar SVG (full width, bottom of image)
    // Reference on the left, "AutoReport" brand on the right (leaving space for logo)
    const logoZoneW = Math.round(logoSize * 1.3); // reserve space on the right for the logo
    const textSvg = `
      <svg width="${width}" height="${barH}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="ts" x="-5%" y="-20%" width="110%" height="140%">
            <feDropShadow dx="1" dy="1" stdDeviation="2" flood-color="black" flood-opacity="0.8"/>
          </filter>
        </defs>
        <rect x="0" y="0" width="${width}" height="${barH}" fill="rgba(0,0,0,0.55)"/>
        <text
          x="16"
          y="${Math.round(barH * 0.68)}"
          font-family="Arial Black, Arial, sans-serif"
          font-size="${fontSize}"
          font-weight="900"
          fill="white"
          filter="url(#ts)"
          letter-spacing="1"
        >${reference}</text>
        <text
          x="${width - logoZoneW - 12}"
          y="${Math.round(barH * 0.68)}"
          font-family="Arial, sans-serif"
          font-size="${Math.round(fontSize * 0.7)}"
          font-weight="bold"
          fill="rgba(255,255,255,0.7)"
          text-anchor="end"
        >autoreport.fr</text>
      </svg>
    `;

    compositeOperations.push({
      input: Buffer.from(textSvg),
      gravity: "south",
      blend: "over",
    });

    // ── Logo at bottom-right, slightly above the text bar ────────────────────
    if (fs.existsSync(LOGO_PATH)) {
      // Apply 80% opacity to logo (watermark effect)
      const logoRaw = await sharp(LOGO_PATH)
        .resize(Math.round(logoSize), Math.round(logoSize), { fit: "inside" })
        .ensureAlpha()
        .toBuffer();

      // Modulate alpha to 80% opacity
      const logoPng = await sharp(logoRaw)
        .png()
        .toBuffer();

      const logoMeta = await sharp(logoPng).metadata();
      const logoW = logoMeta.width || Math.round(logoSize);
      const logoH = logoMeta.height || Math.round(logoSize);

      const paddingRight = 16;
      const paddingBottom = barH + 12; // sit just above the text bar

      compositeOperations.push({
        input: logoPng,
        left: Math.max(0, width - logoW - paddingRight),
        top: Math.max(0, height - logoH - paddingBottom),
        blend: "over",
      });
    }

    let result = image.composite(compositeOperations);

    if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
      result = result.jpeg({ quality: 90 });
    } else if (mimeType === "image/png") {
      result = result.png();
    } else if (mimeType === "image/webp") {
      result = result.webp({ quality: 90 });
    } else {
      result = result.jpeg({ quality: 90 });
    }

    const outputBuffer = await result.toBuffer();
    console.log(`[Watermark] Filigrane appliqué (logo + référence): ${reference}`);
    return outputBuffer;

  } catch (error) {
    console.error("[Watermark] Error processing image:", error);
    return imageBuffer;
  }
}
