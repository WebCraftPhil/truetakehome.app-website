import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | TrueTakeHome",
  description: "Privacy policy for TrueTakeHome.",
};

const policySections = [
  {
    title: "Data we process",
    items: [
      "Etsy CSV data uploaded by the user",
      "Cost information entered by the user",
      "Optional production, shipping, ad, and tool cost data",
    ],
  },
  {
    title: "How data is handled",
    items: [
      "Data is processed locally in the browser/app when possible",
      "We do not sell user data",
      "We do not intentionally store Etsy CSV data on our servers in this V1 local-first version",
      "Users should avoid uploading sensitive information they do not want analyzed",
    ],
  },
  {
    title: "Payments",
    items: [
      "If payments are enabled, payment processing may be handled by a third-party provider such as Apple or Stripe",
      "We do not store full payment card information",
    ],
  },
  {
    title: "Analytics",
    items: ["If analytics are added later, they should be disclosed here."],
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#06131f] text-white">
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
        <Link
          className="inline-flex min-h-10 items-center rounded-full border border-[#24d982]/25 bg-[#092216] px-4 text-sm font-black text-[#77f7b7] transition hover:border-[#24d982]/45 hover:bg-[#0b2a1a] hover:text-white"
          href="/"
        >
          TrueTakeHome
        </Link>
        <Link className="text-sm font-bold text-white/58 transition hover:text-white" href="/support">
          Support
        </Link>
      </header>

      <section className="mx-auto w-full max-w-4xl px-5 pb-16 pt-8 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#77f7b7]">Privacy Policy</p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm font-semibold text-white/58">Last updated: May 2026</p>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
          TrueTakeHome is designed to help Etsy sellers estimate their real take-home profit.
        </p>

        <div className="mt-10 grid gap-4">
          {policySections.map((section) => (
            <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5" key={section.title}>
              <h2 className="text-xl font-black">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/70">
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}

          <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-xl font-black">Disclaimer</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              TrueTakeHome provides profit estimates for informational purposes only. It is not tax, legal, financial,
              or accounting advice.
            </p>
          </article>

          <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-xl font-black">Contact</h2>
            <a
              className="mt-4 inline-flex min-h-10 items-center rounded-full border border-[#24d982]/25 bg-[#092216] px-4 text-sm font-black text-[#77f7b7] transition hover:border-[#24d982]/45 hover:bg-[#0b2a1a] hover:text-white"
              href="mailto:support@truetakehome.app"
            >
              support@truetakehome.app
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
