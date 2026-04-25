import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

interface UserInvoice {
  id: string;
  number: string;
  amount: string;
  currency: string;
  status: string;
  createdAt: string;
  description?: string;
}

export default function Invoices() {
  const { data: invoices, isLoading } = useQuery<UserInvoice[]>({
    queryKey: ["/api/user/invoices"],
  });

  const download = async (id: string) => {
    try {
      const res = await fetch(`/api/user/invoices/${id}/pdf`);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `facture-${id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Impossible de télécharger la facture");
    }
  };

  return (
    <DashboardLayout title="Factures">
      <div className="hud-card rounded-md bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        {isLoading ? (
          <p className="text-sm text-white/40 p-8 text-center">Chargement…</p>
        ) : !invoices?.length ? (
          <p className="text-sm text-white/40 p-8 text-center">Aucune facture</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-[10px] font-mono uppercase tracking-wider text-white/40">
                  <th className="text-left px-4 py-3">N°</th>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Description</th>
                  <th className="text-right px-4 py-3">Montant</th>
                  <th className="text-right px-4 py-3">Statut</th>
                  <th className="text-right px-4 py-3">PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {invoices.map((inv) => (
                  <tr key={inv.id} data-testid={`row-invoice-${inv.id}`}>
                    <td className="px-4 py-3 font-mono text-xs">{inv.number}</td>
                    <td className="px-4 py-3 font-mono text-xs text-white/60">{new Date(inv.createdAt).toLocaleDateString("fr-FR")}</td>
                    <td className="px-4 py-3 text-xs text-white/70">{inv.description || "—"}</td>
                    <td className="px-4 py-3 text-right font-mono font-bold">
                      {Number(inv.amount).toFixed(2)} {(inv.currency || "EUR").toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-xs uppercase font-mono ${
                        inv.status === "paid" ? "text-[#22c55e]" : "text-[#f59e0b]"
                      }`}>
                        {inv.status === "paid" ? "Payée" : inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => download(inv.id)}
                        data-testid={`button-download-invoice-${inv.id}`}
                        className="p-1.5 rounded text-white/60 hover:text-white hover:bg-white/[0.05]"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
