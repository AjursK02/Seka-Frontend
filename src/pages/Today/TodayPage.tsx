import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/AuthContext";
import { Section } from "../../components/common/Section";
import { TodayHero } from "../../components/today/TodayHero";
import { TodayBodyCard } from "../../components/today/TodayBodyCard";
import { TodayInsightCard } from "../../components/today/TodayInsightCard";
import { TodayPlanCard } from "../../components/today/TodayPlanCard";
import { TodayCheckInCard } from "../../components/today/TodayCheckInCard";
import { todayScreenContent } from "../../data/today";

export function TodayPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const firstName = user?.name ? user.name.split(" ")[0] : "Sarah";
  const dynamicHero = {
    ...todayScreenContent.hero,
    title: `Good morning, ${firstName}.`,
  };

  return (
    <div className="space-y-10 pb-8">
      <TodayHero content={dynamicHero} />

      <Section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        <div className="md:col-span-2 lg:col-span-12">
          <TodayBodyCard content={todayScreenContent.body} />
        </div>
        <div className="md:col-span-2 lg:col-span-7">
          <TodayInsightCard content={todayScreenContent.insight} />
        </div>
        <div className="md:col-span-2 lg:col-span-5">
          <TodayPlanCard content={todayScreenContent.plan} />
        </div>
        <div className="md:col-span-2 lg:col-span-12">
          <TodayCheckInCard
            content={todayScreenContent.checkIn}
            onCheckIn={() => navigate("/today/daily-check-in")}
          />
        </div>
      </Section>
    </div>
  );
}
