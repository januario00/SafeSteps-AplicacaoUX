import { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { MapView } from "./components/MapView";
import { LocationInfo } from "./components/LocationInfo";
import { SavedLocations, SavedLocation } from "./components/SavedLocations";
import { MainMenu } from "./components/MainMenu";
import { UserProfile } from "./components/UserProfile";
import { Settings } from "./components/Settings";
import { VoiceMode } from "./components/VoiceMode";
import { SecurityTerms } from "./components/SecurityTerms";
import type { Occurrence } from "./components/OccurrenceForm";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import { MapPin, Bookmark, Loader2, AlertCircle, Mic } from "lucide-react";
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

type Screen = "main" | "profile" | "settings";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTerms, setShowTerms] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [watchId, setWatchId] = useState<number | null>(null);
  
  // User settings
  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [userGender, setUserGender] = useState<"male" | "female" | "other">("other");
  const [userLanguage, setUserLanguage] = useState("pt");
  const [isVisuallyImpaired, setIsVisuallyImpaired] = useState(false);
  const [showPoliceStations, setShowPoliceStations] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  
  // Occurrences
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedGender = localStorage.getItem("userGender") as "male" | "female" | "other";
    const savedLanguage = localStorage.getItem("userLanguage");
    const savedPhoto = localStorage.getItem("userPhoto");
    const savedOccurrences = localStorage.getItem("occurrences");
    const savedLocationsData = localStorage.getItem("savedLocations");
    const termsAccepted = localStorage.getItem("termsAccepted");

    if (savedEmail) setUserEmail(savedEmail);
    if (savedGender) setUserGender(savedGender);
    if (savedLanguage) setUserLanguage(savedLanguage);
    if (savedPhoto) setUserPhoto(savedPhoto);
    if (savedOccurrences) {
      try {
        setOccurrences(JSON.parse(savedOccurrences));
      } catch (e) {
        console.error("Error loading occurrences:", e);
      }
    }
    if (savedLocationsData) {
      try {
        setSavedLocations(JSON.parse(savedLocationsData));
      } catch (e) {
        console.error("Error loading locations:", e);
      }
    }
    if (termsAccepted === "true") {
      setShowTerms(false);
    }
  }, []);

  // Save occurrences to localStorage
  useEffect(() => {
    localStorage.setItem("occurrences", JSON.stringify(occurrences));
  }, [occurrences]);

  // Save locations to localStorage
  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  // Activate voice mode when visually impaired mode is enabled
  useEffect(() => {
    if (isVisuallyImpaired && isAuthenticated) {
      setIsVoiceMode(true);
    }
  }, [isVisuallyImpaired, isAuthenticated]);

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

  const startContinuousTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador");
      return;
    }

    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      toast.info("Rastreamento contínuo desativado");
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
        setError(null);
      },
      (error) => {
        let errorMessage = "Erro no rastreamento";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permissão negada.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Localização indisponível.";
            break;
          case error.TIMEOUT:
            errorMessage = "Tempo esgotado.";
            break;
        }
        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    setWatchId(id);
    toast.success("Rastreamento contínuo ativado!");
  };

  const handleSaveLocation = () => {
    if (!location) {
      toast.error("Nenhuma localização para salvar");
      return;
    }

    if (!locationName.trim()) {
      toast.error("Digite um nome para a localização");
      return;
    }

    const newLocation: SavedLocation = {
      id: Date.now().toString(),
      name: locationName,
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: location.timestamp,
    };

    setSavedLocations([...savedLocations, newLocation]);
    setLocationName("");
    setIsDialogOpen(false);
    toast.success(`Localização "${locationName}" salva com sucesso!`);
  };

  const handleDeleteLocation = (id: string) => {
    setSavedLocations(savedLocations.filter((loc) => loc.id !== id));
    toast.success("Localização removida");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowRegister(false);
    toast.success("Login realizado com sucesso!");
  };

  const handleRegister = () => {
    localStorage.setItem("termsAccepted", "true");
    setShowTerms(false);
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen("main");
    setIsVoiceMode(false);
    toast.info("Você saiu do aplicativo");
  };

  const handleSubmitOccurrence = (occurrence: Occurrence) => {
    setOccurrences((prev) => [occurrence, ...prev]);
  };

  const handleAcceptTerms = () => {
    localStorage.setItem("termsAccepted", "true");
    setShowTerms(false);
  };

  const handleDeclineTerms = () => {
    toast.error("Você precisa aceitar os termos para usar o aplicativo");
  };

  const handleLanguageChange = (language: string) => {
    setUserLanguage(language);
    localStorage.setItem("userLanguage", language);
    toast.success("Idioma alterado com sucesso!");
  };

  // Show security terms first
  if (showTerms && !isAuthenticated) {
    return <SecurityTerms onAccept={handleAcceptTerms} onDecline={handleDeclineTerms} />;
  }

  // Show login/register screens
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

  // Show voice mode if enabled
  if (isVoiceMode) {
    return (
      <VoiceMode
        onClose={() => setIsVoiceMode(false)}
        location={location}
        onRegisterOccurrence={handleSubmitOccurrence}
        showPoliceStations={showPoliceStations}
      />
    );
  }

  // Show profile screen
  if (currentScreen === "profile") {
    return (
      <UserProfile
        onBack={() => setCurrentScreen("main")}
        userGender={userGender}
        isVisuallyImpaired={isVisuallyImpaired}
        onVisuallyImpairedChange={setIsVisuallyImpaired}
        showPoliceStations={showPoliceStations}
        onShowPoliceStationsChange={setShowPoliceStations}
      />
    );
  }

  // Show settings screen
  if (currentScreen === "settings") {
    return (
      <Settings
        onBack={() => setCurrentScreen("main")}
        currentLanguage={userLanguage}
        onLanguageChange={handleLanguageChange}
      />
    );
  }

  // Main screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 pb-6" style={{ background: 'linear-gradient(to bottom right, #F5F7FA, #E8EDF2, #F5F7FA)' }}>
      <Toaster position="top-center" />
      
      {/* Main Menu */}
      <MainMenu
        userEmail={userEmail}
        userPhoto={userPhoto}
        onProfileClick={() => setCurrentScreen("profile")}
        onSettingsClick={() => setCurrentScreen("settings")}
        onLogout={handleLogout}
        occurrences={occurrences}
        onSubmitOccurrence={handleSubmitOccurrence}
      />

      {/* Voice Mode Toggle Button */}
      {isVisuallyImpaired && (
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsVoiceMode(true)}
          className="fixed top-4 right-4 z-40 shadow-lg"
          style={{ background: 'linear-gradient(to right, #798DA7, #5D6F85)' }}
        >
          <Mic className="w-5 h-5" />
        </Button>
      )}
      
      {/* Header */}
      <div className="text-white p-6 pb-8 rounded-b-3xl shadow-lg" style={{ background: 'linear-gradient(to right, #798DA7, #5D6F85, #465363)' }}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-8 h-8" />
            <h1>Minha Localização</h1>
          </div>
          <p className="text-gray-100 text-sm">
            Rastreie e salve suas localizações
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-6 space-y-4">
        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="bg-white hover:bg-gray-50"
            style={{ color: '#798DA7' }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Obtendo...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                Obter Localização
              </>
            )}
          </Button>
          <Button
            onClick={startContinuousTracking}
            variant={watchId !== null ? "destructive" : "default"}
            className={watchId !== null ? "" : ""}
            style={watchId === null ? { background: 'linear-gradient(to right, #798DA7, #5D6F85)' } : {}}
          >
            <MapPin className="w-4 h-4 mr-2" />
            {watchId !== null ? "Parar" : "Rastrear"}
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">
              <MapPin className="w-4 h-4 mr-2" />
              Mapa
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="w-4 h-4 mr-2" />
              Salvos ({savedLocations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            {location ? (
              <>
                <MapView
                  latitude={location.latitude}
                  longitude={location.longitude}
                  accuracy={location.accuracy}
                  occurrences={occurrences}
                  showPoliceStations={showPoliceStations}
                />
                <LocationInfo location={location} />
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  variant="outline"
                  className="w-full"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Salvar Localização
                </Button>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Clique em "Obter Localização" para começar</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            <SavedLocations
              locations={savedLocations}
              onDelete={handleDeleteLocation}
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
            <Button onClick={handleSaveLocation} style={{ background: 'linear-gradient(to right, #798DA7, #5D6F85)' }}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
