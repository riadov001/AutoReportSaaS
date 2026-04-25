import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, FileType, CheckCircle2, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export default function CSVImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [table, setTable] = useState<string>("users");
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map(h => h.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const obj: any = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        let val = currentline[j]?.trim();
        // Basic type conversion
        if (val === "true") val = true;
        else if (val === "false") val = false;
        else if (!isNaN(Number(val)) && val !== "") val = Number(val);
        
        obj[headers[j]] = val;
      }
      result.push(obj);
    }
    return result;
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier CSV",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    try {
      const text = await file.text();
      const data = parseCSV(text);

      const res = await apiRequest("POST", "/api/admin/import/csv", {
        table,
        data,
      });
      const result = await res.json();

      toast({
        title: "Import terminé",
        description: `${result.successCount} succès, ${result.errorCount} erreurs sur ${result.total} lignes.`,
      });

      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: [`/api/admin/${table}`] });
      
      setFile(null);
    } catch (error: any) {
      toast({
        title: "Erreur d'import",
        description: error.message || "Une erreur est survenue lors de l'import",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Import CSV</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Configuration de l'import
            </CardTitle>
            <CardDescription>
              Importez massivement vos données depuis un fichier CSV.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de données</label>
              <Select value={table} onValueChange={setTable}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le type d'import" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Utilisateurs / Clients</SelectItem>
                  <SelectItem value="quotes">Devis</SelectItem>
                  <SelectItem value="invoices">Factures</SelectItem>
                  <SelectItem value="reservations">Réservations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fichier CSV</label>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                La première ligne doit contenir les noms exacts des colonnes (ex: email, firstName, lastName pour les utilisateurs).
              </p>
            </div>

            <Button 
              className="w-full" 
              onClick={handleImport} 
              disabled={isImporting || !file}
            >
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importation en cours...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Lancer l'import
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Instructions & Formats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="space-y-2">
              <p className="font-semibold">Colonnes recommandées par type :</p>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li><strong>Utilisateurs :</strong> email, firstName, lastName, phone, role, password</li>
                <li><strong>Devis :</strong> clientId, serviceId, status, quoteAmount, reference</li>
                <li><strong>Factures :</strong> clientId, quoteId, invoiceNumber, amount, status</li>
                <li><strong>Réservations :</strong> clientId, serviceId, scheduledDate, status</li>
              </ul>
            </div>
            <div className="p-3 bg-muted rounded-md border">
              <p className="text-xs font-mono">
                Exemple (users.csv):<br />
                email,firstName,lastName,role<br />
                jean.dupont@email.com,Jean,Dupont,client
              </p>
            </div>
            <p className="text-xs italic text-amber-600">
              Note: Les IDs (clientId, serviceId) doivent correspondre à des IDs existants dans la base de données.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
