import { Navigation, Gauge, Crosshair, Clock } from "lucide-react";
import { Card } from "./ui/card";

interface LocationInfoProps {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  speed?: number | null;
  timestamp: number;
}

export function LocationInfo({
  latitude,
  longitude,
  accuracy,
  altitude,
  speed,
  timestamp,
}: LocationInfoProps) {
  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString('pt-BR');
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-start gap-2">
          <Navigation className="w-5 h-5 mt-0.5" style={{ color: '#798DA7' }} />
          <div>
            <div className="text-sm text-gray-500">Latitude</div>
            <div className="text-sm">{latitude.toFixed(6)}°</div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Navigation className="w-5 h-5 mt-0.5 rotate-90" style={{ color: '#798DA7' }} />
          <div>
            <div className="text-sm text-gray-500">Longitude</div>
            <div className="text-sm">{longitude.toFixed(6)}°</div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Crosshair className="w-5 h-5 mt-0.5" style={{ color: '#5D6F85' }} />
          <div>
            <div className="text-sm text-gray-500">Precisão</div>
            <div className="text-sm">{accuracy ? `±${Math.round(accuracy)}m` : 'N/A'}</div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Gauge className="w-5 h-5 mt-0.5" style={{ color: '#798DA7' }} />
          <div>
            <div className="text-sm text-gray-500">Velocidade</div>
            <div className="text-sm">
              {speed !== null && speed !== undefined ? `${(speed * 3.6).toFixed(1)} km/h` : 'N/A'}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Navigation className="w-5 h-5 mt-0.5 -rotate-45" style={{ color: '#5D6F85' }} />
          <div>
            <div className="text-sm text-gray-500">Altitude</div>
            <div className="text-sm">{altitude !== null && altitude !== undefined ? `${Math.round(altitude)}m` : 'N/A'}</div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
          <div>
            <div className="text-sm text-gray-500">Atualizado</div>
            <div className="text-sm">{formatTime(timestamp)}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
