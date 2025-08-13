import React from "react";
import clsx from "clsx";

/**
 * Conteneur
 * - occupe tout l'espace dispo sous le header
 * - largeur fluide 100%
 * - padding réglable via className
 */
export default function Conteneur({ children, className }) {
  return (
    <main role="main" className={clsx("w-full flex-1", className)}>
      {children}
    </main>
  );
}
