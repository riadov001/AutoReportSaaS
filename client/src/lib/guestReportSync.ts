// Utilitaire de persistance et synchronisation des rapports invités
// Sauvegarde dans localStorage avant login, sync vers le compte après auth

const GUEST_REPORT_KEY = "autoreport_guest_report";

export interface GuestReportEntry {
  reportData: unknown;
  vehicleInfo: {
    make: string;
    model: string;
    year: string;
    mileage?: string;
    issue?: string;
    finition?: string;
    motorisation?: string;
    carburant?: string;
    gearbox?: string;
    usage?: string[];
    prix?: string;
    codePostal?: string;
    puissance?: string;
  };
  savedAt: string;
  synced: boolean;
}

export function saveGuestReport(reportData: unknown, vehicleInfo: GuestReportEntry["vehicleInfo"]): void {
  try {
    const entry: GuestReportEntry = {
      reportData,
      vehicleInfo,
      savedAt: new Date().toISOString(),
      synced: false,
    };
    localStorage.setItem(GUEST_REPORT_KEY, JSON.stringify(entry));
    console.log("[GuestReport] Rapport sauvegardé localement");
  } catch (e) {
    console.warn("[GuestReport] Impossible de sauvegarder dans localStorage :", e);
  }
}

export function loadGuestReport(): GuestReportEntry | null {
  try {
    const raw = localStorage.getItem(GUEST_REPORT_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as GuestReportEntry;
    if (entry.synced) {
      console.log("[GuestReport] Rapport déjà synchronisé — ignoré");
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

export function clearGuestReport(): void {
  try {
    localStorage.removeItem(GUEST_REPORT_KEY);
    console.log("[GuestReport] Rapport local supprimé après sync");
  } catch {}
}

export async function syncGuestReportToAccount(): Promise<void> {
  const entry = loadGuestReport();
  if (!entry) return;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      attempts++;
      console.log(`[GuestReport] Tentative de synchronisation ${attempts}/${maxAttempts}…`);
      const res = await fetch("/api/reports/sync-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportData: entry.reportData,
          vehicleInfo: entry.vehicleInfo,
        }),
        credentials: "include",
      });

      if (res.ok) {
        clearGuestReport();
        console.log("[GuestReport] Synchronisation réussie ✓");
        return;
      }

      // 401 = non authentifié — on arrête
      if (res.status === 401) {
        console.warn("[GuestReport] Non authentifié — sync annulée");
        return;
      }

      // 409 = doublon — rapport déjà synchronisé
      if (res.status === 409) {
        clearGuestReport();
        console.log("[GuestReport] Rapport déjà présent dans le compte — nettoyage local");
        return;
      }

      console.warn("[GuestReport] Échec HTTP", res.status);
    } catch (e) {
      console.warn("[GuestReport] Erreur réseau :", e);
    }

    if (attempts < maxAttempts) {
      await new Promise((r) => setTimeout(r, 800 * attempts));
    }
  }

  console.error("[GuestReport] Sync échouée après", maxAttempts, "tentatives — rapport conservé en localStorage");
}
