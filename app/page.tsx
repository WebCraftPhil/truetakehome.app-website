"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";

type Results = {
  fileName: string;
  sales: number;
  payout: number;
  costs: number;
};

const demoResults: Results = {
  fileName: "Etsy CSV",
  sales: 8420,
  payout: 6713,
  costs: 3107,
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function parseMoney(value: string) {
  const parsed = Number(value.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseCsv(text: string, fileName: string): Results {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("That file doesn't look like a valid CSV export.");
  }

  const headers = lines[0].split(",").map((header) => header.toLowerCase());
  const rows = lines.slice(1).map((line) => line.split(","));

  const findTotal = (terms: string[]) => {
    const indexes = headers
      .map((header, index) => ({ header, index }))
      .filter(({ header }) => terms.some((term) => header.includes(term)))
      .map(({ index }) => index);

    return rows.reduce(
      (sum, row) => sum + indexes.reduce((rowSum, index) => rowSum + parseMoney(row[index] ?? ""), 0),
      0,
    );
  };

  const sales = findTotal(["sale", "gross", "revenue", "amount", "total"]) || demoResults.sales;
  const payout = findTotal(["payout", "net", "deposit", "payment"]) || Math.round(sales * 0.8);
  const costs =
    findTotal(["cost", "fee", "ad", "shipping", "subscription", "postage"]) ||
    Math.max(0, sales - payout);

  return { fileName, sales: Math.abs(sales), payout: Math.abs(payout), costs: Math.abs(costs) };
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-white/10 bg-white/[0.045] shadow-[0_24px_80px_rgba(0,0,0,0.22)] ${className}`}
    >
      {children}
    </div>
  );
}

function LogoLink() {
  return (
    <Link className="flex items-center gap-3" href="/">
      <Image src="/logo.png" alt="TrueTakeHome" width={40} height={40} priority className="rounded-md" />
      <span className="text-base font-black">TrueTakeHome</span>
    </Link>
  );
}

function ImportErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
      {message}
    </div>
  );
}

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </section>
  );
}

function PrimaryCta({
  children,
  onClick,
  fullWidth = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-md bg-[#24d982] px-5 text-sm font-black text-[#06131f] shadow-[0_16px_40px_rgba(36,217,130,0.22)] transition hover:bg-[#5ff0a5] ${fullWidth ? "w-full" : ""}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function DemoCards() {
  return (
    <section className="border-y border-white/8 bg-[#071827]">
      <Section className="py-5">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Sales", "$8,420"],
            ["Payout", "$6,713"],
            ["Costs", "$3,107"],
          ].map(([label, value]) => (
            <Card className="p-4" key={label}>
              <p className="text-sm font-bold text-white/52">{label}</p>
              <p className="mt-2 text-3xl font-black text-white">{value}</p>
            </Card>
          ))}
        </div>
      </Section>
    </section>
  );
}

function DemoPanel() {
  const rows = [
    ["Etsy sales", "$8,420"],
    ["Etsy payout", "$6,713"],
    ["Total costs", "$3,107"],
  ];

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#24d982]" />
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/58">
            Results preview
          </span>
        </div>
        <span className="rounded-full bg-[#24d982]/12 px-3 py-1 text-xs font-bold text-[#77f7b7]">
          Local
        </span>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        {rows.map(([label, value]) => (
          <div
            className="grid grid-cols-[1fr_auto] gap-3 rounded-md border border-white/8 bg-[#081a29] p-3"
            key={label}
          >
            <p className="text-sm font-bold text-white">{label}</p>
            <p className="text-sm font-black text-white">{value}</p>
          </div>
        ))}
        <p className="pt-2 text-xs font-black uppercase tracking-[0.14em] text-[#77f7b7]">
          Unlock to see your real numbers
        </p>
        {["Real take-home", "Profit margin"].map((label) => (
          <div
            className="relative overflow-hidden rounded-md border border-[#24d982]/30 bg-[#092216] p-4"
            key={label}
          >
            <div className="flex items-center justify-between gap-4 blur-[5px]">
              <p className="text-sm font-bold text-[#77f7b7]">{label}</p>
              <p className="text-2xl font-black text-white">{label === "Real take-home" ? "$3,606" : "42.8%"}</p>
            </div>
            <div className="absolute inset-0 bg-[#06131f]/20" />
          </div>
        ))}
      </div>
    </Card>
  );
}

function ResultsScreen({
  results,
  onUpload,
  errorMessage,
}: {
  results: Results;
  onUpload: () => void;
  errorMessage: string | null;
}) {
  const lockedProfit = Math.max(0, results.payout - results.costs);
  const lockedMargin = results.sales > 0 ? Math.round((lockedProfit / results.sales) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#06131f] text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center px-5 py-5 sm:px-6 lg:px-8">
        <LogoLink />
      </header>

      <Section className="max-w-4xl pt-8">
        {errorMessage ? (
          <div className="mb-6">
            <ImportErrorBanner message={errorMessage} />
          </div>
        ) : null}
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#77f7b7]">
          {results.fileName} imported
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          Your Etsy payout is not your profit.
        </h1>

        <Card className="mt-8 overflow-hidden">
          <div className="space-y-3 p-4 sm:p-6">
            {[
              ["Etsy sales", money(results.sales)],
              ["Etsy payout", money(results.payout)],
              ["Total costs", money(results.costs)],
            ].map(([label, value]) => (
              <div className="grid grid-cols-[1fr_auto] gap-3 rounded-md bg-[#081a29] p-4" key={label}>
                <p className="font-bold text-white/72">{label}</p>
                <p className="font-black text-white">{value}</p>
              </div>
            ))}

            <div className="pt-3">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#77f7b7]">
                Unlock to see your real numbers
              </p>
              {[
                ["Real take-home", money(lockedProfit)],
                ["Profit margin", `${lockedMargin}%`],
              ].map(([label, value]) => (
                <div
                  className="relative mb-3 overflow-hidden rounded-md border border-[#24d982]/30 bg-[#092216] p-4 last:mb-0"
                  key={label}
                >
                  <div className="flex items-center justify-between gap-4 blur-[6px]">
                    <p className="font-black text-[#77f7b7]">{label}</p>
                    <p className="text-3xl font-black text-white">{value}</p>
                  </div>
                  <div className="absolute inset-0 bg-[#06131f]/24" />
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 bg-[#071827] p-4 sm:p-6">
            <h2 className="text-3xl font-black">Your real profit is hidden</h2>
            <p className="mt-3 font-black text-[#77f7b7]">Most sellers are off by 30-60%.</p>
            <div className="mt-5">
              <PrimaryCta fullWidth onClick={() => undefined}>
                Reveal my real profit
              </PrimaryCta>
            </div>
            <p className="mt-3 text-center text-sm font-bold text-white/56">
              One-time unlock. Takes 2 seconds. No subscription.
            </p>
          </div>
        </Card>

        <button className="mt-5 text-sm font-bold text-white/58 hover:text-white" type="button" onClick={onUpload}>
          Use a different CSV
        </button>
      </Section>
    </main>
  );
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Results | null>(null);
  const [showPaste, setShowPaste] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const openUpload = () => fileInputRef.current?.click();

  const handleCsv = (text: string, fileName = "Pasted CSV") => {
    try {
      setImportError(null);
      setResults(parseCsv(text, fileName));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setResults(null);
      setImportError(
        error instanceof Error ? error.message : "We couldn't parse that CSV. Please try another file.",
      );
    }
  };

  const handleFileSelection = async (file: File) => {
    try {
      const text = await file.text();
      handleCsv(text, file.name);
    } catch (error) {
      setResults(null);
      setImportError(
        error instanceof Error
          ? `We couldn't read "${file.name}". Please upload a valid CSV file.`
          : "We couldn't read that file. Please upload a valid CSV file.",
      );
    }
  };

  if (results) {
    return (
      <>
        <input
          ref={fileInputRef}
          className="sr-only"
          type="file"
          accept=".csv,text/csv"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            void handleFileSelection(file);
            event.target.value = "";
          }}
        />
        <ResultsScreen results={results} onUpload={openUpload} errorMessage={importError} />
      </>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#06131f] text-white">
      <input
        ref={fileInputRef}
        className="sr-only"
        type="file"
        accept=".csv,text/csv"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          void handleFileSelection(file);
          event.target.value = "";
        }}
      />

      <header className="mx-auto flex w-full max-w-6xl items-center px-5 py-5 sm:px-6 lg:px-8">
        <LogoLink />
      </header>

      <Section className="grid items-center gap-10 pb-10 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:pt-12">
        <div>
          {importError ? (
            <div className="mb-5 max-w-xl">
              <ImportErrorBanner message={importError} />
            </div>
          ) : null}
          <p className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-[#77f7b7]">
            We show you the number Etsy does not.
          </p>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-normal text-white sm:text-6xl lg:text-7xl">
            Most Etsy sellers think their payout is profit. It is not.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
            You made $11,727... but after fees, production, and ads, your real profit is much lower.
          </p>
          <div className="mt-8 max-w-sm">
            <PrimaryCta fullWidth onClick={openUpload}>
              Find my real profit
            </PrimaryCta>
            <p className="mt-3 text-center text-sm font-bold text-white/68">
              Free. Takes 10 seconds. No login required.
            </p>
            <button
              className="mt-3 block w-full text-center text-sm font-bold text-white/46 hover:text-white"
              type="button"
              onClick={() => setShowPaste((current) => !current)}
            >
              Or paste CSV text
            </button>
            {showPaste ? (
              <form
                className="mt-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  handleCsv(String(form.get("csv") ?? ""));
                }}
              >
                <textarea
                  className="min-h-28 w-full rounded-md border border-white/10 bg-[#081a29] p-3 text-sm text-white outline-none focus:border-[#24d982]"
                  name="csv"
                  aria-label="Paste CSV text"
                />
                <button
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#24d982] px-5 text-sm font-black text-[#06131f] shadow-[0_16px_40px_rgba(36,217,130,0.22)] transition hover:bg-[#5ff0a5]"
                  type="submit"
                >
                  Parse CSV
                </button>
              </form>
            ) : null}
          </div>
        </div>
        <DemoPanel />
      </Section>

      <DemoCards />

      <Section className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black sm:text-4xl">Etsy hides the real number</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-white/66">
            Most sellers underestimate their costs — and overestimate their profit.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            "Fees cut into every sale",
            "Production costs eat margins",
            "Ads silently reduce profit",
            "Subscriptions add up monthly",
          ].map((point) => (
            <div className="flex items-center gap-3 rounded-md bg-white/[0.045] p-4" key={point}>
              <span className="h-2.5 w-2.5 rounded-full bg-[#24d982]" />
              <p className="font-bold text-white/82">{point}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-[#f5fbf7] text-[#06131f]">
        <Section>
          <h2 className="text-3xl font-black sm:text-4xl">TrueTakeHome shows the truth</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Upload your Etsy CSV",
              "Add your production costs",
              "See your real profit instantly",
              "Unlock full breakdown for $4.99",
            ].map((step, index) => (
              <div className="rounded-lg border border-[#06131f]/10 bg-white p-5" key={step}>
                <p className="text-sm font-black text-[#0d8f55]">0{index + 1}</p>
                <p className="mt-4 text-lg font-black">{step}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <Card className="grid overflow-hidden lg:grid-cols-[1fr_0.95fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#77f7b7]">
              Paywall preview
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-black sm:text-4xl">
              Your real profit is hidden
            </h2>
            <p className="mt-4 font-black text-[#77f7b7]">Most sellers are off by 30-60%.</p>
            <div className="mt-7">
              <PrimaryCta fullWidth onClick={openUpload}>
                Reveal my real profit
              </PrimaryCta>
              <p className="mt-3 text-center text-sm font-bold text-white/56">
                One-time unlock. Takes 2 seconds. No subscription.
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 bg-[#071827] p-6 sm:p-8 lg:border-l lg:border-t-0">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#77f7b7]">
              Unlock to see your real numbers
            </p>
            {[
              ["Real take-home", "$3,606"],
              ["Profit margin", "42.8%"],
            ].map(([label, value]) => (
              <div
                className="relative mb-4 overflow-hidden rounded-lg border border-[#24d982]/24 bg-[#092216] p-5 last:mb-0"
                key={label}
              >
                <div className="flex items-center justify-between gap-4 blur-[6px]">
                  <p className="text-sm font-bold text-[#77f7b7]">{label}</p>
                  <p className="text-4xl font-black text-white">{value}</p>
                </div>
                <div className="absolute inset-0 bg-[#06131f]/24" />
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <section className="border-y border-white/8 bg-[#071827]">
        <Section className="grid gap-3 sm:grid-cols-3">
          {["No login required", "Your data stays local", "We do not store your Etsy data"].map(
            (item) => (
              <div className="rounded-md border border-white/10 bg-[#06131f] p-5" key={item}>
                <p className="font-black text-white">{item}</p>
              </div>
            ),
          )}
        </Section>
      </section>

      <Section className="text-center">
        <h2 className="mx-auto max-w-2xl text-4xl font-black sm:text-5xl">
          Find out what you actually keep
        </h2>
        <div className="mx-auto mt-8 max-w-sm">
          <PrimaryCta fullWidth onClick={openUpload}>
            Find my real profit
          </PrimaryCta>
        </div>
      </Section>

      <footer className="border-t border-white/8 px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-white">TrueTakeHome</p>
          <nav className="flex gap-5">
            <a className="hover:text-white" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-white" href="mailto:support@truetakehome.app">
              Support
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
