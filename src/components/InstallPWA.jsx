import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Share } from "lucide-react";

function Steps({ platform }) {
  // Petites instructions adaptées aux plateformes sans BIP natif
  if (platform.ios) {
    return (
      <ul className="mt-2 mb-2 text-xs list-disc pl-4 space-y-1">
        <li>
          Ouvrez le menu <span className="font-medium">Partager</span> (
          <Share className="w-4 h-4 ml-2" />)
        </li>
        <li>
          Choisissez <span className="font-medium">Sur l’écran d’accueil</span>.
        </li>
        <li>Validez pour ajouter l’app.</li>
      </ul>
    );
  }
  if (platform.chromeLike) {
    return (
      <ul className="mt-2 mb-2 text-xs list-disc pl-4 space-y-1">
        <li>Cliquez sur le menu (⋮) du navigateur.</li>
        <li>
          Sélectionnez{" "}
          <span className="font-medium">Ajouter à l'ecran d'accueil</span>.
        </li>
      </ul>
    );
  }
  // Safari macOS ou autres
  return (
    <ul className="mt-2 mb-2 text-xs list-disc pl-4 space-y-1">
      <li>
        Dans le menu du navigateur, cherchez <Share className="w-4 h-4 ml-2" />
        <span className="font-medium">Ajouter à l’écran d’accueil</span> /{" "}
        <span className="font-medium">Installer l’app</span>.
      </li>
    </ul>
  );
}

export default function InstallPWA({
  canPrompt,
  platform,
  onInstall,
  onClose,
}) {
  return (
    <div className="border-2 border-gray p-2 rounded-md bg-white">
      <div className="m-auto">
        <p className="leading-snug">
          Vous aimez{" "}
          <span className="font-semibold">Les Sandwichs du Docteur</span> ?
          <br />
          Installez cette application directement sur votre écran d’accueil.
        </p>
        {!canPrompt && <Steps platform={platform} />}
      </div>
      <div className="flex mt-2 gap-2 shrink-0">
        {canPrompt && (
          <Button size="sm" onClick={onInstall} className="gap-1">
            <Download className="h-4 w-4" />
            Installer
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={onClose}>
          Fermer
        </Button>
      </div>
    </div>
  );
}
