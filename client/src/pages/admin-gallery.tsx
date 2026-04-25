import { useState, useRef, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Images, Download, Upload, X, ZoomIn, ChevronLeft, ChevronRight,
  FileVideo, File, Search, Calendar, User, SortDesc, SortAsc,
  RefreshCw, AlertTriangle, CheckCircle2, SkipForward, FolderUp, ImagePlus
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface GalleryMedia {
  id: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size: number | null;
  created_at: string;
  reference: string | null;
  client_id: string | null;
  client_name: string | null;
  entity_date: string | null;
  entity_type: "quote" | "invoice";
}

interface ImportConflict {
  filename: string;
  reference: string;
  entityType: string;
  entityId: string;
  mediaId: string;
  buffer: string;
}

interface ImportResult {
  results: { filename: string; status: string; reason?: string; reference?: string }[];
  conflicts: ImportConflict[];
  summary: { imported: number; skipped: number; conflicts: number };
}

function getMediaUrl(filePath: string): string {
  if (!filePath) return "";
  if (filePath.startsWith("http")) return filePath;
  if (filePath.startsWith("/objects/")) return filePath;
  if (filePath.startsWith("/uploads/")) return filePath;
  if (filePath.startsWith("/backups/")) return filePath;
  if (filePath.startsWith("/r2/")) return filePath;
  if (filePath.startsWith("/gdrive/")) return `/api/gdrive/proxy?path=${encodeURIComponent(filePath)}`;
  
  // Clean path if it starts with uploads/ or /uploads/ to ensure proper routing
  const cleanPath = filePath.replace(/^\/?uploads\//, "/uploads/");
  if (cleanPath.startsWith("/uploads/")) return cleanPath;

  return filePath;
}

function MediaThumbnail({ media, onClick, isSelected }: { media: GalleryMedia; onClick: () => void; isSelected?: boolean }) {
  const [imgError, setImgError] = useState(false);
  const isImage = media.file_type === "image";
  const isVideo = media.file_type === "video";

  return (
    <div
      data-testid={`gallery-item-${media.id}`}
      className={`relative group cursor-pointer rounded-md overflow-hidden bg-muted aspect-square hover-elevate ${isSelected ? 'ring-4 ring-primary' : ''}`}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground rounded-full p-1">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      )}
      {isImage && !imgError ? (
        <img
          src={getMediaUrl(media.file_path)}
          alt={media.file_name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : isVideo ? (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <FileVideo className="w-10 h-10 text-muted-foreground" />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-muted gap-2">
          <File className="w-10 h-10 text-muted-foreground" />
          <span className="text-xs text-muted-foreground text-center px-2 break-all line-clamp-2">{media.file_name}</span>
        </div>
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <ZoomIn className="w-6 h-6 text-white" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1.5 translate-y-full group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-1">
          <Badge variant="secondary" className="text-xs px-1 py-0">
            {media.entity_type === "quote" ? "Devis" : "Facture"}
          </Badge>
          <span className="text-xs text-white truncate">{media.reference || "—"}</span>
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  media, allMedia, currentIndex, onClose, onPrev, onNext
}: {
  media: GalleryMedia;
  allMedia: GalleryMedia[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const isImage = media.file_type === "image";
  const isVideo = media.file_type === "video";

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <Button
        size="icon" variant="ghost"
        className="absolute top-4 right-4 text-white hover-elevate z-10"
        onClick={onClose}
        data-testid="button-lightbox-close"
      >
        <X className="w-6 h-6" />
      </Button>

      <Button
        size="icon" variant="ghost"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover-elevate z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        disabled={currentIndex === 0}
        data-testid="button-lightbox-prev"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {isImage ? (
          <img
            src={getMediaUrl(media.file_path)}
            alt={media.file_name}
            className="max-h-[75vh] max-w-full object-contain rounded-md"
          />
        ) : isVideo ? (
          <video
            src={getMediaUrl(media.file_path)}
            controls
            className="max-h-[75vh] max-w-full rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center gap-4 text-white p-8">
            <File className="w-20 h-20 text-muted-foreground" />
            <p className="text-lg">{media.file_name}</p>
            <Button asChild>
              <a href={getMediaUrl(media.file_path)} download={media.file_name}>
                <Download className="w-4 h-4 mr-2" /> Télécharger
              </a>
            </Button>
          </div>
        )}

        <div className="bg-black/60 text-white rounded-md px-4 py-2 text-sm flex flex-wrap gap-3 items-center justify-center">
          <Badge variant={media.entity_type === "quote" ? "default" : "secondary"}>
            {media.entity_type === "quote" ? "Devis" : "Facture"}
          </Badge>
          <span className="font-mono">{media.reference || "—"}</span>
          {media.client_name && <span className="text-muted-foreground">· {media.client_name}</span>}
          {media.created_at && (
            <span className="text-muted-foreground">
              · {format(new Date(media.created_at), "dd/MM/yyyy", { locale: fr })}
            </span>
          )}
          <span className="text-muted-foreground">· {currentIndex + 1} / {allMedia.length}</span>
        </div>
      </div>

      <Button
        size="icon" variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover-elevate z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        disabled={currentIndex === allMedia.length - 1}
        data-testid="button-lightbox-next"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>
    </div>
  );
}

function ConflictDialog({
  conflicts,
  onResolve,
  onClose
}: {
  conflicts: ImportConflict[];
  onResolve: (action: "overwrite" | "rename") => void;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Conflits détectés ({conflicts.length})
          </DialogTitle>
          <DialogDescription>
            Les fichiers suivants existent déjà pour ces références. Que souhaitez-vous faire ?
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-48 overflow-y-auto border rounded-md divide-y">
          {conflicts.map((c, i) => (
            <div key={i} className="px-3 py-2 text-sm flex items-center justify-between gap-2">
              <span className="font-mono text-xs truncate">{c.filename}</span>
              <Badge variant="outline" className="shrink-0">{c.reference}</Badge>
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose} data-testid="button-conflict-skip">
            <SkipForward className="w-4 h-4 mr-2" /> Ignorer les conflits
          </Button>
          <Button variant="secondary" onClick={() => onResolve("rename")} data-testid="button-conflict-rename">
            Renommer et importer
          </Button>
          <Button onClick={() => onResolve("overwrite")} data-testid="button-conflict-overwrite">
            Écraser les existants
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminGallery({ engagementId }: { engagementId?: string }) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filters
  const [filterType, setFilterType] = useState("all");
  const [filterRef, setFilterRef] = useState("");
  const [filterClientId, setFilterClientId] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterFileType, setFilterFileType] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [page, setPage] = useState(1);

  // Selection & Actions
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [assignTarget, setAssignTarget] = useState<{ id: string; reference: string; type: "quote" | "invoice" } | null>(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState("");

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Import state
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [pendingConflicts, setPendingConflicts] = useState<ImportConflict[]>([]);
  const [showConflictDialog, setShowConflictDialog] = useState(false);
  const [importSummaryOpen, setImportSummaryOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Bulk upload state
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [bulkEntityType, setBulkEntityType] = useState<"quote" | "invoice">("quote");
  const [bulkEntityRef, setBulkEntityRef] = useState("");
  const [bulkEntityId, setBulkEntityId] = useState("");
  const [bulkUploadProgress, setBulkUploadProgress] = useState(0);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [bulkUploadResult, setBulkUploadResult] = useState<{ uploaded: number; errors: number; total: number } | null>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  const buildParams = () => {
    const params = new URLSearchParams();
    if (filterType !== "all") params.set("type", filterType);
    if (filterRef) params.set("reference", filterRef);
    if (filterClientId) params.set("clientId", filterClientId);
    if (filterDateFrom) params.set("dateFrom", filterDateFrom);
    if (filterDateTo) params.set("dateTo", filterDateTo);
    if (filterFileType !== "all") params.set("fileType", filterFileType);
    if (engagementId) params.set("engagementId", engagementId);
    params.set("sortBy", sortBy);
    params.set("page", String(page));
    params.set("limit", "60");
    return params;
  };

  const { data, isLoading, refetch } = useQuery<{ media: GalleryMedia[]; total: number; page: number; limit: number }>({
    queryKey: ["/api/gallery", filterType, filterRef, filterClientId, filterDateFrom, filterDateTo, filterFileType, sortBy, page, engagementId],
    queryFn: () => fetch(`/api/gallery?${buildParams()}`).then(r => r.json()),
  });

  const { data: clients } = useQuery<any[]>({
    queryKey: ["/api/clients"],
  });

  const media = data?.media || [];
  const total = data?.total || 0;

  const handleBulkDelete = async () => {
    if (!confirm(`Supprimer ${selectedMedia.length} fichiers ?`)) return;
    try {
      await apiRequest("POST", "/api/gallery/bulk-delete", { mediaIds: selectedMedia });
      toast({ title: "Suppression réussie" });
      setSelectedMedia([]);
      setIsSelectionMode(false);
      refetch();
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    }
  };

  const handleBulkRename = async () => {
    if (selectedMedia.length !== 1) {
      toast({ title: "Information", description: "Le renommage en masse sera disponible bientôt. Pour l'instant, renommez un par un." });
      return;
    }
    try {
      await apiRequest("POST", "/api/gallery/bulk-rename", { 
        mediaIds: selectedMedia, 
        newNames: [newName] 
      });
      toast({ title: "Renommage réussi" });
      setIsRenaming(false);
      setSelectedMedia([]);
      setIsSelectionMode(false);
      refetch();
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    }
  };

  const handleBulkDownload = async () => {
    // For bulk download, we can reuse the export logic with specific IDs
    toast({ title: "Téléchargement", description: "Préparation du ZIP..." });
    // Simplified: just download one by one or suggest using Export ZIP with filters
    const selectedFiles = media.filter(m => selectedMedia.includes(m.id));
    for (const m of selectedFiles) {
      const a = document.createElement("a");
      a.href = getMediaUrl(m.file_path);
      a.download = m.file_name;
      a.click();
    }
  };

  const handleExport = async () => {
    const params = buildParams();
    const url = `/api/gallery/export?${params}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Export échoué");
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `galerie_export_${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(a.href);
      toast({ title: "Export réussi", description: `${total} fichiers exportés` });
    } catch (e: any) {
      toast({ title: "Erreur export", description: e.message, variant: "destructive" });
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".zip")) {
      toast({ title: "Format invalide", description: "Veuillez sélectionner un fichier ZIP", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/gallery/import", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const result: ImportResult = await res.json();

      setImportResult(result);

      if (result.conflicts.length > 0) {
        setPendingConflicts(result.conflicts);
        setShowConflictDialog(true);
      } else {
        setImportSummaryOpen(true);
        if (result.summary.imported > 0) {
          refetch();
          queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
        }
      }
    } catch (e: any) {
      toast({ title: "Erreur import", description: e.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleResolveConflicts = async (action: "overwrite" | "rename") => {
    setShowConflictDialog(false);
    try {
      const res = await apiRequest("POST", "/api/gallery/import/resolve", {
        conflicts: pendingConflicts,
        action,
      });
      const resolveResult = await res.json();
      toast({
        title: `Conflits résolus`,
        description: `${resolveResult.results.filter((r: any) => r.status !== "error").length} fichiers traités`,
      });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    } catch (e: any) {
      toast({ title: "Erreur résolution", description: e.message, variant: "destructive" });
    }
    setImportSummaryOpen(true);
    setPendingConflicts([]);
  };

  const resetFilters = () => {
    setFilterType("all");
    setFilterRef("");
    setFilterClientId("");
    setFilterDateFrom("");
    setFilterDateTo("");
    setFilterFileType("all");
    setSortBy("date_desc");
    setPage(1);
  };

  const totalPages = Math.ceil(total / 60);

  const toggleMediaSelection = (id: string) => {
    setSelectedMedia(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAssignToEntity = async (entityId: string, entityType: string, reference: string) => {
    try {
      await apiRequest("POST", "/api/gallery/assign", {
        mediaIds: selectedMedia,
        entityId,
        entityType,
        reference,
      });
      toast({ title: "Liaison réussie", description: `${selectedMedia.length} médias liés à ${reference}` });
      setShowAssignDialog(false);
      setSelectedMedia([]);
      setIsSelectionMode(false);
      setAssignTarget(null);
      refetch();
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    }
  };

  const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 20) {
      toast({ title: "Limite dépassée", description: "Maximum 20 fichiers à la fois", variant: "destructive" });
      return;
    }
    setBulkFiles(selected);
    setBulkUploadResult(null);
  };

  const removeBulkFile = (index: number) => {
    setBulkFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleBulkUpload = async () => {
    if (bulkFiles.length === 0) return;

    setIsBulkUploading(true);
    setBulkUploadProgress(0);
    setBulkUploadResult(null);

    try {
      const formData = new FormData();
      bulkFiles.forEach(f => formData.append("files", f));
      if (bulkEntityId) formData.append("entityId", bulkEntityId);
      if (bulkEntityType) formData.append("entityType", bulkEntityType);
      if (bulkEntityRef) formData.append("reference", bulkEntityRef);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/gallery/bulk-upload");
      xhr.withCredentials = true;

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setBulkUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      const result = await new Promise<any>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            try {
              const err = JSON.parse(xhr.responseText);
              reject(new Error(err.message || "Upload échoué"));
            } catch {
              reject(new Error("Upload échoué"));
            }
          }
        };
        xhr.onerror = () => reject(new Error("Erreur réseau"));
        xhr.send(formData);
      });

      setBulkUploadResult(result.summary);
      toast({
        title: "Upload terminé",
        description: `${result.summary.uploaded} fichier(s) importé(s) sur ${result.summary.total}`,
      });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
    } catch (e: any) {
      toast({ title: "Erreur upload", description: e.message, variant: "destructive" });
    } finally {
      setIsBulkUploading(false);
    }
  };

  const resetBulkUpload = () => {
    setBulkFiles([]);
    setBulkEntityRef("");
    setBulkEntityId("");
    setBulkEntityType("quote");
    setBulkUploadProgress(0);
    setBulkUploadResult(null);
    setShowBulkUpload(false);
    if (bulkFileInputRef.current) bulkFileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevMedia = () => setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i));
  const nextMedia = () => setLightboxIndex(i => (i !== null && i < media.length - 1 ? i + 1 : i));

  const hasActiveFilters = filterType !== "all" || filterRef || filterClientId || filterDateFrom || filterDateTo || filterFileType !== "all";

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Images className="w-6 h-6" /> Galerie
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {total} médias · Devis et Factures
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {isSelectionMode ? (
            <>
              <Badge variant="outline" className="mr-2">{selectedMedia.length} sélectionnés</Badge>
              <Button variant="outline" size="sm" onClick={handleBulkDownload} disabled={selectedMedia.length === 0}>
                <Download className="w-4 h-4 mr-2" /> Télécharger
              </Button>
              <Button variant="outline" size="sm" onClick={() => { 
                if (selectedMedia.length === 1) {
                  const m = media.find(m => m.id === selectedMedia[0]);
                  setNewName(m?.file_name || "");
                  setIsRenaming(true);
                } else {
                  handleBulkRename();
                }
              }} disabled={selectedMedia.length === 0}>
                Renommer
              </Button>
              <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={selectedMedia.length === 0}>
                Supprimer
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowAssignDialog(true)} disabled={selectedMedia.length === 0}>
                Associer à...
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setIsSelectionMode(false); setSelectedMedia([]); }}>
                Annuler
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setIsSelectionMode(true)}>
              Sélectionner
            </Button>
          )}
          <Button variant="outline" onClick={handleExport} data-testid="button-gallery-export">
            <Download className="w-4 h-4 mr-2" /> Exporter ZIP
          </Button>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            data-testid="button-gallery-import"
          >
            {isUploading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
            Importer ZIP
          </Button>
          <Button
            onClick={() => { setShowBulkUpload(true); setBulkUploadResult(null); setBulkFiles([]); }}
            data-testid="button-gallery-bulk-upload"
          >
            <ImagePlus className="w-4 h-4 mr-2" />
            Importer médias
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".zip"
            className="hidden"
            onChange={handleImportFile}
          />
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={isRenaming} onOpenChange={setIsRenaming}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renommer le fichier</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nouveau nom de fichier" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenaming(false)}>Annuler</Button>
            <Button onClick={handleBulkRename}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter à un document</DialogTitle>
            <DialogDescription>
              Liez les {selectedMedia.length} médias sélectionnés à un devis ou une facture.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rechercher par référence</label>
              <Input 
                placeholder="Ex: DEV-02-00001" 
                onChange={async (e) => {
                  const val = e.target.value;
                  if (val.length > 3) {
                    const res = await fetch(`/api/admin/search-entity?q=${val}`);
                    const data = await res.json();
                    if (data.id) setAssignTarget(data);
                  }
                }}
              />
            </div>
            {assignTarget && (
              <div className="p-3 bg-muted rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium">{assignTarget.reference}</p>
                  <p className="text-xs text-muted-foreground">{assignTarget.type === 'quote' ? 'Devis' : 'Facture'}</p>
                </div>
                <Button size="sm" onClick={() => handleAssignToEntity(assignTarget.id, assignTarget.type, assignTarget.reference)}>
                  Lier ici
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Référence (DEV-02-..., VIR-...)"
                value={filterRef}
                onChange={e => { setFilterRef(e.target.value); setPage(1); }}
                className="pl-9"
                data-testid="input-filter-reference"
              />
            </div>

            <Select value={filterType} onValueChange={v => { setFilterType(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]" data-testid="select-filter-type">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="quote">Devis</SelectItem>
                <SelectItem value="invoice">Factures</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterFileType} onValueChange={v => { setFilterFileType(v); setPage(1); }}>
              <SelectTrigger className="w-[140px]" data-testid="select-filter-filetype">
                <SelectValue placeholder="Fichiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous types</SelectItem>
                <SelectItem value="image">Photos</SelectItem>
                <SelectItem value="video">Vidéos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>

            {clients && clients.length > 0 && (
              <Select value={filterClientId || "all"} onValueChange={v => { setFilterClientId(v === "all" ? "" : v); setPage(1); }}>
                <SelectTrigger className="w-[160px]" data-testid="select-filter-client">
                  <User className="w-4 h-4 mr-2 shrink-0" />
                  <SelectValue placeholder="Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous clients</SelectItem>
                  {clients.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.firstName} {c.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <Input
                type="date"
                value={filterDateFrom}
                onChange={e => { setFilterDateFrom(e.target.value); setPage(1); }}
                className="w-[145px]"
                data-testid="input-filter-date-from"
              />
              <span className="text-muted-foreground text-sm">→</span>
              <Input
                type="date"
                value={filterDateTo}
                onChange={e => { setFilterDateTo(e.target.value); setPage(1); }}
                className="w-[145px]"
                data-testid="input-filter-date-to"
              />
            </div>

            <Select value={sortBy} onValueChange={v => { setSortBy(v); setPage(1); }}>
              <SelectTrigger className="w-[170px]" data-testid="select-sort">
                {sortBy.includes("asc") ? <SortAsc className="w-4 h-4 mr-2" /> : <SortDesc className="w-4 h-4 mr-2" />}
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date_desc">Date (récent)</SelectItem>
                <SelectItem value="date_asc">Date (ancien)</SelectItem>
                <SelectItem value="ref_asc">Référence A→Z</SelectItem>
                <SelectItem value="ref_desc">Référence Z→A</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button variant="ghost" size="default" onClick={resetFilters} data-testid="button-reset-filters">
                <X className="w-4 h-4 mr-2" /> Réinitialiser
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-md bg-muted animate-pulse" />
          ))}
        </div>
      ) : media.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
          <Images className="w-16 h-16 opacity-30" />
          <p className="text-lg font-medium">Aucun média trouvé</p>
          {hasActiveFilters && (
            <Button variant="outline" onClick={resetFilters}>Réinitialiser les filtres</Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {media.map((m, i) => (
              <MediaThumbnail 
                key={m.id} 
                media={m} 
                onClick={() => isSelectionMode ? toggleMediaSelection(m.id) : openLightbox(i)} 
                isSelected={selectedMedia.includes(m.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <Button
                variant="outline" size="default"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                data-testid="button-prev-page"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} / {totalPages} · {total} médias
              </span>
              <Button
                variant="outline" size="default"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                data-testid="button-next-page"
              >
                Suivant <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && media[lightboxIndex] && (
        <Lightbox
          media={media[lightboxIndex]}
          allMedia={media}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevMedia}
          onNext={nextMedia}
        />
      )}

      {/* Conflict Dialog */}
      {showConflictDialog && pendingConflicts.length > 0 && (
        <ConflictDialog
          conflicts={pendingConflicts}
          onResolve={handleResolveConflicts}
          onClose={() => {
            setShowConflictDialog(false);
            setImportSummaryOpen(true);
          }}
        />
      )}

      {/* Bulk Upload Dialog */}
      <Dialog open={showBulkUpload} onOpenChange={(open) => { if (!isBulkUploading) { if (!open) resetBulkUpload(); else setShowBulkUpload(true); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImagePlus className="w-5 h-5" /> Importer des médias
            </DialogTitle>
            <DialogDescription>
              Sélectionnez jusqu'à 20 fichiers (images, vidéos) depuis votre appareil.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div
              className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover-elevate transition-colors"
              onClick={() => bulkFileInputRef.current?.click()}
              data-testid="dropzone-bulk-upload"
            >
              <FolderUp className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Cliquer pour sélectionner des fichiers</p>
              <p className="text-xs text-muted-foreground mt-1">
                Images (JPG, PNG, WebP, HEIC) et Vidéos (MP4, MOV, WebM) · Max 20 fichiers
              </p>
              <input
                ref={bulkFileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,.heic,.heif"
                className="hidden"
                onChange={handleBulkFileSelect}
                data-testid="input-bulk-files"
              />
            </div>

            {bulkFiles.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{bulkFiles.length} fichier(s) sélectionné(s)</span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(bulkFiles.reduce((acc, f) => acc + f.size, 0))} total
                  </span>
                </div>
                <div className="max-h-40 overflow-y-auto border rounded-md divide-y">
                  {bulkFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between gap-2 px-3 py-1.5 text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        {f.type.startsWith("image") ? (
                          <Images className="w-4 h-4 text-muted-foreground shrink-0" />
                        ) : (
                          <FileVideo className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <span className="truncate">{f.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-muted-foreground">{formatFileSize(f.size)}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeBulkFile(i)}
                          disabled={isBulkUploading}
                          data-testid={`button-remove-file-${i}`}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm">Type de document</Label>
                <Select value={bulkEntityType} onValueChange={(v: "quote" | "invoice") => setBulkEntityType(v)}>
                  <SelectTrigger data-testid="select-bulk-entity-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quote">Devis</SelectItem>
                    <SelectItem value="invoice">Facture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">Référence (optionnel)</Label>
                <Input
                  placeholder="Ex: DEV-02-00001"
                  value={bulkEntityRef}
                  onChange={async (e) => {
                    const val = e.target.value;
                    setBulkEntityRef(val);
                    if (val.length > 3) {
                      try {
                        const res = await fetch(`/api/admin/search-entity?q=${val}`);
                        const data = await res.json();
                        if (data.id) setBulkEntityId(data.id);
                      } catch {}
                    }
                  }}
                  data-testid="input-bulk-reference"
                />
              </div>
            </div>
            {bulkEntityId && bulkEntityRef && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Document trouvé : {bulkEntityRef}</span>
              </div>
            )}

            {isBulkUploading && (
              <div className="space-y-2">
                <Progress value={bulkUploadProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">{bulkUploadProgress}% envoyé</p>
              </div>
            )}

            {bulkUploadResult && (
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-green-500/10 rounded-md p-3">
                  <div className="text-xl font-bold text-green-600">{bulkUploadResult.uploaded}</div>
                  <div className="text-xs text-muted-foreground mt-1">Importés</div>
                </div>
                <div className="bg-red-500/10 rounded-md p-3">
                  <div className="text-xl font-bold text-red-600">{bulkUploadResult.errors}</div>
                  <div className="text-xs text-muted-foreground mt-1">Erreurs</div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={resetBulkUpload} disabled={isBulkUploading} data-testid="button-bulk-cancel">
              {bulkUploadResult ? "Fermer" : "Annuler"}
            </Button>
            {!bulkUploadResult && (
              <Button
                onClick={handleBulkUpload}
                disabled={bulkFiles.length === 0 || isBulkUploading}
                data-testid="button-bulk-submit"
              >
                {isBulkUploading ? (
                  <><RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Envoi en cours...</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" /> Importer {bulkFiles.length > 0 ? `(${bulkFiles.length})` : ""}</>
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Summary Dialog */}
      <Dialog open={importSummaryOpen} onOpenChange={setImportSummaryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Import terminé
            </DialogTitle>
          </DialogHeader>
          {importResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-green-500/10 rounded-md p-3">
                  <div className="text-2xl font-bold text-green-600">{importResult.summary.imported}</div>
                  <div className="text-xs text-muted-foreground mt-1">Importés</div>
                </div>
                <div className="bg-amber-500/10 rounded-md p-3">
                  <div className="text-2xl font-bold text-amber-600">{importResult.summary.conflicts}</div>
                  <div className="text-xs text-muted-foreground mt-1">Conflits</div>
                </div>
                <div className="bg-muted rounded-md p-3">
                  <div className="text-2xl font-bold text-muted-foreground">{importResult.summary.skipped}</div>
                  <div className="text-xs text-muted-foreground mt-1">Ignorés</div>
                </div>
              </div>

              {importResult.results.filter(r => r.status === "skipped").length > 0 && (
                <details className="text-sm">
                  <summary className="cursor-pointer text-muted-foreground hover-elevate rounded-md px-2 py-1">
                    Fichiers ignorés ({importResult.results.filter(r => r.status === "skipped").length})
                  </summary>
                  <div className="mt-2 max-h-32 overflow-y-auto border rounded-md divide-y">
                    {importResult.results.filter(r => r.status === "skipped").map((r, i) => (
                      <div key={i} className="px-3 py-1.5 text-xs flex justify-between gap-2">
                        <span className="truncate font-mono">{r.filename}</span>
                        <span className="text-muted-foreground shrink-0">{r.reason}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setImportSummaryOpen(false)} data-testid="button-import-close">Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
