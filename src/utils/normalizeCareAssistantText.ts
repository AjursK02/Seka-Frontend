const markdownLinkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
const markdownHeadingPattern = /^\s{0,3}#{1,6}\s*/;
const markdownBlockquotePattern = /^\s{0,3}>\s?/;
const markdownListPattern = /^\s{0,3}(?:[-*+]|\d+[.)])\s+/;
const markdownRulePattern = /^\s*(?:[-*_]\s*){3,}\s*$/;

const stripInlineMarkdown = (value: string) =>
  value
    .replace(markdownLinkPattern, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

export const normalizeCareAssistantText = (value: string) => {
  if (!value) {
    return "";
  }

  const lines = value.replace(/\r\n/g, "\n").split("\n");
  const normalizedLines = lines
    .map((line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        return "";
      }

      if (markdownRulePattern.test(trimmedLine)) {
        return "";
      }

      const withoutQuote = trimmedLine.replace(markdownBlockquotePattern, "");
      const isListItem = markdownListPattern.test(withoutQuote);
      const withoutHeading = withoutQuote.replace(markdownHeadingPattern, "");
      const cleanedLine = stripInlineMarkdown(withoutHeading);

      if (!cleanedLine) {
        return "";
      }

      if (isListItem) {
        return `• ${cleanedLine}`;
      }

      return cleanedLine;
    })
    .join("\n");

  return normalizedLines
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
};
