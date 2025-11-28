// Import standard pour les variables d'environnement publiques dans SvelteKit
import { PUBLIC_GEMINI_API_KEY } from "$env/static/public";

// Utilisation sécurisée : si la variable n'est pas chargée, on évite le crash immédiat
const apiKey = PUBLIC_GEMINI_API_KEY || "";

export async function callGemini(prompt = " ", systemInstruction = "") {
  // Vérification de sécurité
  if (!apiKey) {
    console.error("⚠️ API Key manquante. Vérifiez votre fichier .env");
    return "Service IA non configuré.";
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // CORRECTION: 'contents' au pluriel est requis par l'API
          contents: [{ parts: [{ text: prompt }] }],
          // CORRECTION: Ajout d'une vérification pour systemInstruction
          ...(systemInstruction.trim()
            ? { systemInstruction: { parts: [{ text: systemInstruction }] } }
            : {}),
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "Erreur appel API");
    }

    const data = await response.json();

    // CORRECTION: 'candidates' et 'parts' (pluriel) + vérification de sécurité optionnelle (?.)
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Pas de réponse.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "indisponible pour maitenance velliez ressayer plutard.";
  }
}
