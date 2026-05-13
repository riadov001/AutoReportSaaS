import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Phone, Mail, MapPin, Loader2, CheckCircle, Clock, AlertCircle } from "lucide-react";

function formatPrice(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "0,00 €";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0,00 €";
  return num.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("fr-FR");
}

const statusLabels: Record<string, { label: string; className: string; icon: any }> = {
  pending: { label: "En attente", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300", icon: Clock },
  paid: { label: "Payée", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300", icon: CheckCircle },
  overdue: { label: "En retard", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300", icon: AlertCircle },
  cancelled: { label: "Annulée", className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300", icon: AlertCircle },
};

export default function PublicInvoiceView() {
  const { token } = useParams<{ token: string }>();

  const { data, isLoading, error } = useQuery<{
    invoice: any;
    client: { name: string } | null;
    items: any[];
    garage: any;
  }>({
    queryKey: ["/api/public/invoices", token],
    queryFn: async () => {
      const res = await fetch(`/api/public/invoices/${token}`);
      if (!res.ok) throw new Error("Facture introuvable");
      return res.json();
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Chargement de la facture...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">Facture introuvable</h2>
          <p className="text-muted-foreground">Ce lien n'est plus valide ou la facture n'existe pas.</p>
        </Card>
      </div>
    );
  }

  const { invoice, client, items, garage } = data;
  const status = statusLabels[invoice.status] || statusLabels.pending;
  const StatusIcon = status.icon;
  const garageName = garage?.name || "AutoReport";
  const primaryColor = garage?.primaryColor || "#dc2626";

  const totalHT = items.reduce((sum: number, item: any) => {
    const val = parseFloat(item.totalExcludingTax || "0");
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  const totalTTC = parseFloat(invoice.amount || "0");
  const tva = totalTTC - totalHT;

  return (
    <div className="min-h-screen bg-muted/30">
      <div
        className="py-6 px-4 text-center text-white"
        style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)` }}
      >
        <h1 className="text-2xl font-bold" data-testid="text-garage-name">{garageName}</h1>
        <p className="text-white/80 text-lg mt-1">{formatPrice(invoice.amount)}</p>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
            <h2 className="text-xl font-bold" data-testid="text-invoice-title">FACTURE</h2>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.className}`} data-testid="text-invoice-status">
              <StatusIcon className="h-4 w-4" />
              {status.label}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">N° de facture :</span>
              <span className="font-medium" data-testid="text-invoice-number">{invoice.invoiceNumber || "-"}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-muted-foreground">Date :</span>
              <span>{formatDate(invoice.createdAt)}</span>
            </div>
            {invoice.dueDate && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Échéance :</span>
                <span>{formatDate(invoice.dueDate)}</span>
              </div>
            )}
            {client && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Client :</span>
                <span data-testid="text-client-name">{client.name}</span>
              </div>
            )}
            {invoice.paymentMethod && (
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Mode de paiement :</span>
                <span>{invoice.paymentMethod === 'card' ? 'Carte bancaire' : invoice.paymentMethod === 'cash' ? 'Espèces' : invoice.paymentMethod === 'wire_transfer' ? 'Virement' : invoice.paymentMethod}</span>
              </div>
            )}
          </div>
        </Card>

        {invoice.status === "pending" && invoice.paymentLink && (
          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-center">Règlement de la facture</h3>
            <Button 
              className="w-full text-white" 
              style={{ backgroundColor: primaryColor }}
              asChild
            >
              <a href={invoice.paymentLink} target="_blank" rel="noopener noreferrer">
                Payer {formatPrice(invoice.amount)} en ligne
              </a>
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Paiement sécurisé via Stripe (CB, Klarna, Alma)
            </p>
          </Card>
        )}

        {items.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold mb-3">Détail des prestations</h3>
            <div className="space-y-3">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-start gap-2 text-sm py-2 border-b last:border-0">
                  <div className="flex-1">
                    <p className="font-medium">{item.description}</p>
                    <p className="text-muted-foreground text-xs">
                      Qté : {item.quantity || "1"} {item.unitPriceExcludingTax ? `× ${formatPrice(item.unitPriceExcludingTax)}` : ""}
                    </p>
                  </div>
                  <span className="font-medium whitespace-nowrap">{formatPrice(item.totalIncludingTax)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t space-y-1 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Total HT</span>
                <span>{formatPrice(totalHT)}</span>
              </div>
              {tva > 0 && (
                <div className="flex justify-between gap-2">
                  <span className="text-muted-foreground">Montant TVA</span>
                  <span>{formatPrice(tva)}</span>
                </div>
              )}
              <div className="flex justify-between gap-2 text-base font-bold pt-1">
                <span>Total dû</span>
                <span style={{ color: primaryColor }} data-testid="text-total-amount">{formatPrice(totalTTC)}</span>
              </div>
            </div>
          </Card>
        )}

        {invoice.status === "paid" && (
          <Card className="p-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Facture payée</span>
            </div>
            {invoice.paidAt && (
              <p className="text-sm text-muted-foreground">
                Payée le {formatDate(invoice.paidAt)}
              </p>
            )}
          </Card>
        )}

        {invoice.notes && (
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Notes</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.notes}</p>
          </Card>
        )}

        {garage && (
          <div className="text-center text-xs text-muted-foreground space-y-1 pt-4 pb-8">
            <p className="font-medium">{garageName}</p>
            {garage.address && (
              <p className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                {garage.address}{garage.postalCode ? `, ${garage.postalCode}` : ""}{garage.city ? ` ${garage.city}` : ""}
              </p>
            )}
            {garage.phone && (
              <p className="flex items-center justify-center gap-1">
                <Phone className="h-3 w-3" />
                <a href={`tel:${garage.phone}`}>{garage.phone}</a>
              </p>
            )}
            {garage.email && (
              <p className="flex items-center justify-center gap-1">
                <Mail className="h-3 w-3" />
                <a href={`mailto:${garage.email}`}>{garage.email}</a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
