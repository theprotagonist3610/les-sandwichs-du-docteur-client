import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import "./App.css";
import Contact from "@/pages/Contact";
import MesCommandes from "@/pages/MesCommandes";
import HeaderClientNav from "@/components/HeaderClientNav";
import Conteneur from "@/components/Conteneur";
import InstallPWA from "@/components/InstallPWA";
import usePWAInstall from "@/hooks/usePWAInstall";
import { toast } from "sonner";
import { Toaster } from "sonner";
function App() {
  const { shouldShow, canPrompt, promptInstall, dismissInstall, platform } =
    usePWAInstall(5000);
  const [toasterPosition, setToasterPosition] = useState("top-left");
  // Affiche le toast quand prêt (30s) — n’affiche qu’une fois
  useEffect(() => {
    if (!shouldShow) return;
    setToasterPosition("bottom-right");
    const id = toast.custom(
      (t) => (
        <InstallPWA
          canPrompt={canPrompt}
          platform={platform}
          onInstall={async () => {
            if (canPrompt) {
              await promptInstall();
            }
            toast.dismiss(t.id);
          }}
          onClose={() => {
            dismissInstall();
            toast.dismiss(t.id);
          }}
        />
      ),
      { duration: Infinity }
    );
    return () => {
      toast.dismiss(id);
      setToasterPosition("top-left");
    };
  }, [shouldShow, canPrompt, platform, promptInstall, dismissInstall]);

  return (
    <>
      <HeaderClientNav ordersCount={0} />
      <Conteneur>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/mes-commandes" element={<MesCommandes />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Conteneur>
      <Toaster position={toasterPosition} richColors />
    </>
  );
}

export default App;
