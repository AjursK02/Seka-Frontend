const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const isLocalhostUrl =
  !!configuredApiBaseUrl &&
  /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?\/?$/i.test(configuredApiBaseUrl);

export const getApiBaseUrl = () => {
  if (configuredApiBaseUrl && !isLocalhostUrl) {
    return configuredApiBaseUrl.replace(/\/+$/, "");
  }

  if (import.meta.env.PROD) {
    return "https://seka-backend.vercel.app";
  }

  return "";
};

export const buildApiUrl = (path: string) => `${getApiBaseUrl()}${path}`;
