export const STORAGE_KEYS = {
  auth: "luxstay_auth",
  wishlist: "luxstay_wishlist",
  recentlyViewed: "luxstay_recently_viewed",
  cartCheckout: "luxstay_cart_checkout",
  postLoginRedirect: "luxstay_post_login_redirect",
  pendingCartIntent: "luxstay_pending_cart_intent",
};

export function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in restricted/private contexts.
  }
}

export function readSessionStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeSessionStorage(key, value) {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in restricted/private contexts.
  }
}

export function removeStoredValue(key, type = "local") {
  if (typeof window === "undefined") return;

  const storage = type === "session" ? window.sessionStorage : window.localStorage;
  try {
    storage.removeItem(key);
  } catch {
    // Ignore storage errors in restricted/private contexts.
  }
}

export function toggleStoredId(key, id) {
  const current = readStorage(key, []);
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [id, ...current];

  writeStorage(key, next);
  return next;
}

export function pushRecentItem(key, item, limit = 4) {
  const current = readStorage(key, []);
  const next = [item, ...current.filter((entry) => entry?._id !== item?._id)].slice(0, limit);
  writeStorage(key, next);
  return next;
}
