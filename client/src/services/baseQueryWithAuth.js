import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { logout } from "../store/authSlice";
import { getApiBaseUrl, getApiErrorMessage } from "../utils/api";
import { STORAGE_KEYS } from "../utils/storage";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: getApiBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    const token = getState?.().auth?.token || localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithFeedback = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;
    const message = getApiErrorMessage(result.error);

    if (status === 401) {
      api.dispatch(logout());
      toast.error("Your session expired. Please login again.", { id: "auth-expired" });
      sessionStorage.setItem(
        STORAGE_KEYS.postLoginRedirect,
        window.location.pathname + window.location.search + window.location.hash
      );
    } else if (status !== "PARSING_ERROR") {
      toast.error(message, { id: `${status || "api"}-${typeof args === "string" ? args : args?.url || "request"}` });
    }
  }

  return result;
};

export const baseQueryWithAuth = retry(baseQueryWithFeedback, { maxRetries: 1 });
