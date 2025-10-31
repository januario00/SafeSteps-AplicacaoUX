import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { UserPlus, Upload, Fingerprint, Scan, MapPin, Globe, ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./ui/sonner";

interface RegisterScreenProps {
  onRegister: () => void;
  onBack: () => void;
}

const COMMON_LANGUAGES = [
  { value: "pt", label: "Português" },
  { value: "en", label: "Inglês" },
  { value: "de", label: "Alemão" },
];

const ALL_LANGUAGES = [
  { value: "pt", label: "Português" },
  { value: "en", label: "Inglês" },
  { value: "de", label: "Alemão" },
  { value: "es", label: "Espanhol" },
  { value: "fr", label: "Francês" },
  { value: "it", label: "Italiano" },
  { value: "ja", label: "Japonês" },
  { value: "zh", label: "Chinês" },
  { value: "ko", label: "Coreano" },
  { value: "ru", label: "Russo" },
  { value: "ar", label: "Árabe" },
  { value: "hi", label: "Hindi" },
  { value: "nl", label: "Holandês" },
  { value: "sv", label: "Sueco" },
  { value: "no", label: "Norueguês" },
  { value: "da", label: "Dinamarquês" },
  { value: "fi", label: "Finlandês" },
  { value: "pl", label: "Polonês" },
  { value: "tr", label: "Turco" },
  { value: "el", label: "Grego" },
  { value: "he", label: "Hebraico" },
  { value: "th", label: "Tailandês" },
  { value: "vi", label: "Vietnamita" },
  { value: "id", label: "Indonésio" },
];

export function RegisterScreen({ onRegister, onBack }: RegisterScreenProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    biometricType: "",
    homeAddress: "",
    language: "",
    acceptedTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [showBiometricDialog, setShowBiometricDialog] = useState(false);

  const handleBiometricSetup = (type: "facial" | "digital") => {
    setIsLoading(true);
    
    // Simular configuração de biometria
    setTimeout(() => {
      setIsLoading(false);
      setFormData({ ...formData, biometricType: type });
      setShowBiometricDialog(false);
      toast.success(`Biometria ${type === "facial" ? "facial" : "digital"} cadastrada com sucesso!`);
    }, 1500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.email) {
      toast.error("Por favor, digite seu e-mail");
      return;
    }
    
    if (!formData.email.includes("@")) {
      toast.error("Por favor, digite um e-mail válido");
      return;
    }
    
    if (!formData.password) {
      toast.error("Por favor, digite sua senha");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }
    
    if (!formData.language) {
      toast.error("Por favor, selecione um idioma");
      return;
    }

    if (!formData.gender) {
      toast.error("Por favor, selecione o gênero");
      return;
    }

    if (!formData.acceptedTerms) {
      toast.error("Você deve aceitar os termos de segurança");
      return;
    }

    setIsLoading(true);
    
    // Salvar dados do usuário
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userGender", formData.gender);
    localStorage.setItem("userLanguage", formData.language);
    
    // Simular cadastro
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Conta criada com sucesso!");
      onRegister();
    }, 1500);
  };

  return (
    <div className="min-h-screen py-6 px-4" style={{ background: 'linear-gradient(to bottom right, #798DA7, #5D6F85, #465363)' }}>
      <Toaster position="top-center" />
      <div className="w-full max-w-md mx-auto">
        <Card className="w-full">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mb-2 -ml-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(to bottom right, #798DA7, #5D6F85)' }}>
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-center text-gray-900">Criar Conta</h1>
              <p className="text-sm text-gray-500 text-center">Preencha seus dados para começar</p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4">

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Digite a senha novamente"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  disabled={isLoading}
                />
              </div>

              <Separator />

              {/* Biometria */}
              <div className="space-y-2">
                <Label>Biometria (opcional)</Label>
                {formData.biometricType ? (
                  <div className="p-3 rounded-lg flex items-center justify-between" style={{ backgroundColor: '#E8EDF2', borderColor: '#C5D0DC', borderWidth: '1px' }}>
                    <div className="flex items-center gap-2">
                      {formData.biometricType === "facial" ? (
                        <Scan className="w-5 h-5" style={{ color: '#798DA7' }} />
                      ) : (
                        <Fingerprint className="w-5 h-5" style={{ color: '#798DA7' }} />
                      )}
                      <span className="text-sm">
                        {formData.biometricType === "facial" ? "Face ID configurado" : "Digital configurada"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFormData({ ...formData, biometricType: "" })}
                    >
                      Remover
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowBiometricDialog(true)}
                  >
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Cadastrar Biometria
                  </Button>
                )}
              </div>

              <Separator />

              {/* Endereço de Casa */}
              <div className="space-y-2">
                <Label htmlFor="homeAddress">Endereço de Casa (opcional)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="homeAddress"
                    type="text"
                    placeholder="Rua, número, cidade..."
                    value={formData.homeAddress}
                    onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Salve seu endereço para facilitar futuros acessos
                </p>
              </div>

              <Separator />

              {/* Gênero */}
              <div className="space-y-3">
                <Label>Gênero *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  disabled={isLoading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">Feminino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer">Outro</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Idioma */}
              <div className="space-y-3">
                <Label>Idioma de Preferência *</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => {
                    if (value === "other") {
                      setShowAllLanguages(true);
                    } else {
                      setFormData({ ...formData, language: value });
                    }
                  }}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <SelectValue placeholder="Selecione um idioma" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {COMMON_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                    <Separator className="my-2" />
                    <SelectItem value="other">
                      <span style={{ color: '#798DA7' }}>Outros idiomas...</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Termos de Segurança */}
              <div className="flex items-start gap-3 p-4 rounded-lg" style={{ background: '#E8EDF2', border: '1px solid #C5D0DC' }}>
                <Checkbox
                  id="accept-terms"
                  checked={formData.acceptedTerms}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, acceptedTerms: checked as boolean })
                  }
                  disabled={isLoading}
                />
                <Label htmlFor="accept-terms" className="cursor-pointer leading-relaxed text-sm">
                  Li e concordo com os{" "}
                  <span className="underline" style={{ color: '#798DA7' }}>Termos de Segurança e Privacidade</span>.
                  Entendo que este aplicativo armazena dados localmente e não substitui serviços
                  oficiais de emergência.
                </Label>
              </div>

              <Button type="submit" className="w-full" style={{ background: 'linear-gradient(to right, #798DA7, #5D6F85)' }} disabled={isLoading}>
                {isLoading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Dialog de Biometria */}
      <Dialog open={showBiometricDialog} onOpenChange={setShowBiometricDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Configurar Biometria</DialogTitle>
            <DialogDescription>
              Escolha o tipo de autenticação biométrica que deseja cadastrar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2"
                onClick={() => handleBiometricSetup("facial")}
                disabled={isLoading}
              >
                <Scan className="w-8 h-8" style={{ color: '#798DA7' }} />
                <span>Face ID</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-auto py-6 flex flex-col items-center gap-2"
                onClick={() => handleBiometricSetup("digital")}
                disabled={isLoading}
              >
                <Fingerprint className="w-8 h-8" style={{ color: '#798DA7' }} />
                <span>Digital</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de Todos os Idiomas */}
      <Dialog open={showAllLanguages} onOpenChange={setShowAllLanguages}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Selecionar Idioma</DialogTitle>
            <DialogDescription>
              Escolha seu idioma de preferência para o aplicativo
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <RadioGroup
              value={formData.language}
              onValueChange={(value) => {
                setFormData({ ...formData, language: value });
                setShowAllLanguages(false);
              }}
            >
              {ALL_LANGUAGES.map((lang) => (
                <div key={lang.value} className="flex items-center space-x-2 py-2">
                  <RadioGroupItem value={lang.value} id={lang.value} />
                  <Label htmlFor={lang.value} className="flex-1 cursor-pointer">
                    {lang.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllLanguages(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
