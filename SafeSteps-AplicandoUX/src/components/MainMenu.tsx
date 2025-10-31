import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Menu, 
  User, 
  Settings as SettingsIcon, 
  LogOut, 
  FileText, 
  Eye, 
  Camera,
  Upload
} from "lucide-react";
import { OccurrenceForm, type Occurrence } from "./OccurrenceForm";
import { OccurrencesList } from "./OccurrencesList";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";

interface MainMenuProps {
  userEmail: string;
  userPhoto: string;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
  occurrences: Occurrence[];
  onSubmitOccurrence: (occurrence: Occurrence) => void;
}

export function MainMenu({
  userEmail,
  userPhoto,
  onProfileClick,
  onSettingsClick,
  onLogout,
  occurrences,
  onSubmitOccurrence,
}: MainMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(userPhoto);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCurrentPhoto(result);
        localStorage.setItem("userPhoto", result);
        toast.success("Foto atualizada com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const getUserInitials = () => {
    return userEmail.substring(0, 2).toUpperCase();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-40 bg-white shadow-lg hover:bg-gray-50"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto p-0">
        {/* Hidden title for accessibility */}
        <SheetHeader className="sr-only">
          <SheetTitle>Menu Principal</SheetTitle>
          <SheetDescription>Gerencie seu perfil, ocorrências e configurações</SheetDescription>
        </SheetHeader>
        
        {/* Header com Foto do Usuário */}
        <div className="p-6 text-white" style={{ background: 'linear-gradient(to bottom right, #798DA7, #5D6F85, #465363)' }}>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                <AvatarImage src={currentPhoto} alt="User" />
                <AvatarFallback className="text-white text-2xl" style={{ background: '#798DA7' }}>
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="photo-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-6 h-6" />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="text-center">
              <p className="font-semibold">{userEmail}</p>
              <p className="text-sm text-gray-200">Clique na foto para alterar</p>
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <div className="p-6 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setIsOpen(false);
              onProfileClick();
            }}
          >
            <User className="w-5 h-5 mr-3" />
            Meu Perfil
          </Button>

          <Separator className="my-2" />

          {/* Ocorrências em Tabs */}
          <div className="py-2">
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Registrar
                </TabsTrigger>
                <TabsTrigger value="view" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Visualizar
                  {occurrences.length > 0 && (
                    <span className="ml-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style={{ background: '#798DA7' }}>
                      {occurrences.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="register" className="mt-4">
                <OccurrenceForm onSubmit={onSubmitOccurrence} />
              </TabsContent>

              <TabsContent value="view" className="mt-4">
                <OccurrencesList occurrences={occurrences} />
              </TabsContent>
            </Tabs>
          </div>

          <Separator className="my-2" />

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setIsOpen(false);
              onSettingsClick();
            }}
          >
            <SettingsIcon className="w-5 h-5 mr-3" />
            Configurações
          </Button>

          <Separator className="my-2" />

          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100"
            style={{ color: '#5D6F85' }}
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair do App
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
