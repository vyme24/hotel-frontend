import { STORAGE_KEYS, readStorage } from "./storage";

function decodeJwtPayload(token) {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const normalized = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join("")
    );

    return JSON.parse(normalized);
  } catch {
    return null;
  }
}

export function getTokenExpiry(token) {
  const payload = decodeJwtPayload(token);
  return payload?.exp ? payload.exp * 1000 : null;
}

export function isTokenExpired(token, offsetMs = 0) {
  const expiry = getTokenExpiry(token);
  return expiry ? Date.now() + offsetMs >= expiry : false;
}

export function getStoredAuthState() {
  const persisted = readStorage(STORAGE_KEYS.auth, null);
  const token = persisted?.token || null;

  if (!token || isTokenExpired(token)) {
    return {
      token: null,
      user: null,
      expiresAt: null,
      isAuthenticated: false,
    };
  }

  return {
    token,
    user: persisted?.user || null,
    expiresAt: persisted?.expiresAt || getTokenExpiry(token),
    isAuthenticated: true,
  };
}
