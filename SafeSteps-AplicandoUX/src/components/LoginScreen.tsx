import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Fingerprint, Scan, Lock } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./ui/sonner";

interface LoginScreenProps {
  onLogin: () => void;
  onGoToRegister: () => void;
}

export function LoginScreen({ onLogin, onGoToRegister }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setIsLoading(true);
    
    // Simular autenticação
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login realizado com sucesso!");
      onLogin();
    }, 1000);
  };

  const handleBiometricLogin = (type: "facial" | "digital") => {
    setIsLoading(true);
    
    // Simular autenticação biométrica
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Autenticação ${type === "facial" ? "facial" : "por digital"} realizada!`);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <Card className="w-full max-w-sm p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900">Bem-vindo</h1>
          <p className="text-sm text-gray-500">Entre para continuar</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Login</Label>
            <Input
              id="username"
              type="text"
              placeholder="Digite seu login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou entre com</span>
          </div>
        </div>

        {/* Biometric Options */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => handleBiometricLogin("facial")}
            disabled={isLoading}
          >
            <Scan className="w-6 h-6 text-blue-600" />
            <span className="text-xs">Face</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full flex flex-col items-center gap-2 h-auto py-4"
            onClick={() => handleBiometricLogin("digital")}
            disabled={isLoading}
          >
            <Fingerprint className="w-6 h-6 text-blue-600" />
            <span className="text-xs">Digital</span>
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center text-sm">
          <span className="text-gray-500">Não tem uma conta? </span>
          <button
            type="button"
            onClick={onGoToRegister}
            className="text-blue-600 hover:underline"
          >
            Criar conta
          </button>
        </div>
      </Card>
    </div>
  );
}
