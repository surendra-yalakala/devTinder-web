export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";

export const TOAST_DURATION = 2000;
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};
