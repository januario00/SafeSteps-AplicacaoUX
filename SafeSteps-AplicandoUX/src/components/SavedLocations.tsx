import { MapPin, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export interface SavedLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface SavedLocationsProps {
  locations: SavedLocation[];
  onDelete: (id: string) => void;
  onNavigate?: (location: SavedLocation) => void;
}

export function SavedLocations({ locations, onDelete, onNavigate }: SavedLocationsProps) {
  if (locations.length === 0) {
    return (
      <Card className="p-6 text-center text-gray-500">
        <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
        <p>Nenhuma localização salva</p>
        <p className="text-sm">Salve suas localizações favoritas</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {locations.map((location) => (
        <Card
          key={location.id}
          className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => onNavigate?.(location)}
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#798DA7' }} />
            <div className="flex-1 min-w-0">
              <div className="truncate">{location.name}</div>
              <div className="text-sm text-gray-500">
                {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
              </div>
              <div className="text-xs text-gray-400">
                {new Date(location.timestamp).toLocaleDateString('pt-BR')} às{' '}
                {new Date(location.timestamp).toLocaleTimeString('pt-BR')}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(location.id);
              }}
              className="flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" style={{ color: '#5D6F85' }} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
