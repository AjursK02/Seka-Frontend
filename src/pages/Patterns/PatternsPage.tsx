import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";
import { patternCategories, patternTimeline, patternsPageContent, discoveries } from "../../data/patterns";
import { DiscoveryCard } from "../../components/patterns/DiscoveryCard";
import { PatternCategory } from "../../components/patterns/PatternCategory";
import { PatternHeader } from "../../components/patterns/PatternHeader";
import { Timeline } from "../../components/patterns/Timeline";

export function PatternsPage() {
  return (
    <div className="space-y-10">
      <PatternHeader content={patternsPageContent} />

      <Section className="space-y-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div>
            <Typography as="h2" variant="title">
              Categories
            </Typography>
            <Typography variant="bodyMuted">
              Signals are grouped by the systems SEKA is monitoring right now.
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {patternCategories.map((category) => (
            <PatternCategory key={category.id} category={category} />
          ))}
        </div>
      </Section>

      <Section className="space-y-4">
        <div>
          <Typography as="h2" variant="title">
            Discoveries
          </Typography>
          <Typography variant="bodyMuted">
            Each discovery is backed by recent data and updates automatically as more signals arrive.
          </Typography>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {discoveries.map((discovery, index) => (
            <DiscoveryCard key={discovery.id} discovery={discovery} index={index} />
          ))}
        </div>
      </Section>

      <Timeline items={patternTimeline} />
    </div>
  );
}
