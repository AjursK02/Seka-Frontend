import { Button } from "../common/Button";
import type { CarePrompt } from "../../types/care";

export interface CarePromptPillsProps {
  prompts: CarePrompt[];
  onPromptSelect?: (prompt: string) => void;
}

export function CarePromptPills({ prompts, onPromptSelect }: CarePromptPillsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {prompts.map((prompt) => (
        <Button
          key={prompt.id}
          variant="secondary"
          size="sm"
          className="rounded-full border border-outline-variant bg-surface-container-lowest text-text-muted shadow-none hover:border-primary hover:text-primary"
          type="button"
          onClick={() => onPromptSelect?.(prompt.label)}
        >
          {prompt.label}
        </Button>
      ))}
    </div>
  );
}
