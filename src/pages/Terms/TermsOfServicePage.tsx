import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, BadgeInfo, Ban, BrainCircuit, Building2, FileText, Gavel, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";

type TermsSection = {
  id: string;
  title: string;
  icon: typeof BadgeInfo;
  content: string[];
  bullets?: string[];
};

const termsSections: TermsSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: Gavel,
    content: [
      "These Terms & Conditions govern your access to and use of Seka's website, application and related services.",
      "By creating an account, accessing or using Seka, you acknowledge that you have read, understood and agreed to these Terms & Conditions.",
      "If you do not agree with these Terms, you should not use Seka.",
      "These Terms should be read together with Seka's Privacy Policy and Medical & AI Disclaimer.",
    ],
  },
  {
    id: "about",
    title: "About Seka",
    icon: Building2,
    content: [
      "Seka is an AI-enabled women's wellness and care-support platform designed to help users understand their personal health context, identify patterns, receive personalized wellness guidance and organize information that may be useful when discussing their health with qualified healthcare professionals.",
      "Seka is a technology and wellness service.",
      "Seka is not a hospital, clinic, medical practice or emergency medical service.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and Your Account",
    icon: ShieldCheck,
    content: [
      "You must meet the minimum age requirement specified by Seka to create and use an account.",
      "By using Seka, you confirm that you meet the applicable minimum age requirement, the information you provide is accurate to the best of your knowledge, you are using the service for your own personal and lawful purposes, and you have the legal capacity to accept these Terms.",
      "If you do not meet the applicable eligibility requirements, you must not create or use an account.",
      "Certain Seka features may require you to create an account.",
      "You are responsible for providing accurate account information, maintaining the security of your account, keeping authentication credentials confidential, not sharing your account with another person, and notifying Seka if you believe your account has been accessed without authorization.",
      "You are responsible for activity carried out through your account unless the activity resulted from circumstances outside your reasonable control.",
    ],
  },
  {
    id: "service",
    title: "Use of the Service",
    icon: FileText,
    content: ["You may use Seka only for lawful personal purposes and in accordance with these Terms."],
    bullets: [
      "Use Seka for unlawful activities.",
      "Attempt to gain unauthorized access to Seka or its systems.",
      "Interfere with the operation or security of the platform.",
      "Attempt to bypass security or access restrictions.",
      "Upload malicious software or harmful code.",
      "Use automated systems to excessively access or extract information from Seka.",
      "Reverse engineer or attempt to reproduce the underlying software except where permitted by applicable law.",
      "Use Seka to harass, threaten or harm another person.",
      "Misrepresent yourself or another person.",
      "Use Seka's services to provide professional medical services to others.",
    ],
  },
  {
    id: "user-info",
    title: "User-Provided Information and AI Features",
    icon: BrainCircuit,
    content: [
      "Seka allows users to provide information relating to themselves through the application.",
      "You remain responsible for the information you submit to Seka.",
      "You agree that information you provide should be accurate and should not knowingly contain unlawful, malicious or misleading material.",
      "You should not provide information belonging to another individual unless you have the appropriate authority to do so.",
      "Seka uses artificial intelligence to provide certain features and personalized interactions.",
      "AI-generated responses are produced using automated systems and may not always be accurate, complete or appropriate for every individual situation.",
      "Seka does not guarantee that an AI-generated response will be correct or suitable for your specific circumstances.",
      "You should use your own judgment when considering information provided through Seka and seek appropriate professional advice where necessary.",
      "Seka may modify, improve, replace or discontinue AI models and related functionality as the product develops.",
    ],
  },
  {
    id: "health",
    title: "Wellness, Health Information and Emergencies",
    icon: Sparkles,
    content: [
      "Seka is designed to support personal wellness and health understanding.",
      "Information provided by Seka should not be interpreted as a confirmed medical diagnosis, medical prescription or individualized treatment plan.",
      "Seka does not replace consultation with a qualified healthcare professional.",
      "You should not delay seeking professional medical advice because of information provided by Seka.",
      "Seka is not an emergency medical service.",
      "Do not use Seka as a substitute for emergency medical assistance.",
      "If you believe that you are experiencing a medical emergency or an immediately dangerous condition, seek appropriate emergency medical assistance or contact a qualified healthcare professional.",
      "Seka does not continuously monitor users and cannot guarantee that a potentially serious health situation will be detected.",
      "Seka does not guarantee that its services will diagnose a medical condition, identify the underlying cause of symptoms, detect a specific health condition, prevent or treat disease, produce a particular health outcome, replace a healthcare professional, or provide a definitive interpretation of laboratory results.",
      "Any patterns, observations, explanations or recommendations generated by Seka should be treated as informational wellness guidance rather than definitive medical conclusions.",
      "You are responsible for making decisions regarding your health and wellbeing, and should not rely on Seka as the sole basis for decisions concerning medication, medical treatment, diagnosis, surgery, pregnancy-related care, emergency situations or changes to prescribed treatment.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Services and Availability",
    icon: FileText,
    content: [
      "Seka may integrate or rely on third-party services to provide certain functionality.",
      "These services may include authentication, cloud infrastructure, artificial intelligence, analytics, communications, payments, storage and other technology services.",
      "Third-party services may operate under their own terms and privacy policies.",
      "Seka is not responsible for services that are independently operated by third parties, except to the extent required by applicable law.",
      "Seka aims to provide reliable access to its services but does not guarantee that the application will always be available, uninterrupted, error-free, free from technical issues, or compatible with every device or browser.",
      "Seka may temporarily restrict or suspend access to perform maintenance, security updates, system upgrades, bug fixes, infrastructure changes or emergency security measures.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property, Content and Data",
    icon: Ban,
    content: [
      "The Seka platform and its associated materials are owned by or licensed to Seka and are protected by applicable intellectual property laws.",
      "Except as expressly permitted by Seka or applicable law, you may not reproduce, modify, distribute, sell, publicly display, commercially exploit or create derivative works from Seka's proprietary materials.",
      "You retain ownership of information and content that you provide to Seka, subject to the rights necessary for Seka to operate and provide the service.",
      "By submitting information to Seka, you grant Seka the permissions reasonably necessary to store, process and use that information for providing the services in accordance with these Terms and the Privacy Policy.",
      "Seka will handle personal information in accordance with its Privacy Policy.",
      "Users must not intentionally submit unlawful, infringing, malicious, impersonating, abusive or security-compromising content through Seka.",
      "Seka may restrict or remove content where reasonably necessary to protect the service, users or comply with applicable law.",
    ],
  },
  {
    id: "changes",
    title: "Changes, Suspension and Termination",
    icon: ShieldCheck,
    content: [
      "Seka may modify, add, remove or discontinue features from time to time.",
      "Changes may be required because of product development, technical requirements, security considerations, regulatory requirements, changes to third-party services or user feedback.",
      "Seka does not guarantee that a particular feature will remain available indefinitely.",
      "Certain features may be provided as beta, experimental, preview or limited-access functionality.",
      "Such features may contain errors, change without notice, have limited availability, produce inconsistent results or be discontinued.",
      "Seka may suspend or terminate an account where reasonably necessary, including where the user violates these Terms, attempts to compromise the security of the platform, uses the account for unlawful activity, abuses the service, suspension is necessary to protect other users, or suspension is required by law.",
      "Users may stop using Seka at any time.",
      "Where an account is terminated, applicable provisions of these Terms that are intended to continue after termination will remain effective.",
    ],
  },
  {
    id: "legal",
    title: "Privacy, Liability and Legal Terms",
    icon: Gavel,
    content: [
      "Your use of Seka is also governed by the Seka Privacy Policy, which explains how Seka collects, uses, stores, protects and processes personal information and forms part of these Terms.",
      "When an account is deleted or terminated, personal information will be handled in accordance with Seka's Privacy Policy and applicable law.",
      "Certain information may be retained where required by law, necessary for security, dispute resolution or other legitimate purposes.",
      "To the extent permitted by applicable law, Seka is provided on an 'as available' basis and does not guarantee uptime, error-free operation, correct AI information, or that every user requirement will be satisfied.",
      "To the maximum extent permitted by applicable law, Seka and its operators will not be responsible for indirect, incidental, consequential or special losses arising from the use of the service.",
      "Seka will not be responsible for decisions made solely on the basis of AI-generated information or wellness guidance provided through the platform.",
      "To the extent permitted by applicable law, you agree to be responsible for losses or claims arising from your unlawful use of Seka, violation of these Terms, or infringement of another person's rights through your use of the service.",
      "These Terms shall be governed by and interpreted in accordance with the laws of India, and disputes shall be subject to the jurisdiction of the courts having appropriate jurisdiction in India, subject to applicable law.",
      "If any provision of these Terms is found to be invalid, unlawful or unenforceable, that provision shall be interpreted or modified to the extent necessary to make it enforceable, where legally permitted, and the remaining provisions will continue to apply.",
      "These Terms, together with the Privacy Policy and other policies expressly incorporated into them, constitute the agreement governing your use of Seka.",
      "If there is a conflict between these Terms and a specific product notice, the specific notice will apply to the relevant subject matter to the extent required by applicable law.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    icon: BadgeInfo,
    content: [
      "For questions regarding these Terms or the Seka service, contact Seka at founderoffice@ajursinsights.com or visit www.seka.ajursinsights.com.",
      "Effective Date: 17 Aug 2026",
      "Last Updated: 17 Aug 2026",
    ],
  },
];

const highlights = [
  "Built for personal wellness use",
  "AI guidance is informational only",
  "Account and content rules apply",
  "India governing law and jurisdiction",
];

export function TermsOfServicePage() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <Section className="pb-10">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto w-full max-w-5xl"
      >
        <div className="overflow-hidden rounded-[2rem] border border-outline/50 bg-surface shadow-soft">
          <header className="flex items-center justify-between gap-4 border-b border-outline/40 bg-background/80 px-5 py-4 backdrop-blur-xl sm:px-6">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Back"
              className="h-10 w-10 rounded-full px-0"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 rounded-full border border-outline bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              <Gavel className="h-4 w-4 text-primary" />
              Terms of Service
            </div>

            <div className="h-10 w-10" aria-hidden="true" />
          </header>

          <main className="space-y-8 px-5 py-8 sm:px-6">
            <div className="space-y-4">
              <Typography as="p" variant="micro" className="text-primary">
                Legal Terms
              </Typography>
              <Typography as="h1" variant="display" className="text-text">
                Terms & Conditions
              </Typography>
              <Typography variant="bodyMuted" className="max-w-3xl">
                These terms summarize the rules for using Seka. The structure below keeps the wording readable while preserving the content you supplied.
              </Typography>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item) => (
                <Card key={item} tone="subtle" className="px-4 py-4">
                  <Typography as="p" variant="micro" className="text-primary">
                    Key point
                  </Typography>
                  <Typography as="p" variant="body" className="mt-2 text-text">
                    {item}
                  </Typography>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              {termsSections.map((section) => {
                const Icon = section.icon;

                return (
                  <Card key={section.id} className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <Typography as="h2" variant="title" className="text-text">
                          {section.title}
                        </Typography>
                        <Typography variant="bodyMuted" className="mt-1">
                          {section.id === "contact"
                            ? "Contact details, policy dates, and governing framework."
                            : "Structured term language from the document you provided."}
                        </Typography>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {section.content.map((paragraph) => (
                        <Typography key={paragraph} variant="body" className="text-text-muted">
                          {paragraph}
                        </Typography>
                      ))}
                    </div>

                    {section.bullets ? (
                      <div className="rounded-2xl border border-outline/70 bg-surface px-4 py-4">
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2 text-sm leading-6 text-text-muted">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </Card>
                );
              })}
            </div>
          </main>
        </div>
      </motion.div>
    </Section>
  );
}
