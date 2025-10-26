import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Menu, FileText, Eye } from "lucide-react";
import { OccurrenceForm, type Occurrence } from "./OccurrenceForm";
import { OccurrencesList } from "./OccurrencesList";

export function OccurrenceMenu() {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Carregar ocorrências do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("occurrences");
    if (saved) {
      try {
        setOccurrences(JSON.parse(saved));
      } catch (error) {
        console.error("Erro ao carregar ocorrências:", error);
      }
    }
  }, []);

  // Salvar ocorrências no localStorage
  useEffect(() => {
    localStorage.setItem("occurrences", JSON.stringify(occurrences));
  }, [occurrences]);

  const handleSubmitOccurrence = (occurrence: Occurrence) => {
    setOccurrences((prev) => [occurrence, ...prev]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-white shadow-lg hover:bg-gray-50"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Ocorrências
          </SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="register" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Registrar
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Visualizar
              {occurrences.length > 0 && (
                <span className="ml-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {occurrences.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="mt-6">
            <OccurrenceForm onSubmit={handleSubmitOccurrence} />
          </TabsContent>

          <TabsContent value="view" className="mt-6">
            <OccurrencesList occurrences={occurrences} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
