import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import fs from 'fs';
import path from 'path';
import { Resend } from "resend";

// Resend connector integration
let connectionSettings: any;

async function getResendCredentials(): Promise<{ apiKey: string; fromEmail: string } | null> {
  try {
    // Priority 1: Direct API Key
    if (process.env.RESEND_API_KEY) {
      return { apiKey: process.env.RESEND_API_KEY, fromEmail: process.env.RESEND_FROM_EMAIL || "AutoReport <contact@autoreport.mytoolsgroup.eu>" };
    }

    // Priority 2: Backup API Key
    if (process.env.RESEND_API_KEY_BACKUP) {
      console.log('[Email] Using backup Resend API key');
      return { apiKey: process.env.RESEND_API_KEY_BACKUP, fromEmail: process.env.RESEND_FROM_EMAIL_BACKUP || "AutoReport <contact@autoreport.mytoolsgroup.eu>" };
    }

    const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
    const xReplitToken = process.env.REPL_IDENTITY
      ? 'repl ' + process.env.REPL_IDENTITY
      : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

    if (!xReplitToken || !hostname) return null;

    connectionSettings = await fetch(
      'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
      {
        headers: {
          'Accept': 'application/json',
          'X_REPLIT_TOKEN': xReplitToken
        }
      }
    ).then(res => res.json()).then(data => data.items?.[0]);

    if (!connectionSettings || !connectionSettings.settings?.api_key) return null;
    return {
      apiKey: connectionSettings.settings.api_key,
      fromEmail: connectionSettings.settings.from_email || "AutoReport <contact@autoreport.mytoolsgroup.eu>"
    };
  } catch (err) {
    console.error('[Email] Erreur credentials Resend:', err);
    return null;
  }
}

async function getResendClient(): Promise<{ client: Resend; fromEmail: string } | null> {
  const creds = await getResendCredentials();
  if (!creds) return null;
  return { client: new Resend(creds.apiKey), fromEmail: creds.fromEmail };
}

const COLORS = {
  primary: [220, 38, 38] as [number, number, number],
  primaryLight: [254, 242, 242] as [number, number, number],
  dark: [31, 41, 55] as [number, number, number],
  gray: [107, 114, 128] as [number, number, number],
  lightGray: [243, 244, 246] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  border: [229, 231, 235] as [number, number, number],
};

const COMPANY_INFO = {
  name: 'AutoReport',
  tagline: "L'EXPERT DE LA JANTE ALU",
  address: '46 rue de la Convention',
  city: '62800 Liévin',
  phone: '03 21 40 80 53',
  email: 'contact@autoreport.com',
  website: 'www.autoreport.fr',
  bankName: 'SG WATTIGNIES (02958)',
  iban: 'FR76 3000 3029 5800 0201 6936 525',
  swift: 'SOGEFRPP',
  siret: '913 678 199 00021',
  tva: 'FR73 913 678 199',
};

function getLogoBase64(): string | null {
  try {
    const logoPath = path.resolve(process.cwd(), 'public/logo.png');
    if (fs.existsSync(logoPath)) {
      const bitmap = fs.readFileSync(logoPath);
      return `data:image/png;base64,${bitmap.toString('base64')}`;
    }
    return null;
  } catch (error) {
    console.error('Error reading logo file:', error);
    return null;
  }
}

function drawRoundedRect(doc: jsPDF, x: number, y: number, w: number, h: number, r: number, fillColor?: [number, number, number], strokeColor?: [number, number, number]) {
  if (fillColor) doc.setFillColor(...fillColor);
  if (strokeColor) {
    doc.setDrawColor(...strokeColor);
    doc.setLineWidth(0.3);
  }
  doc.roundedRect(x, y, w, h, r, r, fillColor && strokeColor ? 'FD' : fillColor ? 'F' : 'S');
}

function drawPremiumFooter(doc: jsPDF, companyInfo: any, margin: number) {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const footerHeight = 35; // Unified height with frontend
  const footerTop = pageHeight - footerHeight;
  const contentWidth = pageWidth - margin * 2;
  const colWidth = contentWidth / 3;
  const col1X = margin;
  const col2X = margin + colWidth;
  const col3X = margin + colWidth * 2;
  const titleColor: [number, number, number] = [85, 85, 85];
  const textColor: [number, number, number] = [119, 119, 119];
  const lineColor: [number, number, number] = [229, 229, 229];
  const bgColor: [number, number, number] = [247, 247, 247];

  doc.setFillColor(...bgColor);
  doc.rect(0, footerTop, pageWidth, footerHeight, 'F');

  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.3);
  doc.line(margin, footerTop, pageWidth - margin, footerTop);

  const titleY = footerTop + 7;
  const lineSpacing = 4;
  const textStartY = titleY + 5;

  doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(...titleColor);
  doc.text('PAIEMENT', col1X, titleY);
  doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(...textColor);
  doc.text('Carte bancaire • Espèces • Virement', col1X, textStartY);
  doc.setFont('helvetica', 'bold').setTextColor(...titleColor);
  doc.text('Paiement en ligne via Stripe / Klarna', col1X, textStartY + lineSpacing);

  doc.setDrawColor(...lineColor);
  doc.setLineWidth(0.2);
  doc.line(col2X - 3, footerTop + 3, col2X - 3, pageHeight - 4);

  doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(...titleColor);
  doc.text('COORDONNÉES BANCAIRES', col2X, titleY);
  doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(...textColor);
  doc.text(companyInfo.bankName, col2X, textStartY);
  doc.text(`IBAN : ${companyInfo.iban}`, col2X, textStartY + lineSpacing);
  doc.text(`BIC : ${companyInfo.swift}`, col2X, textStartY + lineSpacing * 2);

  doc.line(col3X - 3, footerTop + 3, col3X - 3, pageHeight - 4);

  doc.setFontSize(7).setFont('helvetica', 'bold').setTextColor(...titleColor);
  doc.text('INFORMATIONS LÉGALES', col3X, titleY);
  doc.setFontSize(6.5).setFont('helvetica', 'normal').setTextColor(...textColor);
  doc.text(`SIRET : ${companyInfo.siret} • TVA : ${companyInfo.tva}`, col3X, textStartY);
  doc.text(`${companyInfo.address}, ${companyInfo.city}`, col3X, textStartY + lineSpacing);
  doc.text(`${companyInfo.phone} • ${companyInfo.website}`, col3X, textStartY + lineSpacing * 2);
}

interface DocumentPDFData {
  reference: string;
  date: string;
  secondaryDate?: string;
  secondaryDateLabel?: string;
  clientName: string;
  clientDetails?: string[];
  items: Array<{ description: string; quantity: number; unitPrice: string; total: string; taxRate?: string }>;
  totalHT: number;
  totalTTC: number;
  showSignature: boolean;
}

function generateDocumentPDFCore(doc: jsPDF, data: DocumentPDFData, companyInfo: any) {
  const pageWidth = doc.internal.pageSize.width;
  const margin = 15;

  try {
    const logoBase64 = getLogoBase64();
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', margin, 12, 50, 50 / 1.414);
    }
  } catch (error) {
    doc.setFontSize(20).setFont('helvetica', 'bold').setTextColor(...COLORS.primary).text(companyInfo.name, margin, 25);
  }

  doc.setFontSize(14).setFont('helvetica', 'bold').setTextColor(...COLORS.dark).text(data.reference, pageWidth - margin, 22, { align: 'right' });
  doc.setFontSize(10).setFont('helvetica', 'normal').text(`Date : ${data.date}`, pageWidth - margin, 28, { align: 'right' });
  if (data.secondaryDate) {
    doc.text(`${data.secondaryDateLabel || 'Validité'} : ${data.secondaryDate}`, pageWidth - margin, 34, { align: 'right' });
  }

  const infoStartY = 45;
  const infoBoxWidth = (pageWidth - margin * 2 - 10) / 2;

  doc.setFontSize(9).setTextColor(...COLORS.gray).text('AUTOREPORT', margin, infoStartY + 17);
  doc.text([companyInfo.address, companyInfo.city, companyInfo.phone, companyInfo.email, companyInfo.website], margin, infoStartY + 24);

  const destX = pageWidth - margin - infoBoxWidth;
  const clientName = data.clientName || 'Client';
  doc.setFontSize(11).setTextColor(...COLORS.dark).text(clientName, destX, infoStartY + 17);
  if (data.clientDetails && data.clientDetails.length > 0) {
    doc.setFontSize(9).setTextColor(...COLORS.gray).text(data.clientDetails.slice(0, 5), destX, infoStartY + 24);
  }

  const tableData = data.items.map((item, index) => [
    index + 1,
    item.description,
    item.quantity.toFixed(2).replace('.', ','),
    `${item.unitPrice} \u20AC`,
    `${parseFloat(item.taxRate || '20').toFixed(0)} %`,
    `${item.total} \u20AC`,
  ]);

  autoTable(doc, {
    startY: infoStartY + 55,
    head: [['No.', 'Description', 'Qté', 'Prix unit. HT', 'TVA', 'Montant']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: COLORS.primary,
      textColor: COLORS.white,
      fontStyle: 'bold',
      fontSize: 8,
      cellPadding: 3,
      halign: 'center',
      valign: 'middle',
      lineColor: COLORS.primary,
      lineWidth: 0.1,
    },
    bodyStyles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: COLORS.dark,
      lineColor: COLORS.border,
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: COLORS.lightGray,
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 'auto', halign: 'left' },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 25, halign: 'right' },
      4: { cellWidth: 18, halign: 'center' },
      5: { cellWidth: 25, halign: 'right' },
    },
    tableLineColor: COLORS.border,
    tableLineWidth: 0.5,
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  const totalsBoxWidth = 90;
  const totalsBoxX = pageWidth - margin - totalsBoxWidth;
  const totalsX = pageWidth - margin;

  const totalHT = data.totalHT;
  const totalTTC = data.totalTTC;
  const totalVAT = totalTTC - totalHT;

  doc.setFontSize(10).setFont('helvetica', 'normal').setTextColor(...COLORS.dark);
  doc.text('Total HT', totalsBoxX, finalY);
  doc.text(`${totalHT.toFixed(2)} \u20AC`, totalsX, finalY, { align: 'right' });

  doc.setDrawColor(...COLORS.border);
  doc.line(totalsBoxX, finalY + 3, totalsX, finalY + 3);

  doc.text('TVA', totalsBoxX, finalY + 10);
  doc.text(`${totalVAT.toFixed(2)} \u20AC`, totalsX, finalY + 10, { align: 'right' });

  doc.line(totalsBoxX, finalY + 13, totalsX, finalY + 13);

  drawRoundedRect(doc, totalsBoxX - 5, finalY + 16, totalsBoxWidth + 5, 14, 3, COLORS.primary);
  doc.setFontSize(11).setFont('helvetica', 'bold').setTextColor(...COLORS.white);
  const totalTtcY = finalY + 25;
  doc.text('Total TTC', totalsBoxX + 2, totalTtcY);
  doc.text(`${totalTTC.toFixed(2)} \u20AC`, totalsX - 2, totalTtcY, { align: 'right' });

  doc.setTextColor(0, 0, 0);

  if (data.showSignature) {
    const signatureY = finalY + 45;
    doc.setFont('helvetica', 'normal').setFontSize(10).setTextColor(...COLORS.dark);
    doc.text('Date et signature du client', margin, signatureY);
    doc.text("(Précédée de la mention 'Bon pour accord')", margin, signatureY + 5);
  }

  drawPremiumFooter(doc, companyInfo, margin);
}

export function generateQuotePDF(data: {
  quoteNumber: string;
  quoteDate: string;
  expiryDate?: string;
  clientName: string;
  clientDetails?: string[];
  status?: string;
  items: Array<{ description: string; quantity: number; unitPrice: string; total: string; taxRate?: string }>;
  amount: string;
  totalHT?: string;
  totalTTC?: string;
  companyName: string;
}): Buffer {
  const doc = new jsPDF();
  let totalTTC = 0;
  let totalHT = 0;
  if (data.totalHT && data.amount) {
    totalTTC = parseFloat(data.amount.replace(/[^\d.,-]/g, '').replace(',', '.'));
    totalHT = parseFloat(data.totalHT.replace(/[^\d.,-]/g, '').replace(',', '.'));
  } else {
    totalTTC = parseFloat(data.amount.replace(/[^\d.,-]/g, '').replace(',', '.'));
    totalHT = totalTTC / 1.2;
  }

  generateDocumentPDFCore(doc, {
    reference: data.quoteNumber,
    date: data.quoteDate,
    secondaryDate: data.expiryDate,
    secondaryDateLabel: 'Validité',
    clientName: data.clientName,
    clientDetails: data.clientDetails,
    items: data.items,
    totalHT,
    totalTTC,
    showSignature: true,
  }, COMPANY_INFO);

  return Buffer.from(doc.output('arraybuffer'));
}

export function generateInvoicePDF(data: {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  clientName: string;
  clientDetails?: string[];
  status?: string;
  items: Array<{ description: string; quantity: number; unitPrice: string; total: string; taxRate?: string }>;
  amount: string;
  companyName: string;
}): Buffer {
  const doc = new jsPDF();
  const totalTTC = parseFloat(data.amount.replace(/[^\d.,-]/g, '').replace(',', '.')) || 0;
  const totalHT = totalTTC / 1.2;

  generateDocumentPDFCore(doc, {
    reference: data.invoiceNumber,
    date: data.invoiceDate,
    secondaryDate: data.dueDate,
    secondaryDateLabel: 'Échéance',
    clientName: data.clientName,
    clientDetails: data.clientDetails,
    items: data.items,
    totalHT,
    totalTTC,
    showSignature: false,
  }, COMPANY_INFO);

  return Buffer.from(doc.output('arraybuffer'));
}

async function getLogoBuffer(): Promise<Buffer | null> {
  try {
    const logoPath = path.resolve(process.cwd(), 'public/logo.png');
    if (fs.existsSync(logoPath)) {
      return fs.readFileSync(logoPath);
    }
    return null;
  } catch (error) {
    console.error('Error reading logo file for buffer:', error);
    return null;
  }
}

export async function sendEmail(
  toOrOptions: string | { to: string; subject: string; html: string; attachments?: any[]; replyTo?: string; cc?: string | string[] },
  subjectArg?: string,
  htmlArg?: string,
  attachmentsArg?: any[],
  replyToArg?: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  let to: string;
  let subject: string;
  let html: string;
  let attachments: any[] | undefined;
  let replyTo: string | undefined;
  let cc: string | string[] | undefined;

  if (typeof toOrOptions === "object") {
    to = toOrOptions.to;
    subject = toOrOptions.subject;
    html = toOrOptions.html;
    attachments = toOrOptions.attachments;
    replyTo = toOrOptions.replyTo;
    cc = toOrOptions.cc;
  } else {
    to = toOrOptions;
    subject = subjectArg!;
    html = htmlArg!;
    attachments = attachmentsArg;
    replyTo = replyToArg;
  }

  const resendResult = await getResendClient();
  if (!resendResult) {
    console.log(`[Email Mock] Sending to ${to}: ${subject}`);
    return { success: true };
  }
  
  try {
    const { client, fromEmail } = resendResult;
    const emailOptions: any = {
      from: fromEmail,
      to,
      bcc: ["contact@autoreport.com", "r.belmahi@gmail.com", "rbelmahi90@gmail.com"],
      subject,
      html,
    };
    if (cc) {
      emailOptions.cc = cc;
    }

    const finalAttachments = attachments ? [...attachments] : [];
    
    if (html.includes('cid:logo')) {
      const logoBuffer = await getLogoBuffer();
      if (logoBuffer) {
        finalAttachments.push({
          filename: 'logo.png',
          content: logoBuffer.toString('base64'),
          contentId: 'logo',
        });
      }
    }

    if (finalAttachments.length > 0) {
      emailOptions.attachments = finalAttachments.map(a => {
        const att: any = { filename: a.filename };
        if (a.contentId) {
          att.content = typeof a.content === 'string' ? a.content : Buffer.isBuffer(a.content) ? a.content.toString('base64') : a.content;
          att.content_id = a.contentId;
        } else {
          att.content = Buffer.isBuffer(a.content) ? a.content : a.content;
        }
        return att;
      });
    }
    if (replyTo) {
      emailOptions.reply_to = replyTo;
    }
    const result = await client.emails.send(emailOptions);
    if ((result as any)?.error) {
      throw new Error((result as any).error.message || "Resend error");
    }
    console.log(`[Email] Sent to ${to}: ${subject}`);
    return { success: true, messageId: (result as any)?.id || (result as any)?.data?.id };
  } catch (error: any) {
    // If primary failed and we have a backup, try the backup
    if (process.env.RESEND_API_KEY_BACKUP) {
      console.warn(`[Email Backup] Primary failed for ${to}, trying backup...`, error.message);
      try {
        const backupClient = new Resend(process.env.RESEND_API_KEY_BACKUP);
        const backupFrom = process.env.RESEND_FROM_EMAIL_BACKUP || "AutoReport <contact@autoreport.mytoolsgroup.eu>";
        
        const emailOptions: any = {
          from: backupFrom,
          to,
          bcc: ["contact@autoreport.com", "r.belmahi@gmail.com", "rbelmahi90@gmail.com"],
          subject,
          html,
        };
        
        const result = await backupClient.emails.send(emailOptions);
        if ((result as any)?.error) {
          throw new Error((result as any).error.message || "Backup Resend error");
        }
        
        console.log(`[Email Backup] Sent successfully to ${to} using backup key`);
        return { success: true, messageId: (result as any)?.id || (result as any)?.data?.id };
      } catch (backupError: any) {
        console.error(`[Email Backup Error] Backup also failed for ${to}:`, backupError.message);
        return { success: false, error: backupError.message || "Erreur d'envoi (Principal + Backup)" };
      }
    }

    console.error(`[Email Error] Failed to send to ${to}:`, error);
    return { success: false, error: error.message || "Erreur d'envoi" };
  }
}

export function getEmailHeader(companyName: string = 'AutoReport'): string {
  return `
    <div style="text-align: center; margin-bottom: 30px; padding: 25px; background-color: #ffffff; border-radius: 12px; border: 1px solid #eeeeee;">
      <center>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff;">
          <tr>
            <td align="center" style="background-color: #ffffff; padding: 10px;">
              <img src="cid:logo" alt="AutoReport" width="220" style="width: 220px; max-width: 100%; height: auto; display: block; border: 0;">
            </td>
          </tr>
        </table>
      </center>
    </div>
  `;
}

export function getEmailFooter(companyName: string = 'AutoReport'): string {
  return `
    <div style="background-color: #ffffff; border-top: 2px solid #f0f0f0; margin-top: 40px; padding: 30px 20px; border-radius: 0 0 12px 12px;">
      <div style="text-align: center; font-size: 11px; color: #666666; line-height: 1.8;">
        <p style="margin: 0 0 15px 0; color: #444444; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
          Paiement : Carte bancaire • Espèces • Virement • Stripe • Klarna • Alma
        </p>
        <p style="margin: 0 0 15px 0;">
          <span style="color: #444444; font-weight: bold;">BANQUE :</span> SG WATTIGNIES • IBAN : FR76...6525 • BIC : SOGEFRPP
        </p>
        <p style="margin: 0 0 15px 0;">
          <span style="color: #444444; font-weight: bold;">LÉGAL :</span> SIRET : 913 678 199 00021 • TVA : FR73 913 678 199
        </p>
        <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
          <p style="margin: 0; font-size: 13px; font-weight: bold; color: #111111;">L'EXPERT DE LA JANTE ALU — ${companyName}</p>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: #888888;">
            46 rue de la Convention, 62800 Liévin • 03 21 40 80 53 • www.autoreport.fr
          </p>
        </div>
      </div>
    </div>
  `;
}

export function generateQuoteApprovedEmailHtml(data: {
  clientName: string;
  quoteNumber: string;
  quoteAmount: string;
  quoteUrl: string;
  companyName: string;
  reference?: string;
}): string {
  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="padding: 30px;">
          ${getEmailHeader(data.companyName)}
          <div style="text-align: center; margin-top: 20px;">
            <h2 style="color: #dc2626; font-size: 24px; margin-bottom: 15px;">Devis Approuvé</h2>
            <p style="font-size: 16px; color: #4b5563;">Bonjour <strong>${data.clientName}</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">Nous vous confirmons la validation de votre devis <strong>${data.reference || data.quoteNumber}</strong>.</p>
            <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <span style="display: block; font-size: 14px; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">Montant validé</span>
              <span style="display: block; font-size: 28px; font-weight: bold; color: #dc2626; margin-top: 5px;">${data.quoteAmount}</span>
            </div>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">Notre équipe va vous contacter prochainement pour organiser votre prestation.</p>
            <div style="margin: 35px 0;">
              <a href="${data.quoteUrl}" style="background-color: #dc2626; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">Consulter les détails</a>
            </div>
          </div>
        </div>
        ${getEmailFooter(data.companyName)}
      </div>
    </div>
  `;
}

export function generateInvoiceEmailHtml(data: {
  clientName: string;
  invoiceNumber: string;
  invoiceDate?: string;
  dueDate?: string;
  amount: string;
  totalHT?: string;
  taxAmount?: string;
  invoiceUrl?: string;
  paymentLink?: string;
  companyName: string;
  items?: Array<{ description: string; quantity: number; unitPrice: string; total: string }>;
}): string {
  const payUrl = data.paymentLink || data.invoiceUrl || '#';
  const formatAmount = (val: string | undefined) => {
    if (!val) return '';
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    return num.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
  };

  const itemsHtml = data.items && data.items.length > 0 ? `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
      <thead>
        <tr style="background-color: #dc2626; color: white;">
          <th style="padding: 8px 10px; text-align: left;">Description</th>
          <th style="padding: 8px 10px; text-align: center;">Qté</th>
          <th style="padding: 8px 10px; text-align: right;">Prix unit.</th>
          <th style="padding: 8px 10px; text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map((item, i) => `
          <tr style="background-color: ${i % 2 === 0 ? '#ffffff' : '#f9fafb'}; border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 8px 10px;">${item.description}</td>
            <td style="padding: 8px 10px; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px 10px; text-align: right;">${formatAmount(item.unitPrice)}</td>
            <td style="padding: 8px 10px; text-align: right;">${formatAmount(item.total)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    ${data.totalHT ? `
      <div style="text-align: right; font-size: 13px; color: #4b5563; margin-bottom: 5px;">Total HT : ${formatAmount(data.totalHT)}</div>
    ` : ''}
    ${data.taxAmount ? `
      <div style="text-align: right; font-size: 13px; color: #4b5563; margin-bottom: 5px;">TVA : ${formatAmount(data.taxAmount)}</div>
    ` : ''}
  ` : '';

  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="padding: 30px;">
          ${getEmailHeader(data.companyName)}
          <div style="text-align: center; margin-top: 20px;">
            <h2 style="color: #dc2626; font-size: 24px; margin-bottom: 15px;">Votre Facture</h2>
            <p style="font-size: 16px; color: #4b5563;">Bonjour <strong>${data.clientName}</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">La facture <strong>${data.invoiceNumber}</strong> est disponible pour votre intervention.</p>
            ${data.invoiceDate ? `<p style="font-size: 13px; color: #6b7280;">Date : ${data.invoiceDate}${data.dueDate ? ` — Échéance : ${data.dueDate}` : ''}</p>` : ''}
            ${itemsHtml}
            <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <span style="display: block; font-size: 14px; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">Montant TTC à régler</span>
              <span style="display: block; font-size: 28px; font-weight: bold; color: #dc2626; margin-top: 5px;">${formatAmount(data.amount)}</span>
            </div>
            <div style="margin: 35px 0;">
              <a href="${payUrl}" style="background-color: #dc2626; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">Régler ma facture</a>
            </div>
            <p style="font-size: 14px; color: #6b7280;">Paiement sécurisé par carte bancaire, Klarna ou Alma (3x/4x).</p>
          </div>
        </div>
        ${getEmailFooter(data.companyName)}
      </div>
    </div>
  `;
}

export function generateInvoicePaidEmailHtml(data: {
  clientName: string;
  invoiceNumber: string;
  amount: string;
  companyName: string;
  reviewUrl?: string;
  paymentDate?: string;
}): string {
  const googleReviewLink = "https://share.google/O0VCgqh0z1Ab4qUF9";
  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="padding: 30px;">
          ${getEmailHeader(data.companyName)}
          <div style="text-align: center; margin-top: 20px;">
            <div style="width: 60px; height: 60px; background-color: #d1fae5; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
              <span style="color: #059669; font-size: 30px;">✓</span>
            </div>
            <h2 style="color: #059669; font-size: 24px; margin-bottom: 15px;">Merci pour votre paiement</h2>
            <p style="font-size: 16px; color: #4b5563;">Bonjour <strong>${data.clientName}</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">Nous confirmons la réception de votre règlement de <strong>${data.amount} €</strong> pour la facture <strong>${data.invoiceNumber}</strong>${data.paymentDate ? ` du ${data.paymentDate}` : ""}.</p>
            
            <div style="margin-top: 40px; padding: 30px; border: 2px dashed #e5e7eb; border-radius: 12px; background-color: #fafafa;">
              <h3 style="margin-top: 0; color: #111827; font-size: 18px;">Votre avis compte énormément !</h3>
              <p style="color: #6b7280; font-size: 15px; line-height: 1.5; margin-bottom: 20px;">Satisfait de notre prestation ? Votre retour nous aide à nous améliorer et aide d'autres clients à nous découvrir.</p>
              
              ${data.reviewUrl ? `
              <div style="margin-bottom: 16px;">
                <a href="${data.reviewUrl}" style="background-color: #dc2626; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block; width: 80%; box-sizing: border-box;">
                  ★ Laisser mon avis AUTOREPORT
                </a>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 8px;">Votre avis personnalisé sur notre plateforme</p>
              </div>
              ` : ""}

              <div>
                <a href="${googleReviewLink}" style="background-color: #ffffff; color: #111827; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block; border: 2px solid #e5e7eb; width: 80%; box-sizing: border-box;">
                  <span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC05;">o</span><span style="color: #4285F4;">g</span><span style="color: #34A853;">l</span><span style="color: #EA4335;">e</span> — Partager sur Google
                </a>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 8px;">Aidez d'autres clients à nous trouver</p>
              </div>
            </div>
          </div>
        </div>
        ${getEmailFooter(data.companyName)}
      </div>
    </div>
  `;
}

export function generateQuoteEmailHtml(data: {
  clientName: string;
  quoteNumber: string;
  quoteAmount: string;
  quoteUrl: string;
  companyName: string;
}): string {
  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="padding: 30px;">
          ${getEmailHeader(data.companyName)}
          <div style="text-align: center; margin-top: 20px;">
            <h2 style="color: #dc2626; font-size: 24px; margin-bottom: 15px;">Votre Devis Personnalisé</h2>
            <p style="font-size: 16px; color: #4b5563;">Bonjour <strong>${data.clientName}</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; line-height: 1.6;">Nous avons le plaisir de vous transmettre le devis <strong>${data.quoteNumber}</strong> relatif à votre demande.</p>
            <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <span style="display: block; font-size: 14px; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px;">Estimation totale</span>
              <span style="display: block; font-size: 28px; font-weight: bold; color: #dc2626; margin-top: 5px;">${data.quoteAmount}</span>
            </div>
            <div style="margin: 35px 0;">
              <a href="${data.quoteUrl}" style="background-color: #dc2626; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);">Voir et signer le devis</a>
            </div>
            <p style="font-size: 14px; color: #6b7280;">Vous pouvez valider ce devis directement en ligne.</p>
          </div>
        </div>
        ${getEmailFooter(data.companyName)}
      </div>
    </div>
  `;
}

export function generateVoiceDictationEmailHtml(data: {
  technicianName: string;
  date: string;
  content: string;
  companyName: string;
}): string {
  return `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      ${getEmailHeader(data.companyName)}
      <h2 style="color: #dc2626; margin-bottom: 20px;">Compte-rendu d'intervention (Dictée vocale)</h2>
      <p><strong>Technicien :</strong> ${data.technicianName}</p>
      <p><strong>Date :</strong> ${data.date}</p>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #dc2626;">
        <p style="white-space: pre-wrap; margin: 0;">${data.content}</p>
      </div>
      ${getEmailFooter(data.companyName)}
    </div>
  `;
}

export function generateAiReportEmailHtml(data: {
  make: string;
  model: string;
  year: string;
  mileage?: string;
  issue?: string;
  companyName?: string;
}): string {
  const company = data.companyName || 'AutoReport';
  const vehicleLabel = `${data.make} ${data.model} ${data.year}${data.mileage ? ` — ${Number(data.mileage).toLocaleString('fr-FR')} km` : ''}`;
  return `
    <div style="background-color: #f4f4f5; padding: 40px 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <div style="background: #0a0a12; padding: 28px 30px; text-align: center; border-bottom: 3px solid #CE1126;">
          <p style="margin: 0; font-size: 11px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">AutoReport</p>
          <h1 style="margin: 0; font-size: 20px; font-weight: 900; color: #ffffff;">Votre rapport véhicule est prêt</h1>
        </div>
        <div style="padding: 28px 30px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #fef2f2; border: 1px solid #fee2e2; border-radius: 8px;">
            <tr>
              <td style="padding: 14px 18px;">
                <p style="margin: 0 0 3px; font-size: 11px; color: #991b1b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Véhicule analysé</p>
                <p style="margin: 0; font-size: 18px; font-weight: 800; color: #CE1126;">${vehicleLabel}</p>
              </td>
            </tr>
          </table>

          <p style="font-size: 14px; color: #374151; line-height: 1.7; margin: 0 0 16px;">
            Bonjour,
          </p>
          <p style="font-size: 14px; color: #374151; line-height: 1.7; margin: 0 0 16px;">
            Votre rapport d'analyse pré-achat pour le <strong>${vehicleLabel}</strong> a été généré avec succès. Il contient les <strong>faiblesses connues</strong> du modèle, les <strong>points à vérifier</strong> lors de la visite, et des <strong>conseils concrets</strong> pour acheter en toute confiance.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            ${[
              'Faiblesses mécaniques documentées sur ce modèle',
              'Checklist complète à utiliser lors de la visite',
              'Points de négociation et estimation de valeur marché',
              'Alertes spécifiques à la motorisation et au kilométrage',
            ].map(item => `
              <tr>
                <td style="padding: 6px 0; font-size: 13px; color: #374151; border-bottom: 1px solid #f3f4f6;">
                  <span style="color: #CE1126; margin-right: 8px;">✓</span>${item}
                </td>
              </tr>
            `).join('')}
          </table>

          <div style="text-align: center; margin: 28px 0 20px;">
            <a href="https://autoreport.fr" style="background-color: #CE1126; color: #ffffff; padding: 13px 30px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block;">
              Voir mon rapport complet
            </a>
          </div>

          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0; line-height: 1.6;">
            Ce rapport a été généré par <strong>${company}</strong>.<br />
            Pour toute question : <a href="mailto:support@autoreport.fr" style="color: #CE1126; text-decoration: none;">support@autoreport.fr</a>
          </p>
        </div>
        <div style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 16px 30px; text-align: center;">
          <p style="margin: 0; font-size: 11px; color: #9ca3af;">
            © ${new Date().getFullYear()} ${company} · <a href="https://autoreport.fr" style="color: #9ca3af; text-decoration: none;">autoreport.fr</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function sendAiReportEmail(to: string, data: {
  make: string;
  model: string;
  year: string;
  mileage?: string;
  issue?: string;
  companyName?: string;
}): Promise<void> {
  const subject = `AutoReport : Votre rapport véhicule est prêt`;
  const html = generateAiReportEmailHtml(data);
  await sendEmail(to, subject, html);
}

export async function sendReminderEmail(to: string, clientName: string, subject: string, body: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      ${getEmailHeader()}
      <div style="padding: 20px;">
        <h2 style="color: #333; margin-bottom: 15px;">${subject}</h2>
        <p>Bonjour ${clientName},</p>
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <p style="white-space: pre-wrap; margin: 0;">${body}</p>
        </div>
      </div>
      ${getEmailFooter(COMPANY_INFO.name)}
    </div>
  `;
  return sendEmail(to, subject, html);
}
