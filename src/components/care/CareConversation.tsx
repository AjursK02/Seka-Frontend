import { motion, useReducedMotion } from "framer-motion";

import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { CareMessage, CareEvidence } from "../../types/care";

export interface CareConversationProps {
  messages: CareMessage[];
  evidence?: CareEvidence;
}

export function CareConversation({ messages, evidence }: CareConversationProps) {
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
                <Typography as="p" variant="body" className="whitespace-pre-wrap leading-relaxed">
                  {message.text}
                </Typography>
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
      </div>

      <div className="h-px w-full bg-outline/40" />
    </motion.section>
  );
}
