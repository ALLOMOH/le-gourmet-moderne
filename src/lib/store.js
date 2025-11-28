import { writable, derived, get } from "svelte/store";
import { browser } from "$app/environment";

// --- DONNÉES INITIALES ---
const INITIAL_MENU = [
  {
    id: 1,
    category: "Entrées",
    name: "Carpaccio de St-Jacques",
    price: 18,
    desc: "Agrumes, huile de vanille.",
    image:
      "https://www.chefviande.com/wp-content/uploads/2025/09/Carpaccio-de-Saint-Jacques-Vinaigrette-Mangue.webp",
  },
  {
    id: 3,
    category: "Plats",
    name: "Filet de Boeuf Rossini",
    price: 34,
    desc: "Foie gras poêlé, jus truffé.",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    category: "Desserts",
    name: "Pavlova Exotique",
    price: 12,
    desc: "Meringue, chantilly coco.",
    image:
      "https://static.wixstatic.com/media/09d5ae_f00a4a5dffd84eeab763390ec8a548e1~mv2.jpg/v1/fill/w_740,h_925,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/09d5ae_f00a4a5dffd84eeab763390ec8a548e1~mv2.jpg",
  },
];

// --- STORES ---
export const menu = writable(INITIAL_MENU);
export const cart = writable([]);
export const orders = writable([]);
export const reservations = writable([]);
export const reviews = writable([
  { id: 1, user: "Sophie", rating: 5, text: "Excellent !", date: "Hier" },
]);

// --- AUTHENTIFICATION ---
const initialUser =
  browser && localStorage.getItem("user")
    // @ts-ignore
    ? JSON.parse(localStorage.getItem("user"))
    : null;
export const user = writable(initialUser);
export const isAuthOpen = writable(false);
export const authMode = writable("login"); // 'login' | 'register'

// Simulation BDD Utilisateurs
let usersDb = [
  {
    name: "Admin",
    email: "admin@gourmet.fr",
    password: "admin",
    role: "admin",
  },
  { name: "Client", email: "client@test.com", password: "123", role: "user" },
];

export const authActions = {
  // @ts-ignore
  login: (email, password) => {
    const found = usersDb.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      user.set(found);
      isAuthOpen.set(false);
      if (browser) localStorage.setItem("user", JSON.stringify(found));
      return true;
    }
    return false;
  },
  // @ts-ignore
  register: (name, email, password) => {
    const newUser = { name, email, password, role: "user" };
    usersDb.push(newUser);
    // Auto login après inscription
    user.set(newUser);
    isAuthOpen.set(false);
    if (browser) localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  },
  logout: () => {
    user.set(null);
    cart.set([]);
    if (browser) localStorage.removeItem("user");
  },
};

// --- LOGIQUE PANIER ---
export const cartTotal = derived(cart, ($cart) =>
  // @ts-ignore
  $cart.reduce((total, item) => total + item.price * item.qty, 0)
);

export const cartActions = {
  // @ts-ignore
  add: (item) =>
    // @ts-ignore
    cart.update((items) => {
      // @ts-ignore
      const existing = items.find((i) => i.id === item.id);
      if (existing)
        return items.map((i) =>
          // @ts-ignore
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...items, { ...item, qty: 1 }];
    }),
  // @ts-ignore
  remove: (id) => cart.update((items) => items.filter((i) => i.id !== id)),
  // @ts-ignore
  updateQty: (id, delta) =>
    cart.update((items) =>
      // @ts-ignore
      items.map((i) =>
        // @ts-ignore
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    ),
  checkout: () => {
    const currentUser = get(user);
    // @ts-ignore
    const currentCart = get(cart);
    const total = get(cartTotal);

    orders.update((prev) => [
      // @ts-ignore
      {
        id: Date.now(),
        items: currentCart,
        total,
        status: "En préparation",
        user: currentUser?.name || "Invité",
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
    cart.set([]);
  },
};
