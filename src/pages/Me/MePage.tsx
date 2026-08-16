import { useNavigate } from "react-router-dom";
import { Activity, Dna, ClipboardList } from "lucide-react";

import { useAuth } from "../../auth/AuthContext";
import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";
import { mePageContent, profileSettings } from "../../data/me";
import { MeHero } from "../../components/me/MeHero";
import { MeHighlights } from "../../components/me/MeHighlights";
import { SettingsList } from "../../components/me/SettingsList";
import type { ProfileHighlightCard, ProfileTag } from "../../types/me";

export function MePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const dynamicProfile = {
    name: user?.name || "Guest",
    role: "Member",
    initials: user?.name
      ? user.name
          .split(" ")
          .filter(Boolean)
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "G",
    email: user?.email,
    mobileNumber: user?.mobileNumber,
  };

  const pcosConcerns = user?.onboardingAnswers?.pcosConcern?.filter(Boolean) ?? [];
  const symptomGoals = user?.onboardingAnswers?.symptomsNoticed?.filter(Boolean) ?? [];

  const profileTags: ProfileTag[] = [
    ...(pcosConcerns.length
      ? [
          {
            id: "pcos-concern",
            label: pcosConcerns[0],
          },
        ]
      : []),
    ...(symptomGoals.length
      ? [
          {
            id: "primary-symptom",
            label: `Goal: Manage ${symptomGoals[0]}`,
          },
        ]
      : []),
  ];

  const profileHighlights: ProfileHighlightCard[] = [
    ...(pcosConcerns.length || symptomGoals.length
      ? [
          {
            id: "health-profile",
            title: pcosConcerns[0] || "Health Profile",
            subtitle: "From your onboarding",
            icon: Dna,
            tone: "subtle" as const,
            meta: user?.isOnboarded ? "Onboarding complete" : "Complete onboarding",
            activityLabel: symptomGoals.length
              ? `Goal: Manage ${symptomGoals[0]}`
              : "Open onboarding",
          },
        ]
      : []),
    {
      id: "health-data",
      title: "Health Data",
      subtitle: "Synced from HealthKit",
      icon: Activity,
      tone: "default",
      meta: "Sync Active",
      activityLabel: "Open context",
    },
    {
      id: "visit-summary",
      title: "Visit Summary",
      subtitle: "Prepare for my Doctor",
      icon: ClipboardList,
      tone: "subtle",
      meta: "Last 30 days",
      activityLabel: "Open summary",
    },
  ];

  const handleItemClick = async (id: string) => {
    if (id === "logout") {
      try {
        await logout();
      } finally {
        navigate("/");
      }
      return;
    }

    if (id === "personal") {
      navigate("/me/personal");
      return;
    }

    if (id === "health-context") {
      navigate("/me/context");
      return;
    }

    if (id === "privacy") {
      navigate("/me/privacy-security");
    }
  };

  return (
    <div className="space-y-10 pb-8">
      <MeHero content={mePageContent} profile={dynamicProfile} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] xl:items-start">
        <Section className="space-y-4">
          <MeHighlights
            highlights={profileHighlights}
            tags={profileTags}
          />
        </Section>

        <Section className="space-y-4">
          <SettingsList items={profileSettings} onItemClick={handleItemClick} />
          <Typography as="p" variant="bodyMuted" className="px-2">
            Log out is available from the settings area when you’re ready to switch accounts.
          </Typography>
        </Section>
      </div>
    </div>
  );
}
