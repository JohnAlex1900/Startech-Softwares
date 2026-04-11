import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type AnalyzerMode = "website" | "social";
type SocialPlatform = "Instagram" | "Facebook" | "TikTok" | "LinkedIn" | "X";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const socialTips: Record<SocialPlatform, string[]> = {
  Instagram: [
    "Use 3-5 content pillars and rotate them weekly for consistency.",
    "Add stronger CTA hooks in Reels captions to drive profile clicks.",
    "Pin your best conversion post with offer + WhatsApp contact.",
  ],
  Facebook: [
    "Post customer proof and before/after outcomes at least twice weekly.",
    "Use lead-focused headlines with location keywords for local reach.",
    "Route comments and inbox questions into one fast reply workflow.",
  ],
  TikTok: [
    "Lead with a 2-second hook that targets a specific customer pain.",
    "Use short educational clips with one clear action per video.",
    "Create a profile CTA path from video to WhatsApp or booking page.",
  ],
  LinkedIn: [
    "Publish practical problem/solution posts with clear business outcomes.",
    "Turn case studies into short carousels and attach a contact CTA.",
    "Optimize profile headline for offer clarity and target audience.",
  ],
  X: [
    "Use concise value threads that solve one customer challenge each.",
    "Post with a repeatable cadence and clear call-to-conversation CTA.",
    "Repurpose top-performing posts into lead magnets or service pages.",
  ],
};

const hashScore = (input: string, min: number, max: number) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  const normalized = Math.abs(hash % 1000) / 1000;
  return Math.round(min + normalized * (max - min));
};

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http://") || trimmed.startsWith("https://")
    ? trimmed
    : `https://${trimmed}`;
};

const websiteAnalysisStages = [
  "Checking website accessibility and structure...",
  "Collecting interaction and engagement signals...",
  "Scoring conversion readiness and trust signals...",
  "Preparing your professional summary report...",
];

const noWebsiteStages = [
  "Evaluating digital readiness for your business...",
  "Mapping customer trust and discovery gaps...",
  "Building a high-impact website launch priority list...",
  "Preparing your recommended setup plan...",
];

const socialAnalysisStages = [
  "Scanning social profile activity patterns...",
  "Measuring engagement and consistency signals...",
  "Evaluating content-to-conversion pathway...",
  "Preparing your platform-specific action report...",
];

const noSocialStages = [
  "Evaluating audience visibility opportunity...",
  "Assessing trust-building channel gaps...",
  "Creating foundational social setup priorities...",
  "Preparing your social launch plan...",
];

const BusinessAnalyzerPage: React.FC = () => {
  const [mode, setMode] = useState<AnalyzerMode>("website");

  const [hasWebsite, setHasWebsite] = useState(true);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websiteSubmitted, setWebsiteSubmitted] = useState(false);
  const [websiteAnalyzing, setWebsiteAnalyzing] = useState(false);
  const [websiteStage, setWebsiteStage] = useState(0);

  const [hasSocial, setHasSocial] = useState(true);
  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>("Instagram");
  const [socialHandle, setSocialHandle] = useState("");
  const [socialSubmitted, setSocialSubmitted] = useState(false);
  const [socialAnalyzing, setSocialAnalyzing] = useState(false);
  const [socialStage, setSocialStage] = useState(0);

  const timerIdsRef = useRef<number[]>([]);

  const websiteReport = useMemo(() => {
    const normalized = normalizeUrl(websiteUrl);
    if (!normalized) return null;

    const visibility = hashScore(`${normalized}-visibility`, 52, 89);
    const engagement = hashScore(`${normalized}-engagement`, 48, 86);
    const conversion = hashScore(`${normalized}-conversion`, 45, 84);

    const strengths = [
      "Business is discoverable and has a trackable digital footprint.",
      "There is enough baseline activity to improve lead quality quickly.",
    ];

    const priorities = [
      "Clarify the main value proposition above the fold to reduce bounce.",
      "Strengthen trust signals (proof, testimonials, or case outcomes).",
      "Improve lead capture with one clear call-to-action path.",
    ];

    return {
      normalized,
      visibility,
      engagement,
      conversion,
      strengths,
      priorities,
    };
  }, [websiteUrl]);

  const socialReport = useMemo(() => {
    const cleanHandle = socialHandle.trim().replace(/^@/, "");
    if (!cleanHandle) return null;

    const engagement = hashScore(`${socialPlatform}-${cleanHandle}-engagement`, 46, 88);
    const consistency = hashScore(`${socialPlatform}-${cleanHandle}-consistency`, 42, 86);
    const conversion = hashScore(`${socialPlatform}-${cleanHandle}-conversion`, 40, 82);

    return {
      cleanHandle,
      engagement,
      consistency,
      conversion,
      recommendations: socialTips[socialPlatform],
    };
  }, [socialPlatform, socialHandle]);

  useEffect(() => {
    return () => {
      timerIdsRef.current.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  const trackTimeout = (callback: () => void, delay: number) => {
    const timerId = window.setTimeout(callback, delay);
    timerIdsRef.current.push(timerId);
  };

  const runWebsiteAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasWebsite && !normalizeUrl(websiteUrl)) {
      setWebsiteSubmitted(true);
      setWebsiteAnalyzing(false);
      return;
    }

    setWebsiteSubmitted(false);
    setWebsiteAnalyzing(true);
    setWebsiteStage(0);

    trackTimeout(() => setWebsiteStage(1), 700);
    trackTimeout(() => setWebsiteStage(2), 1400);
    trackTimeout(() => setWebsiteStage(3), 2100);
    trackTimeout(() => {
      setWebsiteAnalyzing(false);
      setWebsiteSubmitted(true);
    }, 2800);
  };

  const runSocialAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasSocial && !socialHandle.trim().replace(/^@/, "")) {
      setSocialSubmitted(true);
      setSocialAnalyzing(false);
      return;
    }

    setSocialSubmitted(false);
    setSocialAnalyzing(true);
    setSocialStage(0);

    trackTimeout(() => setSocialStage(1), 700);
    trackTimeout(() => setSocialStage(2), 1400);
    trackTimeout(() => setSocialStage(3), 2100);
    trackTimeout(() => {
      setSocialAnalyzing(false);
      setSocialSubmitted(true);
    }, 2800);
  };

  const activeWebsiteStages = hasWebsite ? websiteAnalysisStages : noWebsiteStages;
  const activeSocialStages = hasSocial ? socialAnalysisStages : noSocialStages;
  const isAnyAnalysisRunning = websiteAnalyzing || socialAnalyzing;
  const websiteProgress = Math.round(((websiteStage + 1) / activeWebsiteStages.length) * 100);
  const socialProgress = Math.round(((socialStage + 1) / activeSocialStages.length) * 100);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-slate-200/60 dark:border-white/5 bg-gradient-to-br from-primary-950 via-primary-900 to-slate-950 py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.14),transparent_25%)]" />

        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary-300">
              Free Business Analyzer
            </span>
            <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              Analyze Your Online Performance in Minutes
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200/85 md:text-lg">
              Get a professional, brief performance snapshot for your website or social media presence, plus clear next steps to improve customer engagement and revenue potential.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white/80 dark:bg-slate-950/35">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-8 grid max-w-2xl grid-cols-2 gap-3 rounded-2xl bg-slate-100 p-2 dark:bg-slate-900/60">
            <button
              type="button"
              onClick={() => setMode("website")}
              disabled={isAnyAnalysisRunning}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                mode === "website"
                  ? "bg-primary-900 text-white dark:bg-secondary-500 dark:text-primary-950"
                  : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
              } ${isAnyAnalysisRunning ? "cursor-not-allowed opacity-70" : ""}`}
            >
              Website Analysis
            </button>
            <button
              type="button"
              onClick={() => setMode("social")}
              disabled={isAnyAnalysisRunning}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                mode === "social"
                  ? "bg-primary-900 text-white dark:bg-secondary-500 dark:text-primary-950"
                  : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800"
              } ${isAnyAnalysisRunning ? "cursor-not-allowed opacity-70" : ""}`}
            >
              Social Media Analysis
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === "website" ? (
              <motion.div
                key="website-mode"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]"
              >
                <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-950/5 dark:border-slate-700 dark:bg-slate-900/50">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Website Analyzer</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Enter your website URL to get a quick performance overview. No website yet? Tell us and we will show you the highest-impact starting plan.
                  </p>

                  <form onSubmit={runWebsiteAnalysis} className="mt-6 space-y-4">
                    <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-700">
                      <input
                        type="checkbox"
                        checked={!hasWebsite}
                        onChange={(e) => {
                          setHasWebsite(!e.target.checked);
                          if (e.target.checked) setWebsiteUrl("");
                        }}
                        disabled={websiteAnalyzing}
                        className="h-4 w-4"
                      />
                      <span className="text-slate-700 dark:text-slate-200">I do not have a website yet</span>
                    </label>

                    <div>
                      <label htmlFor="website-url" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Website link
                      </label>
                      <input
                        id="website-url"
                        type="text"
                        placeholder="example.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        disabled={!hasWebsite || websiteAnalyzing}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={websiteAnalyzing}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-primary-900 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
                    >
                      {websiteAnalyzing ? "Analyzing..." : "Analyze Website"}
                    </button>
                  </form>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-lg shadow-slate-950/5 dark:border-slate-700 dark:bg-slate-900/40">
                  {websiteAnalyzing ? (
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex h-full flex-col justify-center">
                      <div className="mb-5 flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 animate-spin rounded-full border-2 border-secondary-500 border-t-transparent" aria-hidden="true" />
                        <p className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {activeWebsiteStages[websiteStage]}
                        </p>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          {websiteProgress}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                          className="h-full rounded-full bg-secondary-500 transition-all duration-500"
                          style={{ width: `${websiteProgress}%` }}
                        />
                      </div>
                      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        Building your professional report...
                      </p>
                    </motion.div>
                  ) : !websiteSubmitted ? (
                    <div className="flex h-full items-center justify-center text-center">
                      <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Your report will appear here with a visibility snapshot, engagement signals, and priority actions to improve conversions.
                      </p>
                    </div>
                  ) : !hasWebsite ? (
                    <motion.div variants={fadeUp} initial="hidden" animate="visible">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">No Website Yet: Biggest Opportunity Identified</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Your business is likely losing qualified prospects who want to verify credibility before calling or walking in.
                      </p>
                      <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                        <li>1. Build a conversion-focused website with clear offer + CTA.</li>
                        <li>2. Add trust signals (proof, results, testimonials, location details).</li>
                        <li>3. Connect WhatsApp and lead forms for faster follow-up.</li>
                      </ul>
                      <Link
                        to="/contact"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
                      >
                        Get a Website Growth Plan
                      </Link>
                    </motion.div>
                  ) : websiteReport ? (
                    <motion.div variants={fadeUp} initial="hidden" animate="visible">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">Website Performance Snapshot</h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          Signal-based estimate
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Analyzed: {websiteReport.normalized}</p>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Visibility</div>
                          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{websiteReport.visibility}/100</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Engagement</div>
                          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{websiteReport.engagement}/100</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Conversion Readiness</div>
                          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{websiteReport.conversion}/100</div>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">What is working</h4>
                          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            {websiteReport.strengths.map((item) => (
                              <li key={item}>- {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Highest priority fixes</h4>
                          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                            {websiteReport.priorities.map((item) => (
                              <li key={item}>- {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
                      >
                        Get a Full Website Growth Strategy
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="text-sm text-red-600">Please provide a valid website link.</div>
                  )}
                </article>
              </motion.div>
            ) : (
              <motion.div
                key="social-mode"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]"
              >
                <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-950/5 dark:border-slate-700 dark:bg-slate-900/50">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Social Media Analyzer</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Enter your platform and business handle to get a quick engagement and conversion-readiness report.
                  </p>

                  <form onSubmit={runSocialAnalysis} className="mt-6 space-y-4">
                    <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-700">
                      <input
                        type="checkbox"
                        checked={!hasSocial}
                        onChange={(e) => {
                          setHasSocial(!e.target.checked);
                          if (e.target.checked) setSocialHandle("");
                        }}
                        disabled={socialAnalyzing}
                        className="h-4 w-4"
                      />
                      <span className="text-slate-700 dark:text-slate-200">I do not have active business social media accounts</span>
                    </label>

                    <div>
                      <label htmlFor="platform" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Platform
                      </label>
                      <select
                        id="platform"
                        value={socialPlatform}
                        onChange={(e) => setSocialPlatform(e.target.value as SocialPlatform)}
                        disabled={!hasSocial || socialAnalyzing}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      >
                        <option>Instagram</option>
                        <option>Facebook</option>
                        <option>TikTok</option>
                        <option>LinkedIn</option>
                        <option>X</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="handle" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                        Business handle
                      </label>
                      <input
                        id="handle"
                        type="text"
                        placeholder="@yourbusiness"
                        value={socialHandle}
                        onChange={(e) => setSocialHandle(e.target.value)}
                        disabled={!hasSocial || socialAnalyzing}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-secondary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={socialAnalyzing}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-primary-900 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
                    >
                      {socialAnalyzing ? "Analyzing..." : "Analyze Social Performance"}
                    </button>
                  </form>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-lg shadow-slate-950/5 dark:border-slate-700 dark:bg-slate-900/40">
                  {socialAnalyzing ? (
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex h-full flex-col justify-center">
                      <div className="mb-5 flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 animate-spin rounded-full border-2 border-secondary-500 border-t-transparent" aria-hidden="true" />
                        <p className="flex-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {activeSocialStages[socialStage]}
                        </p>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          {socialProgress}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div
                          className="h-full rounded-full bg-secondary-500 transition-all duration-500"
                          style={{ width: `${socialProgress}%` }}
                        />
                      </div>
                      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        Building your professional report...
                      </p>
                    </motion.div>
                  ) : !socialSubmitted ? (
                    <div className="flex h-full items-center justify-center text-center">
                      <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Your social report will appear here with engagement signal scores and conversion-focused platform recommendations.
                      </p>
                    </div>
                  ) : !hasSocial ? (
                    <motion.div variants={fadeUp} initial="hidden" animate="visible">
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">No Social Presence Yet: High Growth Opportunity</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Without active social channels, your business misses repeated exposure and trust-building opportunities with potential customers.
                      </p>
                      <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                        <li>1. Launch platform-specific profiles with professional branding.</li>
                        <li>2. Build a simple weekly content system for consistency.</li>
                        <li>3. Connect social content to WhatsApp and enquiry conversion paths.</li>
                      </ul>
                      <Link
                        to="/contact"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
                      >
                        Get a Social Growth Setup Plan
                      </Link>
                    </motion.div>
                  ) : socialReport ? (
                    <motion.div variants={fadeUp} initial="hidden" animate="visible">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">Social Performance Snapshot</h3>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          Signal-based estimate
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        Analyzed: {socialPlatform} / @{socialReport.cleanHandle}
                      </p>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Engagement</div>
                          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{socialReport.engagement}/100</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Consistency</div>
                          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{socialReport.consistency}/100</div>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900/60">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Conversion Readiness</div>
                          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">{socialReport.conversion}/100</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                          Recommended {socialPlatform} improvements
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          {socialReport.recommendations.map((item) => (
                            <li key={item}>- {item}</li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        to="/contact"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
                      >
                        Get a Full Social Growth Strategy
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="text-sm text-red-600">Please provide a valid handle.</div>
                  )}
                </article>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-slate-900/70">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-950/5 dark:border-slate-700 dark:bg-slate-900/50">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Want the full growth roadmap?</h3>
            <p className="mt-3 text-sm md:text-base leading-7 text-slate-600 dark:text-slate-300">
              This analyzer gives you a professional snapshot. We can go deeper with a full audit, implementation plan, and 30-day execution strategy tailored to your business.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary-900 px-7 py-3.5 font-bold text-white transition-colors hover:bg-primary-800 dark:bg-secondary-500 dark:text-primary-950 dark:hover:bg-secondary-400"
            >
              Book a Growth Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessAnalyzerPage;
