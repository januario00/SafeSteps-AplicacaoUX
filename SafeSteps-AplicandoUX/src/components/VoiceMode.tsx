import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { X, Bot, Mic, Navigation, Phone, AlertCircle } from "lucide-react";
import type { Occurrence } from "./OccurrenceForm";

interface VoiceModeProps {
  onClose: () => void;
  location: { latitude: number; longitude: number } | null;
  onRegisterOccurrence: (occurrence: Occurrence) => void;
  showPoliceStations: boolean;
}

export function VoiceMode({ onClose, location, onRegisterOccurrence, showPoliceStations }: VoiceModeProps) {
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState("");
  const [aiMessage, setAiMessage] = useState("Olá! Estou aqui para ajudá-lo. Diga 'registrar ocorrência' para reportar um problema ou 'onde estou' para saber sua localização.");

  // Simular delegacias próximas
  const policeStations = showPoliceStations
    ? [
        { name: "Delegacia da Mulher - Centro", distance: "1.2 km", lat: -23.550520, lng: -46.633308 },
        { name: "Delegacia da Mulher - Zona Sul", distance: "2.5 km", lat: -23.565520, lng: -46.645308 },
      ]
    : [];

  const handleVoiceCommand = () => {
    setIsListening(true);
    
    // Simular reconhecimento de voz
    setTimeout(() => {
      const commands = [
        "registrar ocorrência",
        "onde estou",
        "delegacia mais próxima",
        "ajuda",
      ];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setVoiceCommand(randomCommand);
      processCommand(randomCommand);
      setIsListening(false);
    }, 2000);
  };

  const processCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case "registrar ocorrência":
        setAiMessage("Vou registrar uma ocorrência. Qual o tipo? Diga: ausência de iluminação, rua pouco movimentada, assédio costumeiro, área de risco, ou outros.");
        // Aqui seria integrado com o sistema de registro por voz
        break;
      case "onde estou":
        if (location) {
          setAiMessage(`Você está em Latitude ${location.latitude.toFixed(4)} e Longitude ${location.longitude.toFixed(4)}. Há ${policeStations.length > 0 ? policeStations.length + ' delegacias' : 'pontos de ajuda'} próximos a você.`);
        } else {
          setAiMessage("Não consegui obter sua localização. Verifique as permissões do aplicativo.");
        }
        break;
      case "delegacia mais próxima":
        if (policeStations.length > 0) {
          setAiMessage(`A delegacia mais próxima é ${policeStations[0].name}, a ${policeStations[0].distance} de distância.`);
        } else {
          setAiMessage("Buscando pontos de ajuda próximos...");
        }
        break;
      case "ajuda":
        setAiMessage("Você pode pedir para: registrar ocorrência, saber onde está, encontrar delegacia mais próxima, ou ligar para emergência.");
        break;
      default:
        setAiMessage("Desculpe, não entendi. Tente novamente.");
    }
  };

  useEffect(() => {
    // Anunciar modo de voz ativado
    const welcomeMessage = new SpeechSynthesisUtterance(aiMessage);
    welcomeMessage.lang = 'pt-BR';
    window.speechSynthesis.speak(welcomeMessage);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 text-white">
          <Navigation className="w-6 h-6 animate-pulse" />
          <span className="font-semibold">Modo de Voz Ativo</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Mapa Simplificado */}
      <div className="flex-1 relative m-4 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/30">
        {/* Marcador de Localização */}
        {location && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500/30 rounded-full animate-ping"></div>
            </div>
          </div>
        )}

        {/* Delegacias no Mapa */}
        {policeStations.map((station, index) => (
          <div
            key={index}
            className="absolute bg-pink-500 rounded-full p-2 shadow-lg"
            style={{
              top: `${30 + index * 25}%`,
              left: `${40 + index * 15}%`,
            }}
          >
            <Phone className="w-5 h-5 text-white" />
          </div>
        ))}

        {/* Grade do Mapa */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-0">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-white/10"></div>
          ))}
        </div>
      </div>

      {/* Área de Interação */}
      <div className="p-6 space-y-4">
        {/* Mensagem da IA */}
        <Card className="p-4 bg-white/95 backdrop-blur">
          <div className="flex items-start gap-3">
            <Bot className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm">{aiMessage}</p>
              {voiceCommand && (
                <p className="text-xs text-gray-500 mt-2">Você disse: "{voiceCommand}"</p>
              )}
            </div>
          </div>
        </Card>

        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-3">
          {/* Botão de Voz */}
          <Button
            size="lg"
            className={`h-16 ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            }`}
            onClick={handleVoiceCommand}
            disabled={isListening}
          >
            <Mic className="w-6 h-6 mr-2" />
            {isListening ? "Ouvindo..." : "Falar"}
          </Button>

          {/* Botão de Emergência */}
          <Button
            size="lg"
            className="h-16 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            onClick={() => {
              setAiMessage("Ligando para emergência 190...");
              const utterance = new SpeechSynthesisUtterance("Ligando para emergência 190");
              utterance.lang = 'pt-BR';
              window.speechSynthesis.speak(utterance);
            }}
          >
            <Phone className="w-6 h-6 mr-2" />
            Emergência
          </Button>
        </div>

        {/* Delegacias Próximas */}
        {policeStations.length > 0 && (
          <div className="bg-white/90 backdrop-blur rounded-lg p-3 space-y-2">
            <p className="text-xs font-semibold text-gray-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Delegacias Próximas:
            </p>
            {policeStations.map((station, index) => (
              <div key={index} className="text-xs text-gray-700 flex items-center justify-between">
                <span>{station.name}</span>
                <span className="text-blue-600">{station.distance}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
