import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import { normalizeCareAssistantText } from "../../utils/normalizeCareAssistantText";
import type { CareMessage, CareEvidence } from "../../types/care";

export interface CareConversationProps {
  messages: CareMessage[];
  evidence?: CareEvidence;
  isSending?: boolean;
}

const markdownSanitizeSchema = defaultSchema;

function ThinkingBubble() {
  return (
    <div className="pr-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
        <Typography as="p" variant="micro" className="text-primary">
          SEKA Insights
        </Typography>
      </div>
      <div className="inline-flex items-center gap-2 rounded-3xl border border-outline/60 bg-surface px-4 py-3 shadow-soft">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70 motion-safe:animate-pulse [animation-delay:-0.2s]" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70 motion-safe:animate-pulse [animation-delay:-0.1s]" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70 motion-safe:animate-pulse" />
        <Typography as="span" variant="micro" className="ml-2 text-text-muted">
          SEKA is thinking...
        </Typography>
      </div>
    </div>
  );
}

const markdownComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <Typography as="h2" variant="headline" className="mb-3 text-text">
      {children}
    </Typography>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <Typography as="h3" variant="title" className="mb-2 mt-5 text-text">
      {children}
    </Typography>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <Typography as="h4" variant="title" className="mb-2 mt-4 text-sm text-text">
      {children}
    </Typography>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <Typography as="p" variant="body" className="mb-3 whitespace-pre-wrap leading-relaxed">
      {children}
    </Typography>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-3 ml-1 list-disc space-y-2 pl-5">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-3 ml-1 list-decimal space-y-2 pl-5">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-relaxed text-text">{children}</li>
  ),
  strong: ({ children }: { children?: ReactNode }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }: { children?: ReactNode }) => <em className="italic">{children}</em>,
  a: ({ children, href }: { children?: ReactNode; href?: string }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="mb-3 border-l-2 border-outline/70 pl-4 text-text-muted">{children}</blockquote>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[0.9em] text-text">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="mb-3 overflow-x-auto rounded-2xl bg-surface-muted p-4 text-sm leading-6 text-text">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-4 border-outline/60" />,
  table: ({ children }: { children?: ReactNode }) => (
    <div className="mb-3 overflow-x-auto rounded-2xl border border-outline/50">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: ReactNode }) => <thead className="bg-surface-muted">{children}</thead>,
  tbody: ({ children }: { children?: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children?: ReactNode }) => (
    <tr className="border-b border-outline/30 last:border-b-0">{children}</tr>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="px-3 py-2 font-semibold text-text">{children}</th>
  ),
  td: ({ children }: { children?: ReactNode }) => <td className="px-3 py-2 text-text">{children}</td>,
} as const;

export function CareConversation({ messages, evidence, isSending = false }: CareConversationProps) {
  const shouldReduceMotion = useReducedMotion();
  const EvidenceIcon = evidence?.icon;

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05, ease: "easeOut" }}
      className="space-y-6 pb-4"
    >
      <div className="space-y-6">
        {messages.map((message) =>
          message.sender === "user" ? (
            <div key={message.id} className="pl-12 text-right">
              <Typography as="p" variant="body" className="inline-block text-text">
                {message.text}
              </Typography>
              {message.time ? (
                <Typography variant="micro" className="mt-2 text-right text-text-muted">
                  {message.time}
                </Typography>
              ) : null}
            </div>
          ) : (
            <div key={message.id} className="pr-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary motion-safe:animate-pulse" />
                <Typography as="p" variant="micro" className="text-primary">
                  {message.label}
                </Typography>
              </div>
              <div className="space-y-4">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[[rehypeSanitize, markdownSanitizeSchema]]}
                  components={markdownComponents}
                >
                  {normalizeCareAssistantText(message.text || "")}
                </ReactMarkdown>
              </div>
              {evidence && EvidenceIcon ? (
                <Card tone="subtle" className="mt-6 border-outline/60 bg-surface-muted">
                  <div className="flex items-start gap-3">
                    <EvidenceIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <Typography as="h3" variant="title" className="text-sm">
                        {evidence.title}
                      </Typography>
                      <Typography
                        variant="micro"
                        className="mt-1 normal-case tracking-normal text-text-muted"
                      >
                        {evidence.description}
                      </Typography>
                    </div>
                  </div>
                </Card>
              ) : null}
            </div>
          ),
        )}
        {isSending ? <ThinkingBubble /> : null}
      </div>

      <div className="h-px w-full bg-outline/40" />
    </motion.section>
  );
}
