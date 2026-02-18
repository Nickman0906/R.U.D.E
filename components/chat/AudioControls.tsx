import { Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AudioControls = () => (
  <div className="flex gap-2">
    <Button type="button" variant="ghost" aria-label="Gravar áudio"><Mic className="h-4 w-4" /></Button>
    <Button type="button" variant="ghost" aria-label="Falar resposta"><Volume2 className="h-4 w-4" /></Button>
  </div>
);
