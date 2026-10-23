
import { Head, Link } from '@inertiajs/react';

const features = [
    {
        number: '01',
        title: 'Everyday Calculations',
        description:
            'Use our scientific calculator to solve everyday mathematical problems with convenience.',
        icon: '∑',
    },
    {
        number: '02',
        title: 'Age & Personal Tools',
        description:
            'Calculate your age and explore useful tools designed for common everyday needs.',
        icon: '◷',
    },
    {
        number: '03',
        title: 'Health & Nutrition',
        description:
            'Explore BMI, calorie, and protein calculators to get estimates based on your inputs.',
        icon: '✳',
    },
];

export default function About() {
    return (
        <>
            <Head title="About Us | CalculatorHub" />

            <main className="relative min-h-screen overflow-hidden bg-[#101215] text-white">
                {/* Background decoration */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#b87345]/10 blur-[120px]"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-[550px] h-72 w-72 rounded-full bg-[#b87345]/5 blur-[100px]"
                />

                {/* Header */}
                <header className="relative z-10 border-b border-white/[0.08] bg-[#101215]/80 backdrop-blur-xl">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
                        <Link href="/" className="group text-xl font-black tracking-tight sm:text-2xl">
                            Calculator
                            <span className="text-[#d69a70] transition-colors group-hover:text-[#f0bc97]">
                                Hub
                            </span>
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-[#c58357]" />
                        </Link>

                        <div className="flex items-center gap-5 sm:gap-8">
                            <Link
                                href="/#calculators"
                                className="hidden text-sm text-gray-400 transition hover:text-white sm:inline-block"
                            >
                                Calculators
                            </Link>

                            <Link
                                href="/"
                                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold transition hover:border-[#c58357]/50 hover:bg-[#c58357]/10"
                            >
                                Home <span className="ml-1 text-[#d69a70]">↗</span>
                            </Link>
                        </div>
                    </nav>
                </header>

                {/* Hero */}
                <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 rounded-full border border-[#c58357]/25 bg-[#c58357]/[0.07] px-4 py-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#d69a70]" />
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#d69a70]">
                                Get to know us
                            </span>
                        </div>

                        <h1 className="mt-8 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
                            Making calculations
                            <br />
                            <span className="bg-gradient-to-r from-[#e5b18d] via-[#c58357] to-[#9c623f] bg-clip-text text-transparent">
                                feel effortless.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                            Welcome to CalculatorHub, a practical collection of
                            online calculators built to make everyday
                            calculations easier, clearer, and more accessible.
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                href="/#calculators"
                                className="inline-flex items-center gap-3 rounded-xl bg-[#b87345] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#b87345]/15 transition hover:-translate-y-0.5 hover:bg-[#c58357]"
                            >
                                Explore Calculators
                                <span aria-hidden="true">→</span>
                            </Link>

                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 font-semibold text-gray-300 transition hover:border-white/25 hover:bg-white/[0.04]"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    {/* Feature strip */}
                    <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:border-[#c58357]/30 hover:bg-white/[0.04]">
                            <p className="text-3xl font-black text-[#d69a70]">01</p>
                            <p className="mt-3 font-bold">Simple to use</p>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Tools designed with convenience in mind.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:border-[#c58357]/30 hover:bg-white/[0.04]">
                            <p className="text-3xl font-black text-[#d69a70]">02</p>
                            <p className="mt-3 font-bold">Useful tools</p>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Calculators for different everyday needs.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition duration-300 hover:border-[#c58357]/30 hover:bg-white/[0.04]">
                            <p className="text-3xl font-black text-[#d69a70]">03</p>
                            <p className="mt-3 font-bold">Accessible online</p>
                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Use the available tools through your browser.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What we offer */}
                <section className="relative z-10 border-y border-white/[0.07] bg-white/[0.015]">
                    <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
                        <div className="max-w-2xl">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d69a70]">
                                What we offer
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Useful tools. Clear purpose.
                            </h2>

                            <p className="mt-4 leading-7 text-gray-400">
                                We bring different types of calculators
                                together in one place, helping you find the
                                tool that fits your needs.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                            {features.map((feature) => (
                                <article
                                    key={feature.number}
                                    className="group rounded-2xl border border-white/[0.08] bg-[#15181c] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c58357]/40 hover:shadow-xl hover:shadow-black/20"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c58357]/20 bg-[#c58357]/10 text-2xl text-[#d69a70] transition group-hover:bg-[#c58357]/20">
                                            {feature.icon}
                                        </span>

                                        <span className="text-sm font-bold tracking-widest text-gray-600">
                                            {feature.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 text-xl font-bold">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-gray-400">
                                        {feature.description}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
                    <div className="relative overflow-hidden rounded-3xl border border-[#c58357]/20 bg-gradient-to-br from-[#201a17] via-[#171719] to-[#121417] p-7 sm:p-12 md:p-16">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#c58357]/10"
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-[#c58357]/10"
                        />

                        <div className="relative max-w-3xl">
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d69a70]">
                                Our purpose
                            </p>

                            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                                Less complexity.
                                <br />
                                More clarity.
                            </h2>

                            <p className="mt-5 max-w-2xl leading-8 text-gray-400">
                                Our aim is to make common calculations
                                convenient and understandable. We continue
                                working toward a useful experience that helps
                                people find relevant tools without unnecessary
                                complications.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Important information */}
                <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d69a70]">
                                Please note
                            </p>

                            <h2 className="mt-4 text-3xl font-black tracking-tight">
                                Clear and responsible information
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
                            <p className="leading-8 text-gray-400">
                                Health and nutrition calculator results are
                                estimates based on the information provided.
                                BMI, calorie, and protein results may not
                                reflect every person's individual needs.
                                These tools are for general informational
                                purposes and do not replace professional
                                medical advice, diagnosis, or treatment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 border-t border-white/[0.08]">
                    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
                        <Link href="/" className="text-lg font-black tracking-tight">
                            Calculator
                            <span className="text-[#d69a70]">Hub</span>
                        </Link>

                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} CalculatorHub. All rights reserved.
                        </p>

                        <Link
                            href="/"
                            className="text-sm text-gray-400 transition hover:text-[#d69a70]"
                        >
                            Visit Homepage ↗
                        </Link>
                    </div>
                </footer>
            </main>
        </>
    );
}
