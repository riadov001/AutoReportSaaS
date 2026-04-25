import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = "pending" | "approved" | "accepted" | "rejected" | "completed" | "cancelled" | "paid" | "overdue" | "confirmed";

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: { label: "En attente", className: "bg-sky-500 text-white border-sky-600" },
  approved: { label: "Approuvé", className: "bg-emerald-500 text-white border-emerald-600" },
  accepted: { label: "Accepté", className: "bg-emerald-600 text-white border-emerald-700" },
  rejected: { label: "Refusé", className: "bg-rose-500 text-white border-rose-600" },
  completed: { label: "Terminé", className: "bg-slate-500 text-white border-slate-600" },
  cancelled: { label: "Annulé", className: "bg-rose-500 text-white border-rose-600" },
  paid: { label: "Payée", className: "bg-emerald-500 text-white border-emerald-600" },
  overdue: { label: "En retard", className: "bg-rose-600 text-white border-rose-700" },
  confirmed: { label: "Confirmée", className: "bg-emerald-500 text-white border-emerald-600" },
};

export function StatusBadge({ status, className }: { status: StatusType; className?: string }) {
  const config = statusConfig[status];
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs uppercase tracking-wide font-medium",
        config.className,
        className
      )}
      data-testid={`badge-status-${status}`}
    >
      {config.label}
    </Badge>
  );
}
