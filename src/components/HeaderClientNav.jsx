import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ClipboardList, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // shadcn/ui

/**
 * HeaderClientNav
 * - Mobile/Tablet (< lg): 2 lignes -> Logo centré (ligne 1), nav centrée (ligne 2)
 * - Desktop (>= lg): 1 ligne -> Logo à gauche, nav à droite
 * - Sticky top, border-b
 * - Liens animés (bg orange se remplit gauche→droite à l'activation,
 *   droite→gauche à la sortie), focus ring visible
 * - Compteur sur "Mes commandes"
 *
 * Props:
 * - ordersCount?: number (badge sur "Mes commandes")
 */

const ORANGE_BG = "bg-orange-500/20"; // fond actif doux

const NavItem = ({ to, label, Icon, count }) => (
  <li className="list-none">
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `relative inline-flex items-center overflow-hidden rounded-none px-3 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-0 ${
          isActive ? "text-orange-700" : "text-gray-700"
        }`
      }>
      {({ isActive }) => (
        <>
          {/* Highlight animé */}
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.span
                key="active-bg"
                className={`absolute inset-0 ${ORANGE_BG}`}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{
                  scaleX: 1,
                  originX: 0,
                  transition: { duration: 0.35, ease: "easeInOut" },
                }}
                exit={{
                  scaleX: 0,
                  originX: 1,
                  transition: { duration: 0.35, ease: "easeInOut" },
                }}
              />
            )}
          </AnimatePresence>

          {/* Contenu */}
          <span className="relative z-10 flex items-center gap-2">
            <Icon
              className="h-4 w-4 lg:h-[18px] lg:w-[18px]"
              aria-hidden="true"
            />
            <span className="text-xs lg:text-sm font-medium">{label}</span>
            {count > 0 && (
              <Badge className="ml-1 px-2 py-0 h-5 min-w-[1.25rem] leading-none grid place-items-center text-[11px]">
                {count}
              </Badge>
            )}
          </span>
        </>
      )}
    </NavLink>
  </li>
);

export default function HeaderClientNav({ ordersCount = 0 }) {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="w-full px-4 py-2">
        {/* Layout mobile: 2 lignes | desktop: 1 ligne */}
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            {!imgError ? (
              <img
                src="/logo_petit.PNG"
                onError={() => setImgError(true)}
                alt="Les Sandwichs du Docteur"
                className="w-32 h-16 lg:w-64 lg:h-32 object-contain select-none"
                draggable={false}
              />
            ) : (
              <div className="font-['Quartzo'] text-red-600 text-2xl lg:text-2xl font-semibold">
                <span className="text-[#a41625]">Les Sandwichs du</span>
                <span className="text-[#d9571d]"> Docteur</span>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav aria-label="Navigation principale" className="w-full lg:w-auto">
            <ul className="inline-flex items-center justify-center lg:justify-end w-full lg:w-auto gap-0 rounded-full overflow-hidden">
              <NavItem to="/" label="Commander" Icon={ShoppingCart} />
              <NavItem
                to="/mes-commandes"
                label="Mes commandes"
                Icon={ClipboardList}
                count={ordersCount}
              />
              <NavItem to="/contact" label="Contacts" Icon={Phone} />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
