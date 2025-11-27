# sv

>Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

>If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

>Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

>To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
🧑‍🍳 Le Gourmet Moderne - Restaurant IA Experience

> Bienvenue sur le dépôt de Le Gourmet Moderne, une application web progressive (PWA) de restauration nouvelle génération. Ce projet n'est pas un simple site vitrine : c'est une plateforme complète intégrant l'Intelligence Artificielle pour améliorer l'expérience client et faciliter la gestion administrative.

### 🛠️ Stack Technique & Langages

Ce projet a été conçu avec une architecture moderne axée sur la performance et l'interactivité.

## ⚡ Framework & Cœur

SvelteKit (Svelte 4/5) : Choisi pour sa réactivité exceptionnelle et sa légèreté. Contrairement à React ou Vue, Svelte compile le code en JavaScript pur, éliminant le besoin d'un Virtual DOM lourd. Cela garantit des animations fluides (60fps) même sur mobile.

JavaScript (ES6+) : Logique métier, gestion des événements asynchrones et manipulation des données.

Vite : Utilisé comme bundler pour un développement ultra-rapide (HMR instantané).

### Interface & Design

- Tailwind CSS : Framework CSS utility-first utilisé pour le styling rapide, le responsive design et la gestion facile du Dark Mode.

- Glassmorphism UI : Utilisation intensive de backdrop-blur et de transparences pour une esthétique moderne et luxueuse.

- Lucide Svelte : Bibliothèque d'icônes SVG légères et personnalisables.

### Intelligence Artificielle (Google Gemini API)

L'application intègre l'API Gemini Pro & Flash pour des fonctionnalités dynamiques :

- Concierge Virtuel (Chatbot) : Un assistant capable de répondre aux questions sur le menu et les horaires en contexte.

- Générateur de Plats (Admin) : Création automatique de fiches plats (nom, description, prix) à partir d'une simple liste d'ingrédients.

- Sommelier IA : Suggestion automatique d'accords mets-vins pour chaque plat.

- Synthèse Vocale (TTS) : Lecture audio des descriptions de plats pour l'accessibilité.

- Assistant Marketing : Rédaction automatique de posts Instagram pour les plats du jour.

### Gestion des Données (Client-Side)

> Svelte Stores : Gestion de l'état global de l'application (Panier, Utilisateur connecté, Thème).

> LocalStorage : Persistance des données (Menu, Réservations, Avis) pour simuler une base de données sans backend serveur complexe pour cette démo.

## ✨ Fonctionnalités Clés

### Pour le Client 👥

- Effet Parallaxe 3D : Une page d'accueil immersive réagissant au scroll.

- Click & Collect : Ajout au panier et validation de commande en temps réel.

- Personnalisation : Changement de thème (couleurs) et Dark Mode dynamique.

- Accessibilité : Badges alimentaires et lecture audio des plats.

### Pour l'Administrateur 👨‍🍳

- Dashboard Pro : Vue d'ensemble des commandes et réservations.

- Gestion CRM : Acceptation/Refus des réservations.

- Modération IA : Réponse automatique aux avis clients générée par l'IA.

### Installation et Démarrage

>Pour lancer ce projet localement :

- Cloner le dépôt

```sh
git clone [https://github.com/allomoh/le-gourmet-moderne.git](https://github.com/allomoh/le-gourmet-moderne.git)
cd le-gourmet-moderne
```

>Installer les dépendances:
```
npm install
```

>Configurer l'API Key
Ouvrez le fichier src/lib/gemini.js et ajoutez votre clé API Google Gemini (ou configurez un fichier .env).

```js
const apiKey = VOTRE_CLE_API_GEMINI;
```

>Lancer le serveur de développement
```sh
npm run dev
```

>Ouvrez votre navigateur sur http://localhost:5173.

### Aperçu


>Développé avec ❤️ et de l'IA.