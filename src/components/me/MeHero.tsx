import { motion, useReducedMotion } from "framer-motion";
import { Pencil } from "lucide-react";

import { Avatar } from "../common/Avatar";
import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { Typography } from "../common/Typography";
import type { MePageContent, MeProfile } from "../../types/me";

export interface MeHeroProps {
  content: MePageContent;
  profile: MeProfile;
}

export function MeHero({ content, profile }: MeHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex flex-col items-center text-center lg:flex-row lg:items-end lg:justify-between lg:text-left"
    >
      <div className="relative mb-6 lg:mb-0">
        <Avatar
          name={profile.name}
          initials={profile.initials}
          imageUrl={profile.imageUrl}
          alt={content.avatarLabel}
          size="lg"
          className="h-24 w-24 border border-outline/20 bg-surface-strong text-primary shadow-soft"
        />
        <Button
          variant="secondary"
          size="sm"
          aria-label="Edit profile photo"
          className="absolute bottom-0 right-0 h-9 w-9 rounded-full border border-outline/40 px-0 shadow-soft"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-w-2xl">
        <Typography as="h1" variant="headline" className="mb-2 text-text lg:text-3xl">
          {profile.name || content.title}
        </Typography>
        <Typography variant="bodyMuted" className="max-w-md lg:max-w-xl">
          {profile.email || content.description}
        </Typography>
      </div>

      <Card tone="subtle" className="mt-8 w-full max-w-md border-outline/60 text-left lg:mt-0">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Typography as="p" variant="micro" className="text-text-muted">
              Account
            </Typography>
            <Typography as="p" variant="title" className="mt-1 text-text font-bold">
              {profile.name}
            </Typography>
            {profile.email && (
              <Typography variant="bodyMuted" className="mt-1 text-sm">
                {profile.email}
              </Typography>
            )}
            {profile.mobileNumber && (
              <Typography variant="bodyMuted" className="mt-1 text-sm">
                {profile.mobileNumber}
              </Typography>
            )}
          </div>
          <span className="rounded-full bg-primary-soft px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">
            Active
          </span>
        </div>
      </Card>
    </motion.section>
  );
}
