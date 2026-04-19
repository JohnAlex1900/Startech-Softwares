import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type InputType = "website" | "instagram";
type ActionType = "standard" | "advanced";

type AnalyzeRequest = {
  name: string;
  phone: string;
  business_name: string;
  input_type: InputType;
  input_value: string;
};

type AnalysisResponse = {
  lead: {
    id: string;
    name: string;
    phone: string;
    business_name: string;
    input_type: InputType;
    input_value: string;
    timestamp: string;
  };
  analysis: {
    input_type: InputType;
    input_value: string;
    score: number;
    problems: string[];
    opportunities: string[];
    recommendations: string[];
  };
  report_text: string;
  cta_message: string;
  urgency_message: string;
};

const initialForm: AnalyzeRequest = {
  name: "",
  phone: "",
  business_name: "",
  input_type: "website",
  input_value: "",
};

const progressStages = [
  "Collecting your business details...",
  "Running AI-powered digital presence checks....",
  "Scoring key growth and conversion gaps...",
  "Preparing your professional business audit report...",
];

const analyzerStory = [
  {
    title: "You Share",
    description: "Add your business details and website or Instagram profile in under one minute.",
    chip: "Input",
  },
  {
    title: "We Diagnose",
    description: "We identify trust gaps, conversion blockers, and growth opportunities across your digital presence.",
    chip: "Analysis",
  },
  {
    title: "You Grow",
    description: "Receive a practical roadmap and discuss implementation directly on WhatsApp.",
    chip: "Action",
  },
];

const proofSignals = [
  { value: "< 60 sec", label: "Average completion" },
  { value: "3 layers", label: "Problems, opportunities, recommendations" },
  { value: "Instant", label: "WhatsApp follow-up path" },
];

const mockInsights = [
  { label: "Trust clarity", value: 72, tone: "bg-emerald-500" },
  { label: "Offer visibility", value: 58, tone: "bg-amber-500" },
  { label: "Conversion path", value: 46, tone: "bg-rose-500" },
];

const mockFixes = [
  {
    title: "Homepage message tightening",
    detail: "Clarify your offer in the first 5 seconds so prospects understand your value immediately.",
  },
  {
    title: "Stronger contact pathway",
    detail: "Reduce friction by placing one clear action path from every major section to WhatsApp.",
  },
  {
    title: "Trust signal layering",
    detail: "Add proof snapshots and service outcomes close to key decision points.",
  },
];

const resultCardsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const resultCardItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const scoreBandMeta = (score: number) => {
  if (score >= 8) {
    return {
      label: "Strong Foundation",
      description: "Your presence is performing well. Focus on scaling and compounding wins.",
      ring: "rgb(16 185 129)",
      badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    };
  }

  if (score >= 5) {
    return {
      label: "Growth Opportunity",
      description: "You have momentum, but key improvements can unlock better conversion.",
      ring: "rgb(245 158 11)",
      badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    };
  }

  return {
    label: "Urgent Attention",
    description: "Major trust and conversion gaps are limiting your customer acquisition.",
    ring: "rgb(239 68 68)",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  };
};

const whatsappNumber = "254711632577";

const buildApiUrl = (base: string, path: string) => {
  const cleanedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const cleanedPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanedBase}${cleanedPath}`;
};

const BusinessAnalyzerPage: React.FC = () => {
  const apiBaseUrl = useMemo(() => {
    const configured = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
    if (!configured) {
      return "/api";
    }

    const browserHost = window.location.hostname;
    const isLocalBrowserHost = browserHost === "localhost" || browserHost === "127.0.0.1";
    const pointsToLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configured);

    if (pointsToLocalhost && !isLocalBrowserHost) {
      return "/api";
    }

    return configured;
  }, []);

  const [form, setForm] = useState<AnalyzeRequest>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState("");
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState<number[]>([]);

  const stageIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (stageIntervalRef.current) window.clearInterval(stageIntervalRef.current);
    };
  }, []);

  const handleFieldChange = (field: keyof AnalyzeRequest, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetTimers = () => {
    if (stageIntervalRef.current) {
      window.clearInterval(stageIntervalRef.current);
      stageIntervalRef.current = null;
    }
  };

  const startProgressAnimation = () => {
    setStageIndex(0);
    stageIntervalRef.current = window.setInterval(() => {
      setStageIndex((prev) => (prev + 1 < progressStages.length ? prev + 1 : prev));
    }, 900);
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.business_name.trim() || !form.input_value.trim()) {
      setError("Please fill in all fields before submitting your analysis request.");
      return false;
    }

    if (form.input_type === "website") {
      const validWebsite = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(form.input_value.trim());
      if (!validWebsite) {
        setError("Please enter a valid website URL (example: yourbusiness.com).");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetTimers();
    setError("");
    setResult(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    startProgressAnimation();

    try {
      const response = await fetch(buildApiUrl(apiBaseUrl, "/analyze"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          name: form.name.trim(),
          phone: form.phone.trim(),
          business_name: form.business_name.trim(),
          input_value: form.input_value.trim(),
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const payload = contentType.includes("application/json") ? await response.json() : null;

      if (!response.ok) {
        const message = typeof payload?.detail === "string" ? payload.detail : "Analysis request failed. Please try again.";
        throw new Error(message);
      }

      setResult(payload as AnalysisResponse);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unexpected error while analyzing your business.");
    } finally {
      setSubmitting(false);
      if (stageIntervalRef.current) {
        window.clearInterval(stageIntervalRef.current);
        stageIntervalRef.current = null;
      }
    }
  };

  const progress = Math.round(((stageIndex + 1) / progressStages.length) * 100);

  const scoreBand = useMemo(() => {
    if (!result) return null;
    return scoreBandMeta(result.analysis.score);
  }, [result]);

  const impactMetrics = useMemo(() => {
    if (!result) return [] as Array<{ label: string; value: number; tone: string }>;

    const score = result.analysis.score;
    const conversionReadiness = Math.min(100, Math.round(score * 10 + 12));
    const trustClarity = Math.min(100, Math.round(score * 9 + 16));
    const urgencyGap = Math.max(8, 100 - Math.round(score * 9));

    return [
      {
        label: "Conversion readiness",
          value: conversionReadiness,
        tone: "text-emerald-700 dark:text-emerald-300",
      },
      {
        label: "Trust clarity",
          value: trustClarity,
        tone: "text-blue-700 dark:text-blue-300",
      },
      {
        label: "Lost-opportunity pressure",
          value: urgencyGap,
        tone: "text-rose-700 dark:text-rose-300",
      },
    ];
  }, [result]);

  useEffect(() => {
    if (!result || impactMetrics.length === 0) {
      setAnimatedScore(0);
      setAnimatedMetrics([]);
      return;
    }

    const targetScore = result.analysis.score;
    const targetMetrics = impactMetrics.map((item) => item.value);
    const durationMs = 750;
    const start = performance.now();
    let frameId = 0;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedScore(targetScore * eased);
      setAnimatedMetrics(targetMetrics.map((value) => value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [result, impactMetrics]);

  const standardAuditWhatsappUrl = useMemo(() => {
    if (!result) return "";
    const auditMessage = [
      "Hello, I completed my business audit and would like your help improving my business.",
      `Name: ${result.lead.name}`,
      `Business: ${result.lead.business_name}`,
      `Input Type: ${result.analysis.input_type}`,
      `Input Value: ${result.analysis.input_value}`,
      `Audit Score: ${result.analysis.score}/10`,
    ].join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(auditMessage)}`;
  }, [result]);

  const advancedAuditWhatsappUrl = useMemo(() => {
    if (!result) return "";
    const advancedMessage = [
      "Hello, I want the advanced paid business analysis package.",
      `Name: ${result.lead.name}`,
      `Business: ${result.lead.business_name}`,
      `Current Audit Score: ${result.analysis.score}/10`,
      "Please share pricing and next steps.",
    ].join("\n");

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(advancedMessage)}`;
  }, [result]);

  const openWhatsappWithTracking = (actionType: ActionType, whatsappUrl: string) => async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!result) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const trackingPayload = {
      lead_id: result.lead.id,
      action_type: actionType,
      business_name: result.lead.business_name,
      score: result.analysis.score,
    };

    try {
      await Promise.race([
        fetch(buildApiUrl(apiBaseUrl, "/lead-action"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trackingPayload),
          keepalive: true,
        }),
        new Promise((resolve) => window.setTimeout(resolve, 700)),
      ]);
    } catch {
      // WhatsApp follow-up should continue even if tracking fails.
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 py-14 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-5xl"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-950/5 dark:border-slate-700 dark:bg-slate-900/70 md:p-9">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary-600 dark:text-secondary-400">
                  AI Business Analyzer
                </p>
                <h1 className="mt-4 text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
                  See Your Growth Story Before Your Competitors Do
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  This audit turns your digital presence into a simple visual story: where you are losing trust now, where you can win faster,
                  and what to fix first for better enquiries.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Full Name
                    </label>
                    <input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                      disabled={submitting}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => handleFieldChange("phone", e.target.value)}
                      disabled={submitting}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      placeholder="+254..."
                    />
                  </div>

                  <div>
                    <label htmlFor="business_name" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Business Name
                    </label>
                    <input
                      id="business_name"
                      value={form.business_name}
                      onChange={(e) => handleFieldChange("business_name", e.target.value)}
                      disabled={submitting}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      placeholder="Acme Traders"
                    />
                  </div>

                  <div>
                    <label htmlFor="input_type" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Analyze Using
                    </label>
                    <select
                      id="input_type"
                      value={form.input_type}
                      onChange={(e) => handleFieldChange("input_type", e.target.value as InputType)}
                      disabled={submitting}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    >
                      <option value="website">Website</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="input_value" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      {form.input_type === "website" ? "Website URL" : "Instagram Handle"}
                    </label>
                    <input
                      id="input_value"
                      value={form.input_value}
                      onChange={(e) => handleFieldChange("input_value", e.target.value)}
                      disabled={submitting}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      placeholder={form.input_type === "website" ? "example.com" : "@yourbusiness"}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-primary-900 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
                    >
                      {submitting ? "Analyzing Your Business..." : "Run AI Analysis"}
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-700/60 dark:bg-red-950/30 dark:text-red-300">
                    {error}
                  </div>
                )}
              </div>

              <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/40">
                <div className="text-xs font-black uppercase tracking-[0.24em] text-secondary-700 dark:text-secondary-300">
                  What Happens Next
                </div>
                <div className="mt-4 space-y-3">
                  {analyzerStory.map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/70">
                      <div className="inline-flex rounded-full bg-secondary-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-secondary-700 dark:bg-secondary-500/20 dark:text-secondary-300">
                        {item.chip}
                      </div>
                      <h3 className="mt-2 text-base font-black text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {proofSignals.map((signal) => (
                    <div key={signal.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900/70">
                      <div className="text-lg font-black text-primary-900 dark:text-secondary-300">{signal.value}</div>
                      <div className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{signal.label}</div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>

          <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-950/5 dark:border-slate-700 dark:bg-slate-900/70 md:p-9">
            {submitting ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 animate-spin rounded-full border-2 border-secondary-500 border-t-transparent" aria-hidden="true" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{progressStages[stageIndex]}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {progress}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-full rounded-full bg-secondary-500 transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ) : result ? (
              <div>
                <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/50 md:grid-cols-[auto_1fr]">
                  <div
                    className="relative h-24 w-24 rounded-full"
                    style={{
                        background: `conic-gradient(${scoreBand?.ring ?? "rgb(14 116 144)"} 0% ${Math.min(100, Math.round(animatedScore * 10))}%, rgb(226 232 240) ${Math.min(100, Math.round(animatedScore * 10))}% 100%)`,
                    }}
                  >
                    <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white text-center dark:bg-slate-900">
                      <div>
                          <div className="text-2xl font-black text-slate-900 dark:text-white">{animatedScore.toFixed(1)}</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Score / 10</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white">Audit Summary</h2>
                      <span className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${scoreBand?.badge ?? "bg-secondary-100 text-secondary-800"}`}>
                        {scoreBand?.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {scoreBand?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {impactMetrics.map((item, index) => (
                    <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/50">
                      <div className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">{item.label}</div>
                        <div className={`mt-2 text-2xl font-black ${item.tone}`}>{`${Math.round(animatedMetrics[index] ?? 0)}%`}</div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-200">{result.report_text}</p>

                <motion.div
                  className="mt-6 grid gap-5 md:grid-cols-3"
                  variants={resultCardsContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={resultCardItem} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-rose-700 dark:text-rose-300">Key Problems</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {result.analysis.problems.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={resultCardItem} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">Opportunities</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {result.analysis.opportunities.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={resultCardItem} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">Recommendations</h3>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {result.analysis.recommendations.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>

                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900 dark:border-amber-600/40 dark:bg-amber-900/20 dark:text-amber-200">
                  {result.urgency_message}
                </div>

                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 dark:border-emerald-700/50 dark:bg-emerald-900/20 dark:text-emerald-200">
                  {result.cta_message}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={standardAuditWhatsappUrl}
                    onClick={openWhatsappWithTracking("standard", standardAuditWhatsappUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-primary-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
                  >
                    Discuss This Audit on WhatsApp
                  </a>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/50">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Need a Deeper Search Analysis?</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    We also offer an advanced paid analysis with deeper competitor search review, audience insights, and a more detailed growth roadmap tailored to your business.
                  </p>
                  <a
                    href={advancedAuditWhatsappUrl}
                    onClick={openWhatsappWithTracking("advanced", advancedAuditWhatsappUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-xl border border-primary-900 px-5 py-3 text-sm font-bold text-primary-900 transition-colors hover:bg-primary-50 dark:border-secondary-500 dark:text-secondary-300 dark:hover:bg-slate-800"
                  >
                    Request Advanced Paid Analysis
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">Your AI audit will appear here</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Complete the form above to get a concise, professional analysis with clear next actions for growth.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/60">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300">Preview Score Snapshot</div>
                    <div className="mt-5 flex items-center gap-5">
                      <div
                        className="relative h-28 w-28 rounded-full"
                        style={{
                          background: "conic-gradient(rgb(14 116 144) 0% 66%, rgb(226 232 240) 66% 100%)",
                        }}
                      >
                        <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white text-center dark:bg-slate-900">
                          <div>
                            <div className="text-2xl font-black text-slate-900 dark:text-white">6.6</div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Sample score</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">Live-style outcome preview</div>
                        <div className="text-slate-600 dark:text-slate-300">You will get visual diagnosis + practical action priorities.</div>
                        <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                          No guesswork
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {mockInsights.map((item) => (
                        <div key={item.label}>
                          <div className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                            <span>{item.label}</span>
                            <span>{item.value}%</span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                            <div className={`h-full rounded-full ${item.tone}`} style={{ width: `${item.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/60">
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-secondary-700 dark:text-secondary-300">Example Growth Recommendations</div>
                    <div className="mt-4 space-y-3">
                      {mockFixes.map((item, index) => (
                        <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/50">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-900 text-xs font-black text-white dark:bg-secondary-500 dark:text-primary-950">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-sm font-black text-slate-900 dark:text-white">{item.title}</h3>
                              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessAnalyzerPage;
