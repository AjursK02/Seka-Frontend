import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";
import { mePageContent, profileHighlights, profileSettings, profileTags } from "../../data/me";
import { MeHero } from "../../components/me/MeHero";
import { MeHighlights } from "../../components/me/MeHighlights";
import { SettingsList } from "../../components/me/SettingsList";

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

  const handleItemClick = async (id: string) => {
    if (id === "logout") {
      try {
        await logout();
      } finally {
        navigate("/");
      }
      return;
    }

    if (id === "health-context") {
      navigate("/me/context");
    }
  };

  return (
    <div className="space-y-10 pb-8">
      <MeHero content={mePageContent} profile={dynamicProfile} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
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
