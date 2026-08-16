export const normalizeCareAssistantText = (value: string) => {
  if (!value) {
    return "";
  }

  return value
    .normalize("NFKC")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
};
