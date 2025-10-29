import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft, Globe, Volume2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface SettingsProps {
  onBack: () => void;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LANGUAGES = [
  { value: "pt", label: "Português" },
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

const VOICES = [
  { value: "female-1", label: "Voz Feminina 1" },
  { value: "female-2", label: "Voz Feminina 2" },
  { value: "male-1", label: "Voz Masculina 1" },
  { value: "male-2", label: "Voz Masculina 2" },
];

export function Settings({ onBack, currentLanguage, onLanguageChange }: SettingsProps) {
  const [selectedVoice, setSelectedVoice] = useState("female-1");

  const handleVoiceChange = (voice: string) => {
    setSelectedVoice(voice);
    localStorage.setItem("appVoice", voice);
    toast.success("Voz alterada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-6">
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl">Configurações</h1>
        </div>

        {/* Idioma */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg">Idioma do App</h2>
          </div>
          <div className="space-y-2">
            <Label>Selecione o Idioma</Label>
            <Select value={currentLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Voz */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg">Voz do App</h2>
          </div>
          <div className="space-y-2">
            <Label>Selecione a Voz</Label>
            <Select value={selectedVoice} onValueChange={handleVoiceChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VOICES.map((voice) => (
                  <SelectItem key={voice.value} value={voice.value}>
                    {voice.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-gray-500">
            Esta voz será utilizada para o modo de acessibilidade e navegação por voz.
          </p>
        </Card>
      </div>
    </div>
  );
}
