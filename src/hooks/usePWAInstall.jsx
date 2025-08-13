// usePWAInstall.js — ajout d’un “swReady”
import { useEffect, useRef, useState } from "react";

function isStandalone() {
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true
  );
}

export default function usePWAInstall(delayMs = 30000) {
  const deferredRef = useRef(null);
  const [canPrompt, setCanPrompt] = useState(false);
  const [installed, setInstalled] = useState(isStandalone());
  const [shouldShow, setShouldShow] = useState(false);
  const [swReady, setSwReady] = useState(
    !!navigator.serviceWorker && !!navigator.serviceWorker.controller
  );

  // 1) SW ready (écouter controllerchange)
  useEffect(() => {
    const onCC = () => setSwReady(true);
    navigator.serviceWorker?.addEventListener("controllerchange", onCC);
    return () =>
      navigator.serviceWorker?.removeEventListener("controllerchange", onCC);
  }, []);

  // 2) BIP + appinstalled
  useEffect(() => {
    const onBIP = (e) => {
      e.preventDefault();
      deferredRef.current = e;
      setCanPrompt(true);
    };
    const onInstalled = () => {
      setInstalled(true);
      localStorage.setItem("pwa-installed", "1");
      setShouldShow(false);
    };
    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBIP);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // 3) Timer 30s → seulement quand SW est prêt, pas déjà installé, et pas ignoré
  useEffect(() => {
    const ignored = localStorage.getItem("pwa-install-dismissed") === "1";
    if (!swReady || installed || ignored) return;
    const t = setTimeout(() => setShouldShow(true), delayMs);
    return () => clearTimeout(t);
  }, [swReady, installed, delayMs]);

  const promptInstall = async () => {
    const ev = deferredRef.current;
    if (!ev) return { outcome: "dismissed" };
    ev.prompt();
    const res = await ev.userChoice;
    deferredRef.current = null;
    setCanPrompt(false);
    return res;
  };

  const dismissInstall = () => {
    localStorage.setItem("pwa-install-dismissed", "1");
    setShouldShow(false);
  };

  return { shouldShow, canPrompt, installed, promptInstall, dismissInstall };
}
