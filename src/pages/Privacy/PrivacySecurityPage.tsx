import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, BadgeInfo, ShieldCheck, Trash2, Mail, Cookie, FileText, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";

type PolicySection = {
  id: string;
  title: string;
  icon: typeof BadgeInfo;
  content: string[];
  bullets?: string[];
};

const policySections: PolicySection[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: BadgeInfo,
    content: [
      "Seka respects the privacy of individuals who use its website, application and related services.",
      "This Privacy & Personal Data document explains what personal information Seka may collect, how that information is used, how it is stored and protected, when it may be shared with third parties, and the choices available to users regarding their personal information.",
      "Seka is committed to collecting and processing personal information only for legitimate and clearly communicated purposes and to maintaining appropriate safeguards for the information entrusted to the platform.",
      "This document applies to users who access or use Seka's website, application and related services.",
    ],
  },
  {
    id: "information",
    title: "Information We Collect",
    icon: FileText,
    content: [
      "Seka may collect information that users provide directly, information generated through their use of the platform, and limited technical information required to operate and secure the service.",
    ],
    bullets: [
      "Name",
      "Email address",
      "Account identifier",
      "Authentication information",
      "Account creation and account status information",
      "Personal preferences",
      "Wellness goals",
      "Responses provided during onboarding",
      "Information entered into forms",
      "Information provided during conversations with Seka",
      "Feedback and support requests",
      "IP address",
      "Browser type",
      "Device information",
      "Operating system",
      "Login information",
      "Application usage information",
      "Error and diagnostic information",
    ],
  },
  {
    id: "use",
    title: "How We Use Personal Information",
    icon: ShieldCheck,
    content: [
      "Seka may use personal information for the following purposes.",
    ],
    bullets: [
      "Create and manage user accounts",
      "Authenticate users",
      "Provide Seka's features",
      "Personalize the user experience",
      "Maintain user preferences",
      "Respond to user requests",
      "Understand how users interact with Seka",
      "Identify technical issues",
      "Improve product functionality",
      "Improve the user experience",
      "Develop and evaluate new features",
      "Protect user accounts",
      "Detect unauthorized access",
      "Prevent misuse of the service",
      "Investigate security incidents",
      "Maintain the security and integrity of Seka's systems",
      "Send account-related communications",
      "Send service notifications",
      "Send important product updates",
      "Send security notifications",
      "Respond to support requests",
    ],
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    icon: Lock,
    content: [
      "Seka will process personal information in accordance with applicable data protection laws.",
      "Depending on the circumstances, processing may be based on user consent, provision of the requested service, compliance with applicable legal obligations, or legitimate operational and security requirements where permitted by applicable law.",
      "Where consent is relied upon, users will be provided with appropriate information regarding the purpose of processing.",
    ],
  },
  {
    id: "consent",
    title: "Consent and Withdrawal",
    icon: Cookie,
    content: [
      "Where Seka relies on consent to process personal information, consent will be obtained through an appropriate user interface.",
      "Consent should be freely given, specific, informed and unambiguous.",
      "Users should be able to understand what they are consenting to before providing consent.",
      "Seka will maintain appropriate records of consent where required.",
      "Where processing is based on consent, users may withdraw their consent through an appropriate request mechanism.",
      "Withdrawal of consent may affect the availability of certain features where the relevant information is necessary to provide those features.",
      "Withdrawal of consent does not affect processing that was lawfully completed before consent was withdrawn.",
    ],
  },
  {
    id: "sharing",
    title: "Sharing of Personal Information",
    icon: Mail,
    content: [
      "Seka does not sell users' personal information.",
      "Personal information may be shared with third parties only where reasonably necessary for operating the service, complying with legal obligations, maintaining security, or providing a service requested by the user.",
      "Seka expects service providers that process personal information on its behalf to maintain appropriate security and confidentiality measures.",
    ],
    bullets: [
      "Cloud infrastructure providers",
      "Authentication providers",
      "Database providers",
      "AI service providers",
      "Email service providers",
      "Analytics or monitoring providers",
      "Payment service providers, where applicable",
      "Professional advisers or authorities where legally required",
    ],
  },
  {
    id: "third-parties",
    title: "Third Party Services",
    icon: FileText,
    content: [
      "Seka may use third-party technology and service providers to operate parts of the platform.",
      "Examples may include authentication, hosting, cloud infrastructure, artificial intelligence, analytics, communications and payment services.",
      "The specific providers used by Seka may change as the product develops.",
      "Where a third party processes personal information on Seka's behalf, Seka will take appropriate steps to ensure that such processing is consistent with the intended purpose and applicable privacy requirements.",
      "Users should also review the privacy practices of third-party services where their interaction with those services is governed by the third party's own terms.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention and Deletion",
    icon: Trash2,
    content: [
      "Seka will retain personal information only for as long as reasonably necessary to provide the requested service, maintain the user's account, fulfil the purpose for which the information was collected, meet applicable legal or regulatory requirements, resolve disputes, and maintain security and prevent misuse.",
      "When personal information is no longer required for these purposes, Seka will take appropriate steps to delete or anonymize it, subject to applicable legal requirements.",
      "Users may request deletion of their account and applicable personal information.",
      "Deletion may be subject to legal or operational requirements that require certain information to be retained for a limited period.",
      "Where information is retained for such purposes, it will not be used for unrelated purposes.",
      "The technical implementation of deletion will cover applicable production systems containing identifiable user information.",
    ],
  },
  {
    id: "security",
    title: "Data Accuracy and Security",
    icon: ShieldCheck,
    content: [
      "Seka aims to maintain accurate personal information.",
      "Users are responsible for providing accurate information and should update information when it changes.",
      "Where users identify inaccurate personal information maintained by Seka, they may request correction or update of that information.",
      "Seka takes reasonable technical and organizational measures to protect personal information against unauthorized access, unauthorized disclosure, loss, misuse, alteration and destruction.",
      "Security measures may include secure authentication, access controls, encryption where appropriate, secure communication protocols, restricted access to production systems, secure handling of application credentials, and monitoring and security controls.",
      "No method of electronic transmission or storage can be guaranteed to be completely secure. However, Seka will take reasonable measures appropriate to the nature of the information it processes.",
    ],
  },
  {
    id: "rights",
    title: "User Rights and Requests",
    icon: BadgeInfo,
    content: [
      "Subject to applicable law, users may have rights relating to their personal information, including the ability to request information about the processing of their personal data, request correction of inaccurate information, request deletion of personal information where applicable, withdraw consent where consent is the basis for processing, raise a privacy-related grievance, and exercise other rights available under applicable data protection law.",
      "Users can contact Seka regarding privacy questions, personal data requests, correction requests, deletion requests, consent withdrawal, privacy concerns and data-related complaints.",
      "Seka may request reasonable information to verify the identity of the person submitting a privacy request before taking action.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy, Cookies and Changes",
    icon: Cookie,
    content: [
      "Seka's intended minimum age for users is 18.",
      "Seka does not knowingly intend to collect personal information from individuals who are below the applicable minimum age without the legally required authorization.",
      "If Seka becomes aware that personal information has been collected contrary to the applicable age requirements, appropriate steps will be taken to address the information.",
      "Seka may use cookies and similar technologies that are necessary to maintain user sessions, authenticate users, maintain security, remember preferences, understand general usage of the service, and improve the user experience.",
      "Where additional tracking or analytics technologies are used, Seka will provide appropriate information and obtain consent where required by applicable law.",
      "Seka may update this Privacy Policy when there are changes to the services provided, the information collected, the purposes for which information is processed, third-party services, applicable legal requirements, and security and privacy practices.",
      "When material changes are made, Seka will provide an appropriate notice to users, and the updated version will include a revised effective date.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information and Framework",
    icon: Mail,
    content: [
      "For questions or concerns relating to privacy and personal information, contact Seka at founderoffice@ajursinsights.com or visit www.seka.ajursinsights.com.",
      "This Privacy Policy is intended to operate in accordance with applicable laws and regulations governing the protection and processing of personal information in India.",
      "Where applicable law provides users with rights or protections that are more extensive than those described in this document, those legal requirements will apply.",
      "Effective Date: 17 Aug 2026",
      "Last Updated: 17 Aug 2026",
    ],
  },
];

const highlights = [
  "No selling of personal information",
  "Consent can be withdrawn",
  "Deletion requests are supported",
  "Security and minimization first",
];

export function PrivacySecurityPage() {
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
              aria-label="Back to Me"
              className="h-10 w-10 rounded-full px-0"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 rounded-full border border-outline bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Privacy & Security
            </div>

            <div className="h-10 w-10" aria-hidden="true" />
          </header>

          <main className="space-y-8 px-5 py-8 sm:px-6">
            <div className="space-y-4">
              <Typography as="p" variant="micro" className="text-primary">
                Privacy Policy
              </Typography>
              <Typography as="h1" variant="display" className="text-text">
                Privacy & Personal Data
              </Typography>
              <Typography variant="bodyMuted" className="max-w-3xl">
                This page explains how Seka collects, uses, stores, protects, shares, and deletes personal information. It is written to be readable first, while still preserving the full policy language you provided.
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
              {policySections.map((section) => {
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
                            ? "Contact details, governing framework, and policy dates."
                            : "Structured policy text from the document you provided."}
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
