import { MapPin } from "lucide-react";

interface MapViewProps {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export function MapView({ latitude, longitude, accuracy }: MapViewProps) {
  // Simular um mapa com grid e marcador
  const centerX = 50; // porcentagem
  const centerY = 50; // porcentagem

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

      {/* Marcador de localização */}
      <div
        className="absolute"
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <MapPin className="w-10 h-10 text-red-500 drop-shadow-lg animate-bounce" fill="currentColor" />
      </div>

      {/* Coordenadas no canto */}
      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs">
        {latitude.toFixed(6)}, {longitude.toFixed(6)}
      </div>
    </div>
  );
}
