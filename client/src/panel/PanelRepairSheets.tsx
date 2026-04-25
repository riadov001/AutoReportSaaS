import { useEffect, useState } from "react";
import { panelFetch } from "./usePanelAuth";
import { Plus, Trash2, Edit, X, Check, Car, User, Phone, Mail, MapPin, Wrench, DollarSign, FileText, Clock } from "lucide-react";

interface RepairItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface RepairSheet {
  id: string;
  status: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleMileage?: string;
  vehiclePlate?: string;
  diagnosticSummary?: string;
  repairItems?: RepairItem[];
  quoteSubtotal?: string;
  quoteTax?: string;
  quoteDiscount?: string;
  quoteTotal?: string;
  notes?: string;
  technicianName?: string;
  scheduledAt?: string;
  completedAt?: string;
  createdAt?: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  draft: { label: "Brouillon", color: "#666" },
  pending: { label: "En attente", color: "#FFB800" },
  in_progress: { label: "En cours", color: "#4FA3E0" },
  completed: { label: "Terminé", color: "#22C55E" },
  cancelled: { label: "Annulé", color: "#CE1126" },
};

const EMPTY_FORM: Omit<RepairSheet, "id" | "createdAt" | "completedAt"> = {
  status: "draft",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientAddress: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleYear: "",
  vehicleMileage: "",
  vehiclePlate: "",
  diagnosticSummary: "",
  repairItems: [],
  quoteSubtotal: "0",
  quoteTax: "0",
  quoteDiscount: "0",
  quoteTotal: "0",
  notes: "",
  technicianName: "",
  scheduledAt: "",
};

export default function PanelRepairSheets() {
  const [sheets, setSheets] = useState<RepairSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [form, setForm] = useState<any>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("");

  const load = () => {
    setLoading(true);
    panelFetch("/api/panel/repair-sheets")
      .then(r => r.json())
      .then(data => setSheets(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const computeTotal = (items: RepairItem[], tax: number, discount: number) => {
    const subtotal = items.reduce((s, i) => s + i.total, 0);
    const total = subtotal + tax - discount;
    return { subtotal, total };
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const items: RepairItem[] = form.repairItems || [];
      const tax = parseFloat(form.quoteTax || "0");
      const discount = parseFloat(form.quoteDiscount || "0");
      const { subtotal, total } = computeTotal(items, tax, discount);
      const payload = {
        ...form,
        repairItems: items,
        quoteSubtotal: subtotal.toFixed(2),
        quoteTotal: total.toFixed(2),
      };
      if (modal === "create") {
        const r = await panelFetch("/api/panel/repair-sheets", { method: "POST", body: JSON.stringify(payload) });
        const sheet = await r.json();
        setSheets(prev => [sheet, ...prev]);
      } else {
        const r = await panelFetch(`/api/panel/repair-sheets/${editId}`, { method: "PUT", body: JSON.stringify(payload) });
        const sheet = await r.json();
        setSheets(prev => prev.map(s => s.id === editId ? sheet : s));
      }
      setModal(null);
    } catch { alert("Erreur lors de la sauvegarde"); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette fiche ?")) return;
    setDeleting(id);
    await panelFetch(`/api/panel/repair-sheets/${id}`, { method: "DELETE" });
    setSheets(prev => prev.filter(s => s.id !== id));
    setDeleting(null);
  };

  const openEdit = (sheet: RepairSheet) => {
    setForm({ ...sheet });
    setEditId(sheet.id);
    setModal("edit");
  };

  const openCreate = () => {
    setForm({ ...EMPTY_FORM });
    setEditId(null);
    setModal("create");
  };

  const addItem = () => {
    setForm((f: any) => ({
      ...f,
      repairItems: [...(f.repairItems || []), { description: "", quantity: 1, unitPrice: 0, total: 0 }],
    }));
  };

  const updateItem = (idx: number, field: keyof RepairItem, value: string | number) => {
    setForm((f: any) => {
      const items = [...(f.repairItems || [])];
      const item = { ...items[idx], [field]: value };
      if (field === "quantity" || field === "unitPrice") {
        item.total = parseFloat(String(item.quantity)) * parseFloat(String(item.unitPrice));
      }
      items[idx] = item;
      return { ...f, repairItems: items };
    });
  };

  const removeItem = (idx: number) => {
    setForm((f: any) => ({ ...f, repairItems: f.repairItems.filter((_: any, i: number) => i !== idx) }));
  };

  const filtered = sheets.filter(s => !filterStatus || s.status === filterStatus);

  const Field = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40"
      />
    </div>
  );

  const TextArea = ({ label, value, onChange, placeholder = "" }: any) => (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
      <textarea
        value={value || ""}
        onChange={(e: any) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#CE1126]/40 resize-none"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Fiches de Réparation</h1>
          <p className="text-white/40 text-sm mt-1">{sheets.length} fiche{sheets.length !== 1 ? "s" : ""} au total</p>
        </div>
        <button
          onClick={openCreate}
          data-testid="button-create-sheet"
          className="flex items-center gap-2 px-4 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nouvelle fiche
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus("")}
          data-testid="filter-status-all"
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${!filterStatus ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
        >
          Tous ({sheets.length})
        </button>
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const count = sheets.filter(s => s.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(key === filterStatus ? "" : key)}
              data-testid={`filter-status-${key}`}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${filterStatus === key ? "text-white bg-white/10" : "text-white/40 hover:text-white/60"}`}
              style={{ color: filterStatus === key ? cfg.color : undefined }}
            >
              {cfg.label} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-white/[0.03] rounded-md animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <Wrench className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Aucune fiche de réparation</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(sheet => {
            const cfg = STATUS_CONFIG[sheet.status] || STATUS_CONFIG.draft;
            return (
              <div key={sheet.id} className="bg-white/[0.03] border border-white/[0.06] rounded-md p-4" data-testid={`card-sheet-${sheet.id}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${cfg.color}20`, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                      {sheet.vehicleMake && (
                        <span className="text-white font-semibold text-sm capitalize">
                          {sheet.vehicleMake} {sheet.vehicleModel} {sheet.vehicleYear}
                        </span>
                      )}
                      {sheet.vehiclePlate && (
                        <span className="text-white/40 text-xs font-mono">{sheet.vehiclePlate}</span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-white/40">
                      {sheet.clientName && (
                        <span className="flex items-center gap-1.5">
                          <User className="h-3 w-3" />{sheet.clientName}
                        </span>
                      )}
                      {sheet.clientPhone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3" />{sheet.clientPhone}
                        </span>
                      )}
                      {sheet.technicianName && (
                        <span className="flex items-center gap-1.5">
                          <Wrench className="h-3 w-3" />{sheet.technicianName}
                        </span>
                      )}
                      {sheet.quoteTotal && parseFloat(sheet.quoteTotal) > 0 && (
                        <span className="flex items-center gap-1.5 text-[#FFB800] font-semibold">
                          <DollarSign className="h-3 w-3" />{parseFloat(sheet.quoteTotal).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                        </span>
                      )}
                    </div>
                    {sheet.diagnosticSummary && (
                      <p className="mt-2 text-xs text-white/30 truncate">{sheet.diagnosticSummary}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => openEdit(sheet)}
                      data-testid={`button-edit-sheet-${sheet.id}`}
                      className="p-2 text-white/40 hover:text-white bg-white/[0.04] rounded-md transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(sheet.id)}
                      disabled={deleting === sheet.id}
                      data-testid={`button-delete-sheet-${sheet.id}`}
                      className="p-2 text-[#CE1126]/50 hover:text-[#CE1126] bg-[#CE1126]/[0.05] rounded-md transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E0E18] border border-white/[0.08] rounded-md w-full max-w-2xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2 className="text-base font-bold text-white">
                {modal === "create" ? "Nouvelle fiche de réparation" : "Modifier la fiche"}
              </h2>
              <button onClick={() => setModal(null)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-[#CE1126] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <User className="h-3.5 w-3.5" /> Informations Client
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nom client" value={form.clientName} onChange={(v: string) => setForm((f: any) => ({ ...f, clientName: v }))} placeholder="Jean Dupont" />
                  <Field label="Email" type="email" value={form.clientEmail} onChange={(v: string) => setForm((f: any) => ({ ...f, clientEmail: v }))} placeholder="jean@exemple.fr" />
                  <Field label="Téléphone" value={form.clientPhone} onChange={(v: string) => setForm((f: any) => ({ ...f, clientPhone: v }))} placeholder="+33 6 12 34 56 78" />
                  <Field label="Adresse" value={form.clientAddress} onChange={(v: string) => setForm((f: any) => ({ ...f, clientAddress: v }))} placeholder="12 rue de la Paix, Paris" />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#CE1126] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Car className="h-3.5 w-3.5" /> Véhicule
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Field label="Marque" value={form.vehicleMake} onChange={(v: string) => setForm((f: any) => ({ ...f, vehicleMake: v }))} placeholder="BMW" />
                  <Field label="Modèle" value={form.vehicleModel} onChange={(v: string) => setForm((f: any) => ({ ...f, vehicleModel: v }))} placeholder="Série 3" />
                  <Field label="Année" value={form.vehicleYear} onChange={(v: string) => setForm((f: any) => ({ ...f, vehicleYear: v }))} placeholder="2020" />
                  <Field label="Kilométrage" value={form.vehicleMileage} onChange={(v: string) => setForm((f: any) => ({ ...f, vehicleMileage: v }))} placeholder="85000" />
                  <Field label="Immatriculation" value={form.vehiclePlate} onChange={(v: string) => setForm((f: any) => ({ ...f, vehiclePlate: v }))} placeholder="AB-123-CD" />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#CE1126] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Wrench className="h-3.5 w-3.5" /> Diagnostic & Réparation
                </h3>
                <div className="space-y-4">
                  <TextArea label="Résumé du diagnostic" value={form.diagnosticSummary} onChange={(v: string) => setForm((f: any) => ({ ...f, diagnosticSummary: v }))} placeholder="Décrivez le problème diagnostiqué..." />
                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Statut</label>
                    <select
                      value={form.status}
                      onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}
                      data-testid="select-sheet-status"
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-[#CE1126]/40"
                    >
                      {Object.entries(STATUS_CONFIG).map(([k, c]) => (
                        <option key={k} value={k}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Technicien" value={form.technicianName} onChange={(v: string) => setForm((f: any) => ({ ...f, technicianName: v }))} placeholder="Pierre Martin" />
                    <Field label="Date planifiée" type="datetime-local" value={form.scheduledAt ? form.scheduledAt.slice(0, 16) : ""} onChange={(v: string) => setForm((f: any) => ({ ...f, scheduledAt: v }))} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-[#CE1126] uppercase tracking-widest flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5" /> Pièces & Main-d'œuvre
                  </h3>
                  <button
                    onClick={addItem}
                    data-testid="button-add-repair-item"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] rounded-md text-xs text-white/60 hover:text-white transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Ajouter ligne
                  </button>
                </div>
                {(form.repairItems || []).length === 0 ? (
                  <p className="text-white/30 text-xs text-center py-4">Aucun élément. Cliquez "Ajouter ligne".</p>
                ) : (
                  <div className="space-y-2">
                    {(form.repairItems as RepairItem[]).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/[0.02] rounded-md p-2">
                        <input
                          value={item.description}
                          onChange={e => updateItem(idx, "description", e.target.value)}
                          placeholder="Description"
                          className="flex-1 bg-transparent text-white text-xs px-2 py-1 border border-white/[0.06] rounded focus:outline-none focus:border-[#CE1126]/40"
                        />
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={e => updateItem(idx, "quantity", parseFloat(e.target.value) || 0)}
                          min="0"
                          className="w-14 bg-transparent text-white text-xs px-2 py-1 border border-white/[0.06] rounded focus:outline-none text-center"
                        />
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={e => updateItem(idx, "unitPrice", parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          placeholder="Prix"
                          className="w-20 bg-transparent text-white text-xs px-2 py-1 border border-white/[0.06] rounded focus:outline-none text-right"
                        />
                        <span className="text-white/40 text-xs w-20 text-right font-mono">{item.total.toFixed(2)} €</span>
                        <button onClick={() => removeItem(idx)} className="text-[#CE1126]/50 hover:text-[#CE1126] shrink-0">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-white/[0.06] text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/40">TVA</span>
                          <input
                            type="number"
                            value={form.quoteTax || "0"}
                            onChange={e => setForm((f: any) => ({ ...f, quoteTax: e.target.value }))}
                            min="0"
                            step="0.01"
                            className="w-20 bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1 text-xs text-white text-right focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/40">Remise</span>
                          <input
                            type="number"
                            value={form.quoteDiscount || "0"}
                            onChange={e => setForm((f: any) => ({ ...f, quoteDiscount: e.target.value }))}
                            min="0"
                            step="0.01"
                            className="w-20 bg-white/[0.04] border border-white/[0.08] rounded px-2 py-1 text-xs text-white text-right focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="text-white font-bold font-mono">
                        Total: {computeTotal(
                          form.repairItems || [],
                          parseFloat(form.quoteTax || "0"),
                          parseFloat(form.quoteDiscount || "0")
                        ).total.toFixed(2)} €
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <TextArea label="Notes supplémentaires" value={form.notes} onChange={(v: string) => setForm((f: any) => ({ ...f, notes: v }))} placeholder="Informations complémentaires..." />
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 text-white/50 hover:text-white text-sm font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                data-testid="button-save-sheet"
                className="flex items-center gap-2 px-5 py-2 bg-[#CE1126] text-white rounded-md text-sm font-semibold hover:bg-[#b8101f] transition-colors disabled:opacity-60"
              >
                {saving ? <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="h-4 w-4" />}
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
