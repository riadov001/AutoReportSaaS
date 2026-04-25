import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, MessageSquare } from "lucide-react";
import DashboardLayout from "./DashboardLayout";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function Support() {
  const qc = useQueryClient();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { data: tickets } = useQuery<Ticket[]>({ queryKey: ["/api/user/support"] });

  const submit = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/user/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      });
      if (!res.ok) throw new Error("Erreur");
      return res.json();
    },
    onSuccess: () => {
      setSubject("");
      setMessage("");
      qc.invalidateQueries({ queryKey: ["/api/user/support"] });
    },
  });

  return (
    <DashboardLayout title="Support">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="hud-card rounded-md p-5 bg-white/[0.02] border border-white/[0.06]">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4">Nouvelle demande</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!subject || !message) return;
              submit.mutate();
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1.5">Sujet *</label>
              <input
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                data-testid="input-support-subject"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#CE1126]/40"
                placeholder="Question sur ma facture"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-1.5">Message *</label>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                data-testid="textarea-support-message"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#CE1126]/40"
                placeholder="Décrivez votre demande…"
              />
            </div>
            <button
              type="submit"
              disabled={submit.isPending}
              data-testid="button-support-submit"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#CE1126] hover:bg-[#b8101f] disabled:opacity-50 text-white text-sm font-bold rounded-md transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              {submit.isPending ? "Envoi…" : "Envoyer"}
            </button>
            {submit.isSuccess && <p className="text-xs text-[#22c55e]">Message envoyé. Notre équipe vous répondra rapidement.</p>}
            {submit.isError && <p className="text-xs text-[#CE1126]">Erreur lors de l'envoi. Réessayez.</p>}
          </form>
        </div>

        <div className="hud-card rounded-md p-5 bg-white/[0.02] border border-white/[0.06]">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4">Mes demandes</h2>
          {!tickets?.length ? (
            <div className="text-center py-8 text-white/40">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Aucune demande pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {tickets.map((t) => (
                <div key={t.id} data-testid={`ticket-${t.id}`} className="p-3 rounded-md bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-bold truncate">{t.subject}</p>
                    <span className={`text-[10px] font-mono uppercase shrink-0 ${
                      t.status === "open" ? "text-[#f59e0b]" :
                      t.status === "resolved" ? "text-[#22c55e]" : "text-white/40"
                    }`}>{t.status}</span>
                  </div>
                  <p className="text-xs text-white/50 line-clamp-2 mb-1">{t.message}</p>
                  <p className="text-[10px] font-mono text-white/30">{new Date(t.createdAt).toLocaleString("fr-FR")}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
