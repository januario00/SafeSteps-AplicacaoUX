import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Calendar, Clock, MapPin, AlertCircle } from "lucide-react";
import type { Occurrence } from "./OccurrenceForm";

interface OccurrencesListProps {
  occurrences: Occurrence[];
}

export function OccurrencesList({ occurrences }: OccurrencesListProps) {
  if (occurrences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-gray-500">Nenhuma ocorrência registrada</p>
        <p className="text-sm text-gray-400 mt-1">
          Registre sua primeira ocorrência usando o formulário
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <ScrollArea className="h-[calc(100vh-300px)]">
      <div className="space-y-4 pr-4">
        {occurrences.map((occurrence) => (
          <Card key={occurrence.id} className="p-4 space-y-3">
            {/* Tipo */}
            <div className="flex items-start justify-between">
              <div>
                <Badge className="hover:bg-gray-200" style={{ background: '#E8EDF2', color: '#465363' }}>
                  {occurrence.type}
                </Badge>
              </div>
              <span className="text-xs text-gray-400">
                #{occurrence.id.slice(-6)}
              </span>
            </div>

            {/* Endereço */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#798DA7' }} />
              <p className="text-sm text-gray-700">{occurrence.address}</p>
            </div>

            {/* Data e Horário */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(occurrence.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{occurrence.time}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
