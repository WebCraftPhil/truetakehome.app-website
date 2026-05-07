import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | TrueTakeHome",
  description: "Get support for TrueTakeHome, upload questions, and contact support by email.",
};

const faqItems = [
  {
    question: "What Etsy file do I upload?",
    answer: "Upload your Etsy payment CSV/export from Etsy.",
  },
  {
    question: "Why does my profit seem low?",
    answer:
      "TrueTakeHome includes production costs, shipping, fees, ads, and tools when estimating what you actually keep.",
  },
  {
    question: "Do you store my Etsy data?",
    answer: "No. TrueTakeHome is designed to process data locally whenever possible.",
  },
  {
    question: "Is this tax or accounting advice?",
    answer:
      "No. TrueTakeHome provides estimates and is not tax, legal, or accounting advice.",
  },
  {
    question: "How long does support take?",
    answer: "We try to respond within 1–2 business days.",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#06131f] text-white">
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
        <Link
          className="inline-flex min-h-10 items-center rounded-full border border-[#24d982]/25 bg-[#092216] px-4 text-sm font-black text-[#77f7b7] transition hover:border-[#24d982]/45 hover:bg-[#0b2a1a] hover:text-white"
          href="/"
        >
          TrueTakeHome
        </Link>
      </header>

      <section className="mx-auto w-full max-w-4xl px-5 pb-16 pt-8 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#77f7b7]">Support</p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Support</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
          Need help with TrueTakeHome? Reach out anytime and we’ll do our best to help.
        </p>

        <div className="mt-10 grid gap-6">
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#77f7b7]">Email support</p>
            <a
              className="mt-4 inline-flex w-full min-h-14 items-center justify-center rounded-full bg-[#24d982] px-6 text-base font-black text-[#06131f] transition hover:bg-[#5ff0a5] sm:w-auto"
              href="mailto:support@truetakehome.app"
            >
              support@truetakehome.app
            </a>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
              Tap to email support from your device. We’ll get back to you as quickly as we can.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-black">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {faqItems.map((item) => (
                <details
                  className="rounded-2xl border border-white/10 bg-[#081a29] p-5"
                  key={item.question}
                >
                  <summary className="cursor-pointer list-none text-base font-black text-white">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-white/68">{item.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>

        <section className="mt-12 rounded-3xl border border-white/10 bg-[#092216] p-6 text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#77f7b7]">Still need help?</p>
          <p className="mt-3 text-lg leading-8 text-white/72">
            If the FAQ doesn't cover your question, send us a message and we’ll reply as soon as possible.
          </p>
          <a
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#24d982] px-6 text-base font-black text-[#06131f] transition hover:bg-[#5ff0a5]"
            href="mailto:support@truetakehome.app"
          >
            Email Support
          </a>
        </section>
      </section>
    </main>
  );
}
