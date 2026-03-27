function trimTrailingSlash(value = "") {
  return value.replace(/\/+$/, "");
}

export function normalizeApiUrl(value = "") {
  const normalized = trimTrailingSlash(value);
  if (!normalized) return "";
  return normalized.endsWith("/api") ? normalized : `${normalized}/api`;
}

export function getApiOrigin() {
  const localOrigin = import.meta.env.VITE_LOCAL_API_ORIGIN || "http://localhost:5000";
  const explicitOrigin = import.meta.env.VITE_API_ORIGIN;
  const configuredUrl = import.meta.env.VITE_API_URL;
  const configuredBase = import.meta.env.VITE_API_BASE_URL;

  if (import.meta.env.DEV && import.meta.env.VITE_USE_REMOTE_API !== "true") {
    return trimTrailingSlash(localOrigin);
  }

  if (explicitOrigin) return trimTrailingSlash(explicitOrigin);
  if (configuredUrl) return trimTrailingSlash(configuredUrl.replace(/\/api$/, ""));
  if (configuredBase) return trimTrailingSlash(configuredBase.replace(/\/api$/, ""));
  return trimTrailingSlash(localOrigin);
}

export function getApiBaseUrl() {
  const localApiUrl = normalizeApiUrl(import.meta.env.VITE_LOCAL_API_URL || "http://localhost:5000/api");
  const explicitUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  if (import.meta.env.DEV && import.meta.env.VITE_USE_REMOTE_API !== "true") {
    return localApiUrl;
  }

  if (explicitUrl) {
    return normalizeApiUrl(explicitUrl);
  }

  if (import.meta.env.DEV) {
    return "/api";
  }

  return "http://localhost:5000/api";
}

export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error) return fallback;

  if (typeof error === "string") return error;

  if (error?.status === "FETCH_ERROR") {
    return "Unable to reach the server. Please check your API URL or backend CORS settings.";
  }

  return (
    error?.data?.message ||
    error?.error ||
    error?.message ||
    fallback
  );
}
