import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  initializeAppCheck,
  ReCaptchaV3Provider, // ou ReCaptchaEnterpriseProvider
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// 🔧 Dev local : activer un token de debug AVANT initializeAppCheck
if (import.meta.env.DEV) {
  // true = token auto-généré dans la console du navigateur
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  // provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);
export const db = getFirestore(app);

// {
//   code_commande: "CMD20250724-001",
//   prenom_client: "Marthe",
//   telephone: "22999999999",
//   type_appel: "direct", // ou "whatsapp"
//   adresse: "Quartier Zongo",
//   indication_adresse: "Face à la mosquée",
//   date_livraison: Timestamp,
//   heure_livraison: "15:30",
//   paiement: {
//     solde: false,
//     type: "momo+especes", // ou "momo" ou "especes" ou "plus_tard"
//     montant_momo: 2500,
//     montant_especes: 2500,
//     reste_a_devoir: 0
//   },
//   cout_total: 5000,
//   livreur: "BB Express",
//   vendeuse: "Prénom Nom",           // <--- AJOUT ICI
//   produits: [
//     { nom: "pain_simple_viande", quantite: 1, prix_unitaire: 1200 },
//     { nom: "yaourt_nature", quantite: 1, prix_unitaire: 600 }
//   ],
//   createdAt: Timestamp,
//   updatedAt: Timestamp
// }
