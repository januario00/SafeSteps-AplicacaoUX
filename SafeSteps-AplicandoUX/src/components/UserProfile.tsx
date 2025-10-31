import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { ArrowLeft, Lock, MapPin, Eye, Navigation } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface UserProfileProps {
  onBack: () => void;
  userGender: "male" | "female" | "other";
  isVisuallyImpaired: boolean;
  onVisuallyImpairedChange: (value: boolean) => void;
  showPoliceStations: boolean;
  onShowPoliceStationsChange: (value: boolean) => void;
}

export function UserProfile({
  onBack,
  userGender,
  isVisuallyImpaired,
  onVisuallyImpairedChange,
  showPoliceStations,
  onShowPoliceStationsChange,
}: UserProfileProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Preencha todos os campos de senha");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("As novas senhas não coincidem");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast.success("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }, 1000);
  };

  const handleAddressChange = () => {
    if (!homeAddress.trim()) {
      toast.error("Digite um endereço válido");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("homeAddress", homeAddress);
      toast.success("Endereço atualizado com sucesso!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-6" style={{ background: 'linear-gradient(to bottom right, #F5F7FA, #E8EDF2, #F5F7FA)' }}>
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
          <h1 className="text-2xl">Perfil do Usuário</h1>
        </div>

        {/* Trocar Senha */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-5 h-5" style={{ color: '#798DA7' }} />
            <h2 className="text-lg">Alterar Senha</h2>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              style={{ background: 'linear-gradient(to right, #798DA7, #5D6F85)' }}
              disabled={isLoading}
            >
              {isLoading ? "Atualizando..." : "Alterar Senha"}
            </Button>
          </form>
        </Card>

        {/* Endereço de Casa */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5" style={{ color: '#5D6F85' }} />
            <h2 className="text-lg">Endereço de Casa</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="homeAddress">Endereço Completo</Label>
              <Textarea
                id="homeAddress"
                placeholder="Rua, número, bairro, cidade..."
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
                rows={3}
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleAddressChange}
              className="w-full"
              style={{ background: 'linear-gradient(to right, #5D6F85, #465363)' }}
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar Endereço"}
            </Button>
          </div>
        </Card>

        {/* Perfil de Deficiente Visual */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5" style={{ color: '#798DA7' }} />
            <h2 className="text-lg">Acessibilidade</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Modo Deficiente Visual</Label>
              <p className="text-sm text-gray-500">
                Ativa controle por voz e navegação assistida
              </p>
            </div>
            <Switch
              checked={isVisuallyImpaired}
              onCheckedChange={onVisuallyImpairedChange}
            />
          </div>
        </Card>

        {/* Delegacias para Mulheres */}
        {userGender === "female" && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Navigation className="w-5 h-5" style={{ color: '#798DA7' }} />
              <h2 className="text-lg">Segurança</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Mostrar Delegacias no Mapa</Label>
                <p className="text-sm text-gray-500">
                  Exibe delegacias mais próximas no mapa
                </p>
              </div>
              <Switch
                checked={showPoliceStations}
                onCheckedChange={onShowPoliceStationsChange}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
