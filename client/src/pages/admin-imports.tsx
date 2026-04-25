import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileType, AlertTriangle, CheckCircle2, Loader2, Database, FileJson, FileCode2, Image } from "lucide-react";
import type { Garage } from "@shared/schema";

export default function AdminImports() {
  const { isRootAdmin } = useAuth();
  const { toast } = useToast();
  const [selectedGarageId, setSelectedGarageId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const csvFileRef = useRef<HTMLInputElement>(null);
  const [csvTable, setCsvTable] = useState("quotes");
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const jsonFileRef = useRef<HTMLInputElement>(null);
  const [jsonFile, setJsonFile] = useState<File | null>(null);

  const sqlFileRef = useRef<HTMLInputElement>(null);
  const [sqlFile, setSqlFile] = useState<File | null>(null);
  const [replaceExisting, setReplaceExisting] = useState(false);

  const mediaFileRef = useRef<HTMLInputElement>(null);
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [mediaType, setMediaType] = useState<"quote" | "invoice">("quote");
  const [mediaEntityId, setMediaEntityId] = useState("");

  const { data: garages = [] } = useQuery<Garage[]>({
    queryKey: ["/api/superadmin/garages"],
    enabled: isRootAdmin,
  });

  if (!isRootAdmin) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <AlertTriangle className="h-12 w-12 text-destructive" />
            <p className="text-lg font-semibold">Accès Root Admin requis</p>
            <p className="text-sm text-muted-foreground text-center">Les imports sont réservés aux Root Admins uniquement.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const garageHeaders = (): HeadersInit => {
    const headers: Record<string, string> = {};
    if (selectedGarageId && selectedGarageId !== "all") {
      headers["x-garage-id"] = selectedGarageId;
    }
    return headers;
  };

  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
    const result = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const obj: any = {};
      const cols = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        let val: any = cols[j]?.trim().replace(/^"|"$/g, "");
        if (val === "true") val = true;
        else if (val === "false") val = false;
        else if (!isNaN(Number(val)) && val !== "") val = Number(val);
        obj[headers[j]] = val;
      }
      result.push(obj);
    }
    return result;
  };

  const handleCsvImport = async () => {
    if (!csvFile) return toast({ title: "Erreur", description: "Sélectionnez un fichier CSV", variant: "destructive" });
    setIsLoading(true);
    setResult(null);
    try {
      const text = await csvFile.text();
      const data = parseCSV(text);
      const garageId = selectedGarageId !== "all" ? selectedGarageId : undefined;
      const res = await fetch("/api/admin/import/csv", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...garageHeaders() },
        credentials: "include",
        body: JSON.stringify({ table: csvTable, data, garageId }),
      });
      const json = await res.json();
      setResult({ type: "csv", ...json });
      if (res.ok) toast({ title: "Import CSV terminé", description: `${json.successCount} lignes importées, ${json.errorCount} erreurs` });
      else toast({ title: "Erreur", description: json.message, variant: "destructive" });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJsonImport = async () => {
    if (!jsonFile) return toast({ title: "Erreur", description: "Sélectionnez un fichier JSON", variant: "destructive" });
    setIsLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", jsonFile);
      const res = await fetch("/api/admin/import-data", {
        method: "POST",
        headers: garageHeaders(),
        credentials: "include",
        body: formData,
      });
      const json = await res.json();
      setResult({ type: "json", ...json });
      if (res.ok) toast({ title: "Import JSON terminé", description: json.message });
      else toast({ title: "Erreur", description: json.message, variant: "destructive" });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSqlImport = async () => {
    if (!sqlFile) return toast({ title: "Erreur", description: "Sélectionnez un fichier SQL", variant: "destructive" });
    setIsLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", sqlFile);
      formData.append("replaceExisting", String(replaceExisting));
      const res = await fetch("/api/admin/import-sql", {
        method: "POST",
        headers: garageHeaders(),
        credentials: "include",
        body: formData,
      });
      const json = await res.json();
      setResult({ type: "sql", ...json });
      if (res.ok) toast({ title: "Import SQL terminé", description: json.message });
      else toast({ title: "Erreur", description: json.message, variant: "destructive" });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMediaImport = async () => {
    if (!mediaFiles || mediaFiles.length === 0) return toast({ title: "Erreur", description: "Sélectionnez des fichiers", variant: "destructive" });
    setIsLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      for (let i = 0; i < mediaFiles.length; i++) formData.append("files", mediaFiles[i]);
      formData.append("type", mediaType);
      if (mediaEntityId) formData.append("entityId", mediaEntityId);
      if (selectedGarageId !== "all") formData.append("garageId", selectedGarageId);
      const res = await fetch("/api/admin/import-media", {
        method: "POST",
        headers: garageHeaders(),
        credentials: "include",
        body: formData,
      });
      const json = await res.json();
      setResult({ type: "media", ...json });
      if (res.ok) toast({ title: "Import médias terminé", description: json.message });
      else toast({ title: "Erreur", description: json.message, variant: "destructive" });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-primary/10">
          <Upload className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Gestion des Imports</h1>
          <p className="text-sm text-muted-foreground">Import CSV, JSON, SQL et médias — Root Admin uniquement</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="h-4 w-4" />
            Garage cible
          </CardTitle>
          <CardDescription>Sélectionnez le garage pour lequel vous importez les données</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedGarageId} onValueChange={setSelectedGarageId}>
            <SelectTrigger className="max-w-sm" data-testid="select-import-garage">
              <SelectValue placeholder="Sélectionner un garage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les garages (global)</SelectItem>
              {garages.map((g) => (
                <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedGarageId !== "all" && (
            <p className="text-xs text-muted-foreground mt-2">
              Les données seront importées pour : <strong>{garages.find((g) => g.id === selectedGarageId)?.name}</strong>
            </p>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="csv">
        <TabsList className="w-full flex">
          <TabsTrigger value="csv" className="flex-1" data-testid="tab-import-csv">
            <FileType className="h-3.5 w-3.5 mr-1.5" />CSV
          </TabsTrigger>
          <TabsTrigger value="json" className="flex-1" data-testid="tab-import-json">
            <FileJson className="h-3.5 w-3.5 mr-1.5" />JSON
          </TabsTrigger>
          <TabsTrigger value="sql" className="flex-1" data-testid="tab-import-sql">
            <FileCode2 className="h-3.5 w-3.5 mr-1.5" />SQL
          </TabsTrigger>
          <TabsTrigger value="media" className="flex-1" data-testid="tab-import-media">
            <Image className="h-3.5 w-3.5 mr-1.5" />Médias
          </TabsTrigger>
        </TabsList>

        <TabsContent value="csv" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Import CSV</CardTitle>
              <CardDescription>Importez des données depuis un fichier CSV dans la table sélectionnée</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Table cible</Label>
                <Select value={csvTable} onValueChange={setCsvTable}>
                  <SelectTrigger data-testid="select-csv-table">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quotes">Devis</SelectItem>
                    <SelectItem value="invoices">Factures</SelectItem>
                    <SelectItem value="reservations">Réservations</SelectItem>
                    <SelectItem value="users">Utilisateurs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Fichier CSV</Label>
                <Input
                  ref={csvFileRef}
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  data-testid="input-csv-file"
                />
                {csvFile && <p className="text-xs text-muted-foreground">{csvFile.name} ({(csvFile.size / 1024).toFixed(1)} Ko)</p>}
              </div>
              <Button onClick={handleCsvImport} disabled={isLoading || !csvFile} data-testid="button-import-csv">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                Importer CSV
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="json" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Import JSON (Backup)</CardTitle>
              <CardDescription>Restaurez depuis un fichier JSON exporté par l'application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Fichier JSON</Label>
                <Input
                  ref={jsonFileRef}
                  type="file"
                  accept=".json"
                  onChange={(e) => setJsonFile(e.target.files?.[0] || null)}
                  data-testid="input-json-file"
                />
                {jsonFile && <p className="text-xs text-muted-foreground">{jsonFile.name} ({(jsonFile.size / 1024).toFixed(1)} Ko)</p>}
              </div>
              <Button onClick={handleJsonImport} disabled={isLoading || !jsonFile} data-testid="button-import-json">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                Importer JSON
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sql" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Import SQL</CardTitle>
              <CardDescription>Exécutez un script SQL sur la base de données. Opération sensible — vérifiez le fichier avant import.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Fichier SQL</Label>
                <Input
                  ref={sqlFileRef}
                  type="file"
                  accept=".sql"
                  onChange={(e) => setSqlFile(e.target.files?.[0] || null)}
                  data-testid="input-sql-file"
                />
                {sqlFile && <p className="text-xs text-muted-foreground">{sqlFile.name} ({(sqlFile.size / 1024).toFixed(1)} Ko)</p>}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="replaceExisting"
                  checked={replaceExisting}
                  onChange={(e) => setReplaceExisting(e.target.checked)}
                  data-testid="checkbox-replace-existing"
                />
                <Label htmlFor="replaceExisting" className="cursor-pointer">Remplacer les données existantes (TRUNCATE avant import)</Label>
              </div>
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                <p className="text-xs text-destructive font-medium">Attention : Cette opération peut modifier ou supprimer des données existantes. Vérifiez le fichier SQL avant de procéder.</p>
              </div>
              <Button variant="destructive" onClick={handleSqlImport} disabled={isLoading || !sqlFile} data-testid="button-import-sql">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                Importer SQL
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Import Médias</CardTitle>
              <CardDescription>Importez des photos vers le stockage cloud et associez-les à un devis ou une facture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Type d'entité</Label>
                  <Select value={mediaType} onValueChange={(v) => setMediaType(v as "quote" | "invoice")}>
                    <SelectTrigger data-testid="select-media-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quote">Devis</SelectItem>
                      <SelectItem value="invoice">Facture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>ID ou référence (optionnel)</Label>
                  <Input
                    placeholder="Ex: DV-2025-0001"
                    value={mediaEntityId}
                    onChange={(e) => setMediaEntityId(e.target.value)}
                    data-testid="input-media-entity-id"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Fichiers médias</Label>
                <Input
                  ref={mediaFileRef}
                  type="file"
                  accept="image/*,video/*,.pdf"
                  multiple
                  onChange={(e) => setMediaFiles(e.target.files)}
                  data-testid="input-media-files"
                />
                {mediaFiles && mediaFiles.length > 0 && (
                  <p className="text-xs text-muted-foreground">{mediaFiles.length} fichier(s) sélectionné(s)</p>
                )}
              </div>
              <Button onClick={handleMediaImport} disabled={isLoading || !mediaFiles?.length} data-testid="button-import-media">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                Importer Médias
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {result && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              {result.success !== false ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-destructive" />
              )}
              Résultat de l'import
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-48 whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
