
import { Head, Link } from '@inertiajs/react';

const sections = [
    {
        title: '1. Acceptance of These Terms',
        text: 'By accessing or using CalculatorHub, you agree to these Terms & Conditions. If you do not agree with these terms, please discontinue using the website.',
    },
    {
        title: '2. Use of Our Website',
        text: 'You may use CalculatorHub for lawful, personal, and informational purposes. You agree not to misuse the website, interfere with its operation, attempt unauthorized access, or use the service in violation of applicable laws.',
    },
    {
        title: '3. Calculator Results and Accuracy',
        text: 'We aim to provide useful and reliable calculation tools, but results may not always be accurate or suitable for every situation. You are responsible for checking results before relying on them for important decisions.',
    },
    {
        title: '4. Health and Nutrition Disclaimer',
        text: 'BMI, calorie, protein, and other health-related calculations provide general estimates based on the information entered. They are not medical advice, diagnosis, or treatment and should not replace guidance from a qualified healthcare professional.',
    },
    {
        title: '5. User Accounts and Security',
        text: 'If you create an account, you are responsible for keeping your login credentials confidential and for activity carried out through your account. Notify us if you suspect unauthorized account access.',
    },
    {
        title: '6. Calculation History',
        text: 'If you use the calculation-history feature, records may be stored and associated with your account. You should review your saved records and avoid entering sensitive personal information into calculator tools.',
    },
    {
        title: '7. Intellectual Property',
        text: 'Unless otherwise stated, the website design, branding, original text, and other content created for CalculatorHub are protected by applicable intellectual property laws. You may not copy or redistribute protected content without appropriate permission.',
    },
    {
        title: '8. Third-Party Services and Links',
        text: 'The website may use or link to third-party services. We do not control all third-party websites or services, and their own terms and privacy policies may apply when you use them.',
    },
    {
        title: '9. Website Availability',
        text: 'We may update, modify, suspend, or discontinue website features when necessary. We cannot guarantee uninterrupted availability or that every feature will always be free from errors.',
    },
    {
        title: '10. Limitation of Responsibility',
        text: 'To the extent permitted by applicable law, CalculatorHub is not responsible for losses arising from reliance on calculator results, temporary service interruptions, or circumstances outside our reasonable control. Nothing in these terms excludes responsibility where applicable law does not permit it.',
    },
    {
        title: '11. Changes to These Terms',
        text: 'We may revise these terms as the website and its features change. Updated terms will be published on this page. Continued use of the website after an update may be subject to the revised terms, as permitted by applicable law.',
    },
    {
        title: '12. Contact Us',
        text: 'If you have questions about these Terms & Conditions, please contact us through the Contact Us page.',
    },
];

export default function Terms() {
    return (
        <>
            <Head title="Terms & Conditions | CalculatorHub" />

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
                                Website guidelines
                            </span>
                        </div>

                        <h1 className="mt-7 text-4xl font-black tracking-tight sm:text-6xl">
                            Terms &
                            <span className="block bg-gradient-to-r from-[#e5b18d] to-[#9c623f] bg-clip-text text-transparent">
                                Conditions
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                            Please read these terms to understand the general
                            rules for accessing and using CalculatorHub.
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
                                    href={`#terms-${index + 1}`}
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
                                These terms are a general website template.
                                Review them against your actual services and
                                applicable laws before publishing the live website.
                            </p>
                        </div>

                        <div className="space-y-9">
                            {sections.map((section, index) => (
                                <section
                                    key={section.title}
                                    id={`terms-${index + 1}`}
                                    className="scroll-mt-8 border-b border-white/[0.07] pb-8 last:border-b-0 last:pb-0"
                                >
                                    <h2 className="text-xl font-bold leading-snug sm:text-2xl">
                                        {section.title}
                                    </h2>

                                    <p className="mt-4 text-sm leading-8 text-gray-400 sm:text-base">
                                        {section.text}
                                    </p>
                                </section>
                            ))}
                        </div>

                        <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#101215] p-6">
                            <h2 className="text-lg font-bold">
                                Need clarification?
                            </h2>

                            <p className="mt-2 text-sm leading-7 text-gray-400">
                                Contact us if you have questions about using
                                CalculatorHub or these terms.
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
