import { MapPin, AlertCircle, Phone } from "lucide-react";
import type { Occurrence } from "./OccurrenceForm";

interface MapViewProps {
  latitude: number;
  longitude: number;
  accuracy?: number;
  occurrences?: Occurrence[];
  showPoliceStations?: boolean;
}

export function MapView({ latitude, longitude, accuracy, occurrences = [], showPoliceStations = false }: MapViewProps) {
  // Simular um mapa com grid e marcador
  const centerX = 50; // porcentagem
  const centerY = 50; // porcentagem

  // Posições simuladas para ocorrências no mapa
  const occurrencePositions = occurrences.map((_, index) => ({
    x: 30 + (index * 15) % 40,
    y: 20 + (index * 20) % 60,
  }));

  // Posições simuladas para delegacias
  const policeStationPositions = showPoliceStations
    ? [
        { x: 20, y: 30, name: "Delegacia Centro" },
        { x: 70, y: 40, name: "Delegacia Zona Sul" },
        { x: 50, y: 70, name: "Delegacia da Mulher" },
      ]
    : [];

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-lg overflow-hidden border-2 border-gray-200">
      {/* Grid do mapa */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(10)].map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-gray-400" style={{ top: `${i * 10}%` }} />
        ))}
        {[...Array(10)].map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-gray-400" style={{ left: `${i * 10}%` }} />
        ))}
      </div>

      {/* Círculo de precisão */}
      {accuracy && (
        <div
          className="absolute bg-blue-500 opacity-20 rounded-full"
          style={{
            left: `${centerX}%`,
            top: `${centerY}%`,
            width: `${Math.min(accuracy / 10, 100)}px`,
            height: `${Math.min(accuracy / 10, 100)}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Marcadores de Ocorrências */}
      {occurrences.length > 0 && occurrencePositions.map((pos, index) => (
        <div
          key={`occurrence-${index}`}
          className="absolute group"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <AlertCircle className="w-6 h-6 text-orange-600 drop-shadow-lg cursor-pointer hover:scale-110 transition-transform" fill="currentColor" />
          <div className="absolute hidden group-hover:block bg-black/80 text-white text-xs p-2 rounded whitespace-nowrap -top-8 left-1/2 -translate-x-1/2 z-10">
            {occurrences[index]?.type || "Ocorrência"}
          </div>
        </div>
      ))}

      {/* Marcadores de Delegacias */}
      {policeStationPositions.map((station, index) => (
        <div
          key={`police-${index}`}
          className="absolute group"
          style={{
            left: `${station.x}%`,
            top: `${station.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="bg-pink-500 rounded-full p-2 shadow-lg cursor-pointer hover:scale-110 transition-transform">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <div className="absolute hidden group-hover:block bg-black/80 text-white text-xs p-2 rounded whitespace-nowrap -top-8 left-1/2 -translate-x-1/2 z-10">
            {station.name}
          </div>
        </div>
      ))}

      {/* Marcador de localização do usuário */}
      <div
        className="absolute z-20"
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <MapPin className="w-10 h-10 text-blue-600 drop-shadow-lg animate-bounce" fill="currentColor" />
      </div>

      {/* Coordenadas no canto */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs">
        {latitude.toFixed(6)}, {longitude.toFixed(6)}
      </div>

      {/* Legenda */}
      {(occurrences.length > 0 || showPoliceStations) && (
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs space-y-1">
          {occurrences.length > 0 && (
            <div className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-orange-600" fill="currentColor" />
              <span>{occurrences.length} Ocorrência{occurrences.length !== 1 ? 's' : ''}</span>
            </div>
          )}
          {showPoliceStations && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-pink-500" />
              <span>Delegacias</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
