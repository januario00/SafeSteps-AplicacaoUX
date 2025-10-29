import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface SecurityTermsProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function SecurityTerms({ onAccept, onDecline }: SecurityTermsProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl">Termos de Segurança e Privacidade</h1>
          <p className="text-sm text-gray-500">
            Por favor, leia atentamente antes de continuar
          </p>
        </div>

        {/* Termos */}
        <ScrollArea className="h-[400px] rounded-lg border p-6">
          <div className="space-y-4 text-sm text-gray-700">
            <section>
              <h2 className="font-semibold text-base mb-2">1. Sobre o Aplicativo</h2>
              <p>
                Este aplicativo foi desenvolvido para auxiliar na localização e segurança pessoal,
                permitindo o registro de ocorrências e navegação assistida. O uso deste aplicativo
                não substitui serviços oficiais de emergência.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">2. Coleta de Dados</h2>
              <p className="mb-2">Este aplicativo coleta e armazena localmente:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Dados de localização GPS (latitude, longitude, altitude)</li>
                <li>Ocorrências registradas pelo usuário</li>
                <li>Preferências de configuração e idioma</li>
                <li>Informações de perfil (excluindo dados sensíveis)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">3. Armazenamento de Dados</h2>
              <p>
                Todos os dados são armazenados localmente no dispositivo do usuário. Não realizamos
                coleta, transmissão ou armazenamento de dados em servidores externos. Você é
                responsável pela segurança do seu dispositivo.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">4. Uso de Localização</h2>
              <p>
                O aplicativo solicita permissão para acessar sua localização em tempo real para
                fornecer serviços de navegação e registro de ocorrências. Você pode revogar essa
                permissão a qualquer momento nas configurações do dispositivo.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">5. Modo de Acessibilidade</h2>
              <p>
                O modo de voz para deficientes visuais utiliza a API de reconhecimento de voz do
                navegador. Os comandos de voz são processados localmente e não são enviados para
                servidores externos.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">6. Limitações e Responsabilidades</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Este aplicativo não é um serviço oficial de emergência</li>
                <li>Em caso de emergência real, ligue para 190 (Polícia) ou 192 (SAMU)</li>
                <li>A precisão da localização depende do GPS do dispositivo</li>
                <li>O aplicativo não garante a disponibilidade contínua dos serviços</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">7. Dados Não Coletados</h2>
              <p className="mb-2">Este aplicativo NÃO coleta:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Informações pessoais identificáveis (PII) sensíveis</li>
                <li>Dados bancários ou financeiros</li>
                <li>Contatos ou mensagens do dispositivo</li>
                <li>Fotos ou mídia (exceto foto de perfil, se fornecida)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">8. Segurança</h2>
              <p>
                Recomendamos que você mantenha seu dispositivo protegido com senha ou biometria.
                Não nos responsabilizamos por acesso não autorizado aos dados armazenados localmente
                em caso de perda ou roubo do dispositivo.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">9. Alterações nos Termos</h2>
              <p>
                Reservamo-nos o direito de atualizar estes termos. Alterações significativas serão
                notificadas dentro do aplicativo.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-base mb-2">10. Consentimento</h2>
              <p>
                Ao aceitar estes termos, você confirma que leu, compreendeu e concorda com as
                políticas descritas acima.
              </p>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900 mb-1">Importante</p>
                  <p className="text-sm text-yellow-800">
                    Este aplicativo é uma ferramenta de auxílio e não substitui serviços oficiais
                    de emergência e segurança pública. Em situações de risco iminente, sempre
                    contate as autoridades competentes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Checkbox de Aceite */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Checkbox
            id="accept-terms"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked as boolean)}
          />
          <Label htmlFor="accept-terms" className="cursor-pointer leading-relaxed text-sm">
            Li e concordo com os Termos de Segurança e Privacidade. Entendo que este aplicativo
            armazena dados localmente e não substitui serviços oficiais de emergência.
          </Label>
        </div>

        {/* Botões */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onDecline}
          >
            Recusar
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            onClick={onAccept}
            disabled={!accepted}
          >
            Aceitar e Continuar
          </Button>
        </div>
      </Card>
    </div>
  );
}
