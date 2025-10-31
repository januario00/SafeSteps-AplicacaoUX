import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card } from "./ui/card";
import { Calendar, Clock, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "sonner@2.0.3";

export interface Occurrence {
  id: string;
  type: string;
  customType?: string;
  address: string;
  date: string;
  time: string;
  timestamp: number;
}

interface OccurrenceFormProps {
  onSubmit: (occurrence: Occurrence) => void;
}

const OCCURRENCE_TYPES = [
  { value: "no-lighting", label: "Ausência de Iluminação" },
  { value: "low-traffic", label: "Rua Pouco Movimentada" },
  { value: "harassment", label: "Assédio Costumeiro" },
  { value: "risk-area", label: "Área de Risco" },
  { value: "other", label: "Outros" },
];

export function OccurrenceForm({ onSubmit }: OccurrenceFormProps) {
  const [formData, setFormData] = useState({
    type: "",
    customType: "",
    address: "",
    date: "",
    time: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!formData.type) {
      toast.error("Por favor, selecione o tipo de ocorrência");
      return;
    }

    if (formData.type === "other" && !formData.customType.trim()) {
      toast.error("Por favor, descreva o tipo de ocorrência");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Por favor, informe o endereço");
      return;
    }

    if (!formData.date) {
      toast.error("Por favor, informe a data");
      return;
    }

    if (!formData.time) {
      toast.error("Por favor, informe o horário");
      return;
    }

    setIsLoading(true);

    // Simular envio
    setTimeout(() => {
      const occurrence: Occurrence = {
        id: Date.now().toString(),
        type: formData.type === "other" ? formData.customType : OCCURRENCE_TYPES.find(t => t.value === formData.type)?.label || "",
        customType: formData.type === "other" ? formData.customType : undefined,
        address: formData.address,
        date: formData.date,
        time: formData.time,
        timestamp: Date.now(),
      };

      onSubmit(occurrence);
      
      // Limpar formulário
      setFormData({
        type: "",
        customType: "",
        address: "",
        date: "",
        time: "",
      });
      
      setIsLoading(false);
      toast.success("Ocorrência registrada com sucesso!");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tipo de Ocorrência */}
      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" style={{ color: '#798DA7' }} />
          Tipo de Ocorrência *
        </Label>
        <RadioGroup
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          {OCCURRENCE_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value} className="cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Campo customizado para "Outros" */}
        {formData.type === "other" && (
          <Textarea
            placeholder="Descreva o tipo de ocorrência..."
            value={formData.customType}
            onChange={(e) => setFormData({ ...formData, customType: e.target.value })}
            className="mt-2"
            rows={3}
          />
        )}
      </div>

      {/* Endereço */}
      <div className="space-y-2">
        <Label htmlFor="address" className="flex items-center gap-2">
          <MapPin className="w-4 h-4" style={{ color: '#5D6F85' }} />
          Endereço da Ocorrência *
        </Label>
        <Textarea
          id="address"
          placeholder="Rua, número, bairro, cidade..."
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
        />
      </div>

      {/* Data e Horário */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: '#798DA7' }} />
            Data *
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center gap-2">
            <Clock className="w-4 h-4" style={{ color: '#5D6F85' }} />
            Horário *
          </Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
      </div>

      {/* Botão de Enviar */}
      <Button
        type="submit"
        className="w-full"
        style={{ background: 'linear-gradient(to right, #798DA7, #5D6F85)' }}
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
