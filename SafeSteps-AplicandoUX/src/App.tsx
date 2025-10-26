import { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { MapView } from "./components/MapView";
import { LocationInfo } from "./components/LocationInfo";
import { SavedLocations, SavedLocation } from "./components/SavedLocations";
import { OccurrenceMenu } from "./components/OccurrenceMenu";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import { MapPin, Bookmark, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./components/ui/dialog";
import { Label } from "./components/ui/label";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  speed?: number | null;
  timestamp: number;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [watchId, setWatchId] = useState<number | null>(null);

  // Carregar localizações salvas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedLocations");
    if (saved) {
      setSavedLocations(JSON.parse(saved));
    }
  }, []);

  // Salvar no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        });
        setIsLoading(false);
        toast.success("Localização obtida com sucesso!");
      },
      (error) => {
        setIsLoading(false);
        let errorMessage = "Erro ao obter localização";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permissão negada. Por favor, permita o acesso à localização.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Localização indisponível.";
            break;
          case error.TIMEOUT:
            errorMessage = "Tempo esgotado ao obter localização.";
            break;
        }
        setError(errorMessage);
        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          speed: position.coords.speed,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        toast.error("Erro ao rastrear localização");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );

    setWatchId(id);
    toast.success("Rastreamento iniciado");
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      toast.success("Rastreamento parado");
    }
  };

  const handleSaveLocation = () => {
    if (!location) return;

    if (!locationName.trim()) {
      toast.error("Por favor, digite um nome para a localização");
      return;
    }

    const newLocation: SavedLocation = {
      id: Date.now().toString(),
      name: locationName,
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: location.timestamp,
    };

    setSavedLocations([newLocation, ...savedLocations]);
    setIsDialogOpen(false);
    setLocationName("");
    toast.success("Localização salva!");
  };

  const handleDeleteLocation = (id: string) => {
    setSavedLocations(savedLocations.filter((loc) => loc.id !== id));
    toast.success("Localização removida");
  };

  const handleNavigateToSaved = (savedLocation: SavedLocation) => {
    setLocation({
      latitude: savedLocation.latitude,
      longitude: savedLocation.longitude,
      timestamp: savedLocation.timestamp,
    });
    toast.success(`Visualizando: ${savedLocation.name}`);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        {showRegister ? (
          <RegisterScreen 
            onRegister={handleRegister}
            onBack={() => setShowRegister(false)}
          />
        ) : (
          <LoginScreen 
            onLogin={handleLogin}
            onGoToRegister={() => setShowRegister(true)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-6">
      <Toaster position="top-center" />
      
      {/* Menu de Ocorrências */}
      <OccurrenceMenu />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-8 h-8" />
            <h1>Minha Localização</h1>
          </div>
          <p className="text-blue-100 text-sm">Rastreie e salve suas localizações</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-4">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="current">Atual</TabsTrigger>
            <TabsTrigger value="saved">Salvas</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {/* Botões de ação */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={getCurrentLocation}
                disabled={isLoading || watchId !== null}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Obtendo...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Localizar
                  </>
                )}
              </Button>

              {watchId === null ? (
                <Button
                  onClick={startTracking}
                  variant="outline"
                  className="w-full"
                >
                  Rastrear
                </Button>
              ) : (
                <Button
                  onClick={stopTracking}
                  variant="destructive"
                  className="w-full"
                >
                  Parar
                </Button>
              )}
            </div>

            {/* Erro */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Mapa e informações */}
            {location && (
              <>
                <MapView
                  latitude={location.latitude}
                  longitude={location.longitude}
                  accuracy={location.accuracy}
                />

                <LocationInfo
                  latitude={location.latitude}
                  longitude={location.longitude}
                  accuracy={location.accuracy}
                  altitude={location.altitude}
                  speed={location.speed}
                  timestamp={location.timestamp}
                />

                <Button
                  onClick={() => setIsDialogOpen(true)}
                  variant="outline"
                  className="w-full"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Salvar Localização
                </Button>
              </>
            )}

            {!location && !error && (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Toque em "Localizar" para obter sua localização atual</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            <SavedLocations
              locations={savedLocations}
              onDelete={handleDeleteLocation}
              onNavigate={handleNavigateToSaved}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para salvar localização */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Salvar Localização</DialogTitle>
            <DialogDescription>
              Digite um nome para salvar esta localização
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Localização</Label>
              <Input
                id="name"
                placeholder="Ex: Casa, Trabalho, Restaurante..."
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveLocation();
                  }
                }}
              />
            </div>
            {location && (
              <div className="text-sm text-gray-500">
                <p>Latitude: {location.latitude.toFixed(6)}°</p>
                <p>Longitude: {location.longitude.toFixed(6)}°</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveLocation}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
