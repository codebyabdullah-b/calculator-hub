
import { Head, Link } from '@inertiajs/react';

const sections = [
    {
        title: '1. Information We Collect',
        paragraphs: [
            'CalculatorHub may process information that you provide when you create an account, sign in, use account features, save calculation history, or contact us.',
            'Information may include your name, email address, messages, and calculation records associated with your account. The information collected depends on the features you choose to use.',
        ],
    },
    {
        title: '2. How We Use Information',
        paragraphs: [
            'We may use submitted information to provide website features, maintain account access, display saved calculation history, respond to enquiries, protect the website, and improve our services.',
            'We do not ask you to submit unnecessary sensitive personal information. Please avoid including private information in messages or calculator inputs.',
        ],
    },
    {
        title: '3. Cookies and Similar Technologies',
        paragraphs: [
            'CalculatorHub may use essential cookies or similar technologies to support website functionality, such as maintaining a secure session and keeping you signed in.',
            'If analytics or advertising technologies are introduced, this policy should be updated to explain the technologies used and the choices available to visitors.',
        ],
    },
    {
        title: '4. Advertising and Third-Party Services',
        paragraphs: [
            'CalculatorHub may use third-party services to operate, measure, or support the website. Those services may process information according to their own privacy policies.',
            'If Google AdSense or another advertising service is enabled, advertising providers may use cookies or similar technologies as described in their applicable policies and consent requirements.',
        ],
    },
    {
        title: '5. Calculation History and Accounts',
        paragraphs: [
            'If you register and use calculation-history features, records may be stored and associated with your account so that you can access them later.',
            'Keep your login credentials private. Do not use calculator inputs or history as a place to store passwords, financial account details, or other sensitive information.',
        ],
    },
    {
        title: '6. Data Security and Retention',
        paragraphs: [
            'We aim to use appropriate technical and organizational measures to protect information. However, no website or method of electronic storage can be guaranteed to be completely secure.',
            'Information may be retained for as long as needed to provide the relevant features, meet legitimate operational needs, or comply with applicable legal obligations.',
        ],
    },
    {
        title: '7. Your Choices and Rights',
        paragraphs: [
            'Depending on applicable law, you may have rights to request access to, correction of, or deletion of certain personal information.',
            'You can contact us with privacy-related questions or requests. We may need to verify a request before acting on it.',
        ],
    },
    {
        title: '8. Children’s Privacy',
        paragraphs: [
            'CalculatorHub is not intended to collect personal information from children in circumstances where doing so would violate applicable law. Please contact us if you believe a child has provided personal information that should be reviewed.',
        ],
    },
    {
        title: '9. Changes to This Policy',
        paragraphs: [
            'We may update this Privacy Policy as the website, its features, or applicable requirements change. The revised policy will be published on this page with an updated effective date.',
        ],
    },
];

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy | CalculatorHub" />

            <main className="relative min-h-screen overflow-hidden bg-[#101215] text-white">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[#b87345]/10 blur-[120px]"
                />

                <header className="relative z-10 border-b border-white/[0.08] bg-[#101215]/80 backdrop-blur-xl">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
                        <Link href="/" className="text-xl font-black tracking-tight sm:text-2xl">
                            Calculator<span className="text-[#d69a70]">Hub</span>
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#c58357]" />
                        </Link>

                        <Link
                            href="/"
                            className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-[#c58357]/50 hover:text-white"
                        >
                            ← Home
                        </Link>
                    </nav>
                </header>

                <section className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-3 rounded-full border border-[#c58357]/25 bg-[#c58357]/[0.07] px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-[#d69a70]" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d69a70]">
                                Your privacy matters
                            </span>
                        </div>

                        <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-6xl">
                            Privacy
                            <span className="block bg-gradient-to-r from-[#e5b18d] to-[#9c623f] bg-clip-text text-transparent">
                                Policy
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                            This page explains how CalculatorHub may handle
                            information when you visit the website or use its
                            available features.
                        </p>

                        <p className="mt-5 text-sm text-gray-500">
                            Effective date: October 22, 2026
                        </p>
                    </div>
                </section>

                <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[250px_1fr] lg:gap-12">
                    <aside className="h-fit rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 lg:sticky lg:top-8">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d69a70]">
                            On this page
                        </p>

                        <nav className="mt-5 space-y-3">
                            {sections.map((section, index) => (
                                <a
                                    key={section.title}
                                    href={`#privacy-${index + 1}`}
                                    className="block text-sm leading-6 text-gray-400 transition hover:text-[#d69a70]"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </nav>
                    </aside>

                    <article className="min-w-0 rounded-3xl border border-white/[0.08] bg-[#15181c] p-6 sm:p-10">
                        <div className="mb-9 rounded-2xl border border-[#c58357]/20 bg-[#c58357]/[0.06] p-5">
                            <p className="text-sm leading-7 text-gray-300">
                                This policy is a general starting point. It
                                should be checked against the actual services,
                                cookies, database practices, and advertising
                                technologies used by the live website.
                            </p>
                        </div>

                        <div className="space-y-10">
                            {sections.map((section, index) => (
                                <section
                                    key={section.title}
                                    id={`privacy-${index + 1}`}
                                    className="scroll-mt-8 border-b border-white/[0.07] pb-9 last:border-b-0 last:pb-0"
                                >
                                    <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                                        {section.title}
                                    </h2>

                                    <div className="mt-4 space-y-4">
                                        {section.paragraphs.map((paragraph) => (
                                            <p
                                                key={paragraph}
                                                className="text-sm leading-8 text-gray-400 sm:text-base"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#101215] p-6">
                            <h2 className="text-lg font-bold">
                                Privacy questions?
                            </h2>

                            <p className="mt-2 text-sm leading-7 text-gray-400">
                                Contact us if you have a question about this
                                policy or the information associated with your
                                account.
                            </p>

                            <Link
                                href="/contact"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#b87345] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c58357]"
                            >
                                Contact Us <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </article>
                </section>

                <footer className="relative z-10 border-t border-white/[0.08] px-5 py-7 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} CalculatorHub. All rights reserved.
                </footer>
            </main>
        </>
    );
}
