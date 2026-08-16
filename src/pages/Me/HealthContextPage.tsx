import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  FileText,
  Loader2,
  Moon,
  Pill,
  Plus,
  Sparkles,
  Activity,
  Upload,
} from "lucide-react";

import {
  createContextLogRequest,
  createCycleRequest,
  createMedicationRequest,
  getContextRequest,
  uploadReportRequest,
} from "../../api/contextApi";
import { Button } from "../../components/common/Button";
import { Card } from "../../components/common/Card";
import { EmptyState } from "../../components/common/EmptyState";
import { Section } from "../../components/common/Section";
import { Typography } from "../../components/common/Typography";
import type { ContextLogEntry, ContextLogKind, StructuredContext } from "../../types/context";

type LogDraft = {
  title: string;
  value: string;
  amount: string;
  unit: string;
  severity: string;
  notes: string;
  recordedAt: string;
};

type CycleDraft = {
  startDate: string;
  endDate: string;
  status: string;
  cycleLength: string;
  periodLength: string;
  notes: string;
};

type MedicationDraft = {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  notes: string;
  isActive: boolean;
};

type ReportDraft = {
  title: string;
  reportType: string;
  fileUrl: string;
  fileName: string;
  file: File | null;
  notes: string;
  uploadedAt: string;
};

const todayIso = () => new Date().toISOString().slice(0, 10);
const nowIsoLocal = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
};

const logConfig: Record<
  ContextLogKind,
  {
    icon: typeof Activity;
    title: string;
    description: string;
    valueLabel: string;
    valuePlaceholder: string;
    amountLabel?: string;
    amountPlaceholder?: string;
    unitLabel?: string;
    unitPlaceholder?: string;
    severityLabel?: string;
    severityPlaceholder?: string;
    notesLabel: string;
  }
> = {
  symptom: {
    icon: Sparkles,
    title: "Symptoms",
    description: "Capture a symptom you noticed recently.",
    valueLabel: "Symptom",
    valuePlaceholder: "Bloating",
    severityLabel: "Severity",
    severityPlaceholder: "Mild",
    notesLabel: "Notes",
  },
  sleep: {
    icon: Moon,
    title: "Sleep",
    description: "Track one sleep entry from the last week.",
    valueLabel: "Sleep quality",
    valuePlaceholder: "Rested",
    amountLabel: "Hours",
    amountPlaceholder: "7.5",
    unitLabel: "Label",
    unitPlaceholder: "hours",
    notesLabel: "Notes",
  },
  water: {
    icon: Droplets,
    title: "Water",
    description: "Log your hydration for the day.",
    valueLabel: "Hydration note",
    valuePlaceholder: "Finished my water goal",
    amountLabel: "Amount",
    amountPlaceholder: "2.5",
    unitLabel: "Unit",
    unitPlaceholder: "liters",
    notesLabel: "Notes",
  },
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not added";
  return new Date(value).toLocaleDateString();
};

const isImageFile = (fileName: string) => /\.(png|jpe?g)$/i.test(fileName);

const emptyContext = (): StructuredContext => ({
  profile: null,
  onboardingContext: null,
  cycle: null,
  symptoms: [],
  sleep: [],
  water: [],
  medications: [],
  reports: [],
});

const normalizeContext = (value?: Partial<StructuredContext> | null): StructuredContext => ({
  profile: value?.profile ?? null,
  onboardingContext: value?.onboardingContext
    ? {
        answers: value.onboardingContext.answers ?? {},
        summary: Array.isArray(value.onboardingContext.summary) ? value.onboardingContext.summary : [],
      }
    : null,
  cycle: value?.cycle ?? null,
  symptoms: Array.isArray(value?.symptoms) ? value.symptoms : [],
  sleep: Array.isArray(value?.sleep) ? value.sleep : [],
  water: Array.isArray(value?.water) ? value.water : [],
  medications: Array.isArray(value?.medications) ? value.medications : [],
  reports: Array.isArray(value?.reports) ? value.reports : [],
});

const initialLogDraft = (): LogDraft => ({
  title: "",
  value: "",
  amount: "",
  unit: "",
  severity: "",
  notes: "",
  recordedAt: todayIso(),
});

export function HealthContextPage() {
  const navigate = useNavigate();
  const [context, setContext] = useState<StructuredContext>(emptyContext());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logDrafts, setLogDrafts] = useState<Record<ContextLogKind, LogDraft>>({
    symptom: initialLogDraft(),
    sleep: initialLogDraft(),
    water: initialLogDraft(),
  });
  const [cycleDraft, setCycleDraft] = useState<CycleDraft>({
    startDate: todayIso(),
    endDate: "",
    status: "",
    cycleLength: "",
    periodLength: "",
    notes: "",
  });
  const [medicationDraft, setMedicationDraft] = useState<MedicationDraft>({
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    notes: "",
    isActive: true,
  });
  const [reportDraft, setReportDraft] = useState<ReportDraft>({
    title: "",
    reportType: "",
    fileUrl: "",
    fileName: "",
    file: null,
    notes: "",
    uploadedAt: nowIsoLocal(),
  });

  const loadContext = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getContextRequest();
      setContext(normalizeContext(response.context));
    } catch (err) {
      const response = err as { message?: string };
      setError(response.message || "Failed to load health context.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadContext();
  }, []);

  const profileSummary = useMemo(() => {
    if (!context.profile) {
      return [];
    }

    return [
      { label: "Name", value: context.profile.name || "Not added" },
      { label: "Email", value: context.profile.email || "Not added" },
      { label: "Phone", value: context.profile.mobileNumber || "Not added" },
      { label: "Onboarded", value: context.profile.isOnboarded ? "Yes" : "No" },
    ];
  }, [context.profile]);

  const onboardingSummary = useMemo(() => {
    return context.onboardingContext?.summary || [];
  }, [context.onboardingContext]);

  const handleLogDraftChange = (kind: ContextLogKind, field: keyof LogDraft, value: string) => {
    setLogDrafts((current) => ({
      ...current,
      [kind]: {
        ...current[kind],
        [field]: value,
      },
    }));
  };

  const handleLogSave = async (kind: ContextLogKind) => {
    const draft = logDrafts[kind];
    setIsSaving(kind);
    setError("");
    setSuccess("");

    try {
      await createContextLogRequest({
        kind,
        title: draft.title.trim() || undefined,
        value: draft.value.trim() || undefined,
        amount: draft.amount ? Number(draft.amount) : undefined,
        unit: draft.unit.trim() || undefined,
        severity: draft.severity.trim() || undefined,
        notes: draft.notes.trim() || undefined,
        recordedAt: draft.recordedAt ? new Date(draft.recordedAt).toISOString() : undefined,
      });

      setSuccess(`${logConfig[kind].title} saved successfully.`);
      setLogDrafts((current) => ({
        ...current,
        [kind]: initialLogDraft(),
      }));
      await loadContext();
    } catch (err) {
      const response = err as { message?: string };
      setError(response.message || `Failed to save ${logConfig[kind].title.toLowerCase()}.`);
    } finally {
      setIsSaving(null);
    }
  };

  const handleCycleSave = async () => {
    setIsSaving("cycle");
    setError("");
    setSuccess("");

    try {
      await createCycleRequest({
        startDate: cycleDraft.startDate,
        endDate: cycleDraft.endDate || undefined,
        status: cycleDraft.status.trim() || undefined,
        cycleLength: cycleDraft.cycleLength ? Number(cycleDraft.cycleLength) : undefined,
        periodLength: cycleDraft.periodLength ? Number(cycleDraft.periodLength) : undefined,
        notes: cycleDraft.notes.trim() || undefined,
      });

      setSuccess("Cycle saved successfully.");
      setCycleDraft({
        startDate: todayIso(),
        endDate: "",
        status: "",
        cycleLength: "",
        periodLength: "",
        notes: "",
      });
      await loadContext();
    } catch (err) {
      const response = err as { message?: string };
      setError(response.message || "Failed to save cycle.");
    } finally {
      setIsSaving(null);
    }
  };

  const handleMedicationSave = async () => {
    setIsSaving("medication");
    setError("");
    setSuccess("");

    try {
      await createMedicationRequest({
        name: medicationDraft.name.trim(),
        dosage: medicationDraft.dosage.trim() || undefined,
        frequency: medicationDraft.frequency.trim() || undefined,
        isActive: medicationDraft.isActive,
        startDate: medicationDraft.startDate || undefined,
        endDate: medicationDraft.endDate || undefined,
        notes: medicationDraft.notes.trim() || undefined,
      });

      setSuccess("Medication saved successfully.");
      setMedicationDraft({
        name: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
        notes: "",
        isActive: true,
      });
      await loadContext();
    } catch (err) {
      const response = err as { message?: string };
      setError(response.message || "Failed to save medication.");
    } finally {
      setIsSaving(null);
    }
  };

  const handleReportFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setReportDraft((current) => {
      if (current.fileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(current.fileUrl);
      }
      return {
        ...current,
        fileName: file.name,
        file: file,
        fileUrl: URL.createObjectURL(file),
      };
    });
  };

  const handleReportSave = async () => {
    setIsSaving("report");
    setError("");
    setSuccess("");

    try {
      if (!reportDraft.file) {
        throw new Error("Please choose a file to upload.");
      }

      const response = await uploadReportRequest({
        file: reportDraft.file,
        title: reportDraft.title.trim() || undefined,
        reportType: reportDraft.reportType.trim() || undefined,
        notes: reportDraft.notes.trim() || undefined,
        reportDate: reportDraft.uploadedAt || undefined,
      });

      setSuccess(response.message || "Report uploaded. Processing started.");
      if (reportDraft.fileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(reportDraft.fileUrl);
      }
      setReportDraft({
        title: "",
        reportType: "",
        fileUrl: "",
        fileName: "",
        file: null,
        notes: "",
        uploadedAt: nowIsoLocal(),
      });
      await loadContext();
    } catch (err) {
      const response = err as { message?: string };
      setError(response.message || "Failed to save report.");
    } finally {
      setIsSaving(null);
    }
  };

  const renderLogCard = (kind: ContextLogKind) => {
    const config = logConfig[kind];
    const draft = logDrafts[kind];
    const recentItems: ContextLogEntry[] =
      kind === "symptom"
        ? context.symptoms
        : kind === "sleep"
          ? context.sleep
          : context.water;
    const Icon = config.icon;

    return (
      <Card
        key={kind}
        className="flex h-full flex-col space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <Typography as="h2" variant="headline" className="flex items-center gap-2 text-text">
              <Icon className="h-4 w-4 text-primary" />
              {config.title}
            </Typography>
            <Typography as="p" variant="bodyMuted">
              {config.description}
            </Typography>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              {config.valueLabel}
            </span>
            <input
              className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm text-text outline-none focus:border-primary"
              value={draft.value}
              onChange={(event) => handleLogDraftChange(kind, "value", event.target.value)}
              placeholder={config.valuePlaceholder}
            />
          </label>

          {config.amountLabel ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {config.amountLabel}
                </span>
                <input
                  className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm text-text outline-none focus:border-primary"
                  value={draft.amount}
                  onChange={(event) => handleLogDraftChange(kind, "amount", event.target.value)}
                  placeholder={config.amountPlaceholder}
                  inputMode="decimal"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {config.unitLabel || "Unit"}
                </span>
                <input
                  className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm text-text outline-none focus:border-primary"
                  value={draft.unit}
                  onChange={(event) => handleLogDraftChange(kind, "unit", event.target.value)}
                  placeholder={config.unitPlaceholder || ""}
                />
              </label>
            </div>
          ) : null}

          {config.severityLabel ? (
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
                {config.severityLabel}
              </span>
              <input
                className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm text-text outline-none focus:border-primary"
                value={draft.severity}
                onChange={(event) => handleLogDraftChange(kind, "severity", event.target.value)}
                placeholder={config.severityPlaceholder || ""}
              />
            </label>
          ) : null}

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              {config.notesLabel}
            </span>
            <textarea
              className="min-h-24 w-full rounded-2xl border border-outline bg-background px-4 py-3 text-sm text-text outline-none focus:border-primary"
              value={draft.notes}
              onChange={(event) => handleLogDraftChange(kind, "notes", event.target.value)}
              placeholder="Add a quick note"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              Recorded at
            </span>
            <input
              type="date"
              className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm text-text outline-none focus:border-primary"
              value={draft.recordedAt}
              onChange={(event) => handleLogDraftChange(kind, "recordedAt", event.target.value)}
            />
          </label>

          <Button
            onClick={() => handleLogSave(kind)}
            disabled={isSaving === kind}
            leadingIcon={isSaving === kind ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            className="w-full"
          >
            {isSaving === kind ? "Saving..." : `Save ${config.title}`}
          </Button>
        </div>

        <div className="mt-auto space-y-2 border-t border-outline/70 pt-4">
          <Typography as="p" variant="micro" className="text-text-muted">
            Recent entries
          </Typography>
          {recentItems.length ? (
            <div className="space-y-2">
              {recentItems.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-outline/70 bg-surface px-4 py-3">
                  <p className="text-sm font-semibold text-text">
                    {item.value || item.title || "Untitled entry"}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {formatDate(item.recordedAt)} {item.amount ? `• ${item.amount} ${item.unit || ""}` : ""}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="bodyMuted">No recent entries yet.</Typography>
          )}
        </div>
      </Card>
    );
  };

  const hasContext =
    profileSummary.length > 0 ||
    context.cycle !== null ||
    context.symptoms.length > 0 ||
    context.medications.length > 0 ||
    context.reports.length > 0 ||
    context.sleep.length > 0 ||
    context.water.length > 0;

  return (
    <Section className="space-y-8 pb-10">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          aria-label="Back to Me"
          onClick={() => navigate("/me")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline bg-surface text-text-muted transition-all duration-200 hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-outline bg-surface px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          <CalendarDays className="h-4 w-4 text-primary" />
          Health Context
        </div>
      </div>

      <div className="space-y-3">
        <Typography as="p" variant="micro" className="text-primary">
          Context Library
        </Typography>
        <Typography as="h1" variant="display">
          Keep the data SEKA reads up to date
        </Typography>
        <Typography variant="bodyMuted" className="max-w-3xl">
          Add the details that matter most to your care context. The AI pipeline will read the latest saved data from here when building personalized responses.
        </Typography>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50 text-red-700">
          <Typography variant="body">{error}</Typography>
        </Card>
      ) : null}

      {success ? (
        <Card className="border-emerald-200 bg-emerald-50 text-emerald-800">
          <Typography variant="body">{success}</Typography>
        </Card>
      ) : null}

      <Card className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Typography as="h2" variant="title">
              Profile Snapshot
            </Typography>
            <Typography variant="bodyMuted" className="mt-1">
              Your onboarding profile is read directly from your account.
            </Typography>
          </div>
        </div>

        {context.profile ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {profileSummary.map((item) => (
              <div key={item.label} className="rounded-2xl border border-outline/70 bg-surface px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No profile found"
            description="Your profile will appear here after login and onboarding."
          />
        )}
      </Card>

      <Card className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Typography as="h2" variant="title">
              Saved Onboarding Context
            </Typography>
            <Typography variant="bodyMuted" className="mt-1">
              This is the context collected during onboarding and reused by AI and profile tools.
            </Typography>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/me/prepare-for-visit")}
          >
            Review & Edit
          </Button>
        </div>

        {onboardingSummary.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {onboardingSummary.map((item) => (
              <div key={item.label} className="rounded-2xl border border-outline/70 bg-surface px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-text">{item.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No saved onboarding context"
            description="Complete onboarding or open the editor to store these details for future AI use."
          />
        )}
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      <Card className="flex h-full flex-col space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Typography as="h2" variant="headline">
              Cycle
            </Typography>
            <Typography variant="bodyMuted" className="mt-1">
              Store the latest cycle so SEKA can ground recommendations in your current pattern.
            </Typography>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Start date</span>
            <input
              type="date"
              className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
              value={cycleDraft.startDate}
              onChange={(event) => setCycleDraft((current) => ({ ...current, startDate: event.target.value }))}
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">End date</span>
            <input
              type="date"
              className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
              value={cycleDraft.endDate}
              onChange={(event) => setCycleDraft((current) => ({ ...current, endDate: event.target.value }))}
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Status</span>
            <input
              className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
              value={cycleDraft.status}
              onChange={(event) => setCycleDraft((current) => ({ ...current, status: event.target.value }))}
              placeholder="Current cycle"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Cycle length</span>
            <input
              className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
              value={cycleDraft.cycleLength}
              onChange={(event) => setCycleDraft((current) => ({ ...current, cycleLength: event.target.value }))}
              placeholder="28"
              inputMode="numeric"
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Period length</span>
            <input
              className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
              value={cycleDraft.periodLength}
              onChange={(event) => setCycleDraft((current) => ({ ...current, periodLength: event.target.value }))}
              placeholder="5"
              inputMode="numeric"
            />
          </label>
        </div>
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Notes</span>
          <textarea
            className="min-h-24 w-full rounded-2xl border border-outline bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            value={cycleDraft.notes}
            onChange={(event) => setCycleDraft((current) => ({ ...current, notes: event.target.value }))}
            placeholder="Any cycle details to remember"
          />
        </label>

        <div className="mt-auto">
          <Button
            onClick={handleCycleSave}
            disabled={isSaving === "cycle"}
            leadingIcon={isSaving === "cycle" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            className="w-full"
          >
            {isSaving === "cycle" ? "Saving..." : "Save Cycle"}
          </Button>
        </div>

        {context.cycle ? (
          <div className="rounded-2xl border border-outline/70 bg-surface px-4 py-3">
            <p className="text-sm font-semibold text-text">
              Latest cycle: {formatDate(context.cycle.startDate)} - {formatDate(context.cycle.endDate)}
            </p>
            <p className="mt-1 text-xs text-text-muted">
              {context.cycle.status || "No status"} {context.cycle.cycleLength ? `• ${context.cycle.cycleLength} days` : ""}
            </p>
          </div>
        ) : null}
      </Card>

      {renderLogCard("symptom")}
        {renderLogCard("sleep")}
        {renderLogCard("water")}

        <Card className="flex h-full flex-col space-y-4">
          <div>
            <Typography as="h2" variant="headline">
              Medications
            </Typography>
            <Typography variant="bodyMuted" className="mt-1">
              Keep active medications visible to the AI context builder.
            </Typography>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Name</span>
              <input
                className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
                value={medicationDraft.name}
                onChange={(event) => setMedicationDraft((current) => ({ ...current, name: event.target.value }))}
                placeholder="Metformin"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Dosage</span>
              <input
                className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
                value={medicationDraft.dosage}
                onChange={(event) => setMedicationDraft((current) => ({ ...current, dosage: event.target.value }))}
                placeholder="500 mg"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Frequency</span>
              <input
                className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
                value={medicationDraft.frequency}
                onChange={(event) => setMedicationDraft((current) => ({ ...current, frequency: event.target.value }))}
                placeholder="Twice daily"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Start date</span>
              <input
                type="date"
                className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
                value={medicationDraft.startDate}
                onChange={(event) => setMedicationDraft((current) => ({ ...current, startDate: event.target.value }))}
              />
            </label>
          </div>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Notes</span>
            <textarea
              className="min-h-24 w-full rounded-2xl border border-outline bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              value={medicationDraft.notes}
              onChange={(event) => setMedicationDraft((current) => ({ ...current, notes: event.target.value }))}
              placeholder="Any details about timing or side effects"
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={medicationDraft.isActive}
              onChange={(event) => setMedicationDraft((current) => ({ ...current, isActive: event.target.checked }))}
            />
            Active medication
          </label>
          <Button
            onClick={handleMedicationSave}
            disabled={isSaving === "medication"}
            leadingIcon={isSaving === "medication" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pill className="h-4 w-4" />}
          >
            {isSaving === "medication" ? "Saving..." : "Save Medication"}
          </Button>

          <div className="mt-auto space-y-2 border-t border-outline/70 pt-4">
            {context.medications.length ? (
              context.medications.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-outline/70 bg-surface px-4 py-3">
                  <p className="text-sm font-semibold text-text">{item.name}</p>
                  <p className="mt-1 text-xs text-text-muted">
                    {item.dosage || "No dosage"} {item.frequency ? `• ${item.frequency}` : ""}
                  </p>
                </div>
              ))
            ) : (
              <Typography variant="bodyMuted">No active medications yet.</Typography>
            )}
          </div>
        </Card>

        <Card className="flex h-full flex-col space-y-4">
          <div>
            <Typography as="h2" variant="headline">
              Reports
            </Typography>
            <Typography variant="bodyMuted" className="mt-1">
              Add uploaded report metadata so the latest documents are available in context.
            </Typography>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2 md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Title</span>
              <input
                className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
                value={reportDraft.title}
                onChange={(event) => setReportDraft((current) => ({ ...current, title: event.target.value }))}
                placeholder="Hormone panel"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Type</span>
              <input
                className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
                value={reportDraft.reportType}
                onChange={(event) => setReportDraft((current) => ({ ...current, reportType: event.target.value }))}
                placeholder="Lab report"
              />
            </label>
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">File name</span>
              <input
                className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
                value={reportDraft.fileName}
                onChange={(event) => setReportDraft((current) => ({ ...current, fileName: event.target.value }))}
                placeholder="hormone-panel.pdf"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Upload file</span>
              <label className="relative flex h-12 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border border-outline bg-background px-3 transition-colors hover:border-primary/50 focus-within:border-primary">
                <span className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-strong">
                  <Upload className="h-4 w-4" />
                  Choose file
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-text-muted">
                  {reportDraft.fileName || "No file selected"}
                </span>
                {reportDraft.fileUrl && reportDraft.fileUrl.startsWith("blob:") && reportDraft.fileName ? (
                  isImageFile(reportDraft.fileName) ? (
                    <img
                      src={reportDraft.fileUrl}
                      alt="Selected file preview"
                      className="h-8 w-8 shrink-0 rounded-lg border border-outline object-cover"
                    />
                  ) : (
                    <FileText className="h-5 w-5 shrink-0 text-text-muted" />
                  )
                ) : null}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="sr-only"
                  onChange={handleReportFileChange}
                />
              </label>
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Notes</span>
            <textarea
              className="min-h-24 w-full rounded-2xl border border-outline bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              value={reportDraft.notes}
              onChange={(event) => setReportDraft((current) => ({ ...current, notes: event.target.value }))}
              placeholder="What the report is about"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Uploaded at</span>
            <input
              type="datetime-local"
              className="h-12 w-full rounded-2xl border border-outline bg-background px-4 text-sm outline-none focus:border-primary"
              value={reportDraft.uploadedAt}
              onChange={(event) => setReportDraft((current) => ({ ...current, uploadedAt: event.target.value }))}
            />
          </label>

          <Button
            onClick={handleReportSave}
            disabled={isSaving === "report"}
            leadingIcon={isSaving === "report" ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          >
            {isSaving === "report" ? "Saving..." : "Save Report"}
          </Button>

          <div className="mt-auto space-y-2 border-t border-outline/70 pt-4">
            {context.reports.length ? (
              context.reports.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-outline/70 bg-surface px-4 py-3">
                  <p className="text-sm font-semibold text-text">{item.title}</p>
                  <p className="mt-1 text-xs text-text-muted">
                    {item.reportType || "Report"} {item.uploadedAt ? `• ${formatDate(item.uploadedAt)}` : ""}
                  </p>
                </div>
              ))
            ) : (
              <Typography variant="bodyMuted">No reports uploaded yet.</Typography>
            )}
          </div>
        </Card>
      </div>

      {isLoading ? (
        <Card className="flex items-center gap-3 text-text-muted">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Loading your saved context...
        </Card>
      ) : null}

      {!isLoading && !hasContext ? (
        <EmptyState
          title="No health context yet"
          description="Start by adding one symptom, one cycle, or one medication so SEKA has real context to read."
        />
      ) : null}
    </Section>
  );
}
