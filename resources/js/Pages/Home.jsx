import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { lazy, Suspense } from 'react';

const LazyScientificCalculator = lazy(
    () => import('../Components/Calculators/ScientificCalculator')
);
const LazyAgeCalculator = lazy(
    () => import('../Components/Calculators/AgeCalculator')
);
const LazyHealthCalculator = lazy(
    () => import('../Components/Calculators/HealthCalculator')
);
const LazyBMICalculator = lazy(
    () => import('../Components/Calculators/BMICalculator')
);
const calculators = [
    {
        id: 'scientific',
        number: '01',
        title: 'Scientific Calculator',
        description: 'Advanced calculations, trigonometry, powers and fractions.',
        tag: 'ADVANCED',
    },
    {
        id: 'age',
        number: '02',
        title: 'Age Calculator',
        description: 'Calculate your exact age in years, months and days.',
        tag: 'LIFESTYLE',
    },
    {
        id: 'calories',
        number: '03',
        title: 'Calories Calculator',
        description: 'Estimate daily calories based on your personal details.',
        tag: 'HEALTH',
    },
    {
        id: 'protein',
        number: '04',
        title: 'Protein Calculator',
        description: 'Estimate daily protein needs using your weight and activity.',
        tag: 'NUTRITION',
    },
    {
        id: 'bmi',
        number: '05',
        title: 'BMI Calculator',
        description: 'Estimate body mass index from your height and weight.',
        tag: 'WELLNESS',
    },
];

const validCalculatorIds = calculators.map((calculator) => calculator.id);

const buttonBase =
    'flex min-h-[48px] items-center justify-center rounded-lg border px-2 py-3 text-sm font-semibold transition duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50';

function ViewHistoryButton({ authUser }) {
    if (!authUser) {
        return (
            <button
                type="button"
                onClick={() => router.visit('/login')}
                className="rounded-lg border border-[#b87345]/40 px-4 py-2 text-sm text-[#d69a70] transition hover:bg-[#b87345]/10"
            >
                Login to save history
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={() => router.visit('/history')}
            className="rounded-lg border border-[#b87345]/40 px-4 py-2 text-sm text-[#d69a70] transition hover:bg-[#b87345]/10"
        >
            View History
        </button>
    );
}



export default function Home({
    initialCalculator = 'scientific',
    dedicatedPage = false,
}) {
    const { auth } = usePage().props;
    const authUser = auth?.user ?? null;

    const [activeCalculator, setActiveCalculator] = useState(
        validCalculatorIds.includes(initialCalculator)
            ? initialCalculator
            : 'scientific',
    );

    const [lightTheme, setLightTheme] = useState(false);

    const pageBackground = lightTheme
        ? 'bg-[#f4f0eb] text-[#24211e]'
        : 'bg-[#111418] text-white';

    const secondaryText = lightTheme ? 'text-[#655c55]' : 'text-gray-400';

    function selectCalculator(id) {
        setActiveCalculator(id);

        const workspace = document.getElementById('calculator-workspace');

        if (workspace) {
            workspace.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    return (
        <main className={`min-h-screen overflow-hidden transition-colors duration-300 ${pageBackground}`}>
            <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
                lightTheme
                    ? 'border-black/10 bg-[#f4f0eb]/90'
                    : 'border-white/10 bg-[#111418]/90'
            }`}>
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <a href="/" className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b87345] text-lg font-black text-white">
                            C
                        </span>
                        <span>
                            <span className="block text-base font-bold tracking-wide">
                                Calculator<span className="text-[#c58357]">Hub</span>
                            </span>
                            <span className={`block text-[10px] tracking-[0.2em] ${secondaryText}`}>
                                SMART TOOLS. CLEAR ANSWERS.
                            </span>
                        </span>
                    </a>

                    <nav className="hidden items-center gap-6 text-sm md:flex">
                      <a href={dedicatedPage ? '/#calculators' : '#calculators'} className={`transition hover:text-[#c58357] ${secondaryText}`}>
                            Calculators
                        </a>
                        <a href={dedicatedPage ? '/#about' : '#about'} className={`transition hover:text-[#c58357] ${secondaryText}`}>
                            About
                        </a>
                        {authUser ? (
                            <>
                                <a href="/dashboard" className={`transition hover:text-[#c58357] ${secondaryText}`}>
                                    Dashboard
                                </a>
                                <button
                                    type="button"
                                    onClick={() => router.post('/logout')}
                                    className="text-[#c58357] transition hover:text-[#e4a77f]"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <a href="/login" className={`transition hover:text-[#c58357] ${secondaryText}`}>
                                    Login
                                </a>
                                <a
                                    href="/register"
                                    className="rounded-lg bg-[#b87345] px-4 py-2 font-semibold text-white transition hover:bg-[#a66339]"
                                >
                                    Get Started
                                </a>
                            </>
                        )}
                    </nav>

                    <button
                        type="button"
                        onClick={() => setLightTheme((current) => !current)}
                        className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                            lightTheme
                                ? 'border-black/20 hover:bg-black/5'
                                : 'border-white/15 hover:bg-white/5'
                        }`}
                    >
                        {lightTheme ? 'Dark theme' : 'Light theme'}
                    </button>
                </div>
            </header>
            {!dedicatedPage && (
            <section className="relative isolate">
                <div className="pointer-events-none absolute -right-40 -top-20 -z-10 h-96 w-96 rounded-full bg-[#b87345]/15 blur-3xl" />
                <div className="pointer-events-none absolute -left-40 top-40 -z-10 h-80 w-80 rounded-full bg-[#b87345]/10 blur-3xl" />

                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:px-8">
                    <div>
                        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b87345]/40 bg-[#b87345]/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-[#d69a70]">
                            <span className="h-2 w-2 rounded-full bg-[#b87345]" />
                            YOUR EVERYDAY CALCULATION TOOLKIT
                        </p>

                        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Numbers made
                            <span className="block text-[#c58357]">simple and smart.</span>
                        </h1>

                        <p className={`mt-6 max-w-xl text-base leading-8 sm:text-lg ${secondaryText}`}>
                            Calculate with confidence. Explore scientific functions, track
                            your age, and estimate everyday health and nutrition figures
                            with tools built for clarity, including BMI and wellness estimates.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => selectCalculator('scientific')}
                                className="rounded-lg bg-[#b87345] px-6 py-3 font-bold text-white shadow-lg shadow-[#b87345]/15 transition hover:-translate-y-0.5 hover:bg-[#a66339]"
                            >
                                Open Scientific Calculator
                            </button>
                            <a
                                href="#calculators"
                                className={`rounded-lg border px-6 py-3 font-semibold transition hover:border-[#b87345] ${
                                    lightTheme ? 'border-black/15' : 'border-white/15'
                                }`}
                            >
                                Explore all tools
                            </a>
                        </div>

                        <div className={`mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm ${secondaryText}`}>
                            <span><strong className="text-[#c58357]">05</strong> useful calculators</span>
                            <span><strong className="text-[#c58357]">24/7</strong> access</span>
                            <span><strong className="text-[#c58357]">Private</strong> user history</span>
                        </div>
                    </div>

                    
<div className="relative">
    <div className="absolute -inset-4 rounded-3xl bg-[#b87345]/10 blur-2xl" />

    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1b1f24] p-5 shadow-2xl sm:p-7">
        <div className="mb-6">
            <p className="text-xs font-bold tracking-[0.2em] text-[#d69a70]">
                CALCULATORHUB
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
                One Hub, Multiple Tools
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
                Everyday calculations, all in one place.
            </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[#b87345]/30 bg-[#292b2e] p-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#b87345]/15 text-2xl font-bold text-[#d69a70]">
                    ∑
                </div>
                <h3 className="font-semibold text-white">Scientific</h3>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                    Math &amp; equations
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#252a31] p-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#c7d6b4]/10 text-2xl text-[#c7d6b4]">
                    ◷
                </div>
                <h3 className="font-semibold text-white">Age Calculator</h3>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                    Years, months &amp; days
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#252a31] p-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#d69a70]/10 text-2xl text-[#d69a70]">
                    ♨
                </div>
                <h3 className="font-semibold text-white">Calories</h3>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                    Daily calorie estimate
                </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#252a31] p-4">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#c7d6b4]/10 text-2xl font-bold text-[#c7d6b4]">
                    P
                </div>
                <h3 className="font-semibold text-white">Protein</h3>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                    Daily protein estimate
                </p>
            </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-[#20242a] px-4 py-3">
            <p className="text-center text-xs leading-5 text-gray-400">
                Choose from 4 useful calculators to get started.
            </p>
        </div>
    </div>
</div>

                </div>
            </section>)}
{!dedicatedPage && (
            <section id="calculators" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-xs font-bold tracking-[0.2em] text-[#c58357]">
                            THE TOOLKIT
                        </p>
                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Calculators for everyday life
                        </h2>
                        <p className={`mt-3 max-w-2xl leading-7 ${secondaryText}`}>
                            Choose a tool, enter your values and get a clear result.
                        </p>
                    </div>
                    <span className={`text-sm ${secondaryText}`}>
                        {calculators.length} tools available
                    </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {calculators.map((calculator) => (
                        <button
                            key={calculator.id}
                            type="button"
                            onClick={() => selectCalculator(calculator.id)}
                            className={`group rounded-2xl border p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-[#b87345]/60 ${
                                activeCalculator === calculator.id
                                    ? 'border-[#b87345] bg-[#b87345]/10'
                                    : lightTheme
                                      ? 'border-black/10 bg-white/60'
                                      : 'border-white/10 bg-[#1b1f24]'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-black text-[#b87345]/70">
                                    {calculator.number}
                                </span>
                                <span className="rounded-md border border-[#b87345]/30 px-2 py-1 text-[9px] font-bold tracking-wider text-[#c58357]">
                                    {calculator.tag}
                                </span>
                            </div>
                            <h3 className="mt-5 text-lg font-bold">{calculator.title}</h3>
                            <p className={`mt-3 min-h-[72px] text-sm leading-6 ${secondaryText}`}>
                                {calculator.description}
                            </p>
                            <span className="mt-4 inline-block text-sm font-semibold text-[#c58357] transition group-hover:translate-x-1">
                                Open calculator →
                            </span>
                        </button>
                    ))}
                </div>
            </section>)}

            <section id="calculator-workspace" className="scroll-mt-24 border-y border-white/5 bg-black/10 px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
        <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.2em] text-[#c58357]">
                CALCULATOR WORKSPACE
            </p>
            <h2 className="mt-3 text-3xl font-bold">
                {calculators.find((item) => item.id === activeCalculator)?.title}
            </h2>
            <p className={`mt-3 ${secondaryText}`}>
                Enter your values below to perform a calculation.
            </p>

            {dedicatedPage && (
                <a
                    href="/"
                    className="mt-4 inline-block text-sm font-semibold text-[#c58357] transition hover:text-[#e4a77f]"
                >
                    ← Back to all calculators
                </a>
            )}
        </div>

                    {activeCalculator === 'scientific' && (
    <Suspense
        fallback={
            <div className="py-8 text-center text-[#d69a70]">
                Loading Scientific Calculator...
            </div>
        }
    >
        <LazyScientificCalculator authUser={authUser} />
    </Suspense>
)}

                    {activeCalculator === 'age' && (
                        <Suspense fallback={<div className="py-8 text-center text-[#d69a70]">Loading Age Calculator...</div>}>
                            <LazyAgeCalculator authUser={authUser} />
                        </Suspense>
                    )}

                    {activeCalculator === 'calories' && (
                        <Suspense fallback={<div className="py-8 text-center text-[#d69a70]">Loading Calories Calculator...</div>}>
                            <LazyHealthCalculator authUser={authUser} />
                        </Suspense>
                    )}

                    {activeCalculator === 'protein' && (
                        <Suspense fallback={<div className="py-8 text-center text-[#d69a70]">Loading Protein Calculator...</div>}>
                            <LazyHealthCalculator protein authUser={authUser} />
                        </Suspense>
                    )}

                    {activeCalculator === 'bmi' && (
                        <Suspense fallback={<div className="py-8 text-center text-[#d69a70]">Loading BMI Calculator...</div>}>
                            <LazyBMICalculator authUser={authUser} />
                        </Suspense>
                    )}
                </div>
            </section>
{!dedicatedPage && (
            <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <p className="text-xs font-bold tracking-[0.2em] text-[#c58357]">
                            ABOUT CALCULATORHUB
                        </p>
                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Useful tools, without unnecessary complexity.
                        </h2>
                    </div>

                    <div>
                        <p className={`leading-8 ${secondaryText}`}>
                            CalculatorHub brings practical calculation tools together in
                            one place. Use the scientific calculator for mathematical
                            expressions, or choose an everyday calculator for quick
                            estimates. Registered users can save completed calculations
                            and return to their history later.
                        </p>

                        {!authUser && (
                            <a
                                href="/register"
                                className="mt-6 inline-block rounded-lg bg-[#b87345] px-5 py-3 font-semibold text-white transition hover:bg-[#a66339]"
                            >
                                Create your account
                            </a>
                        )}
                    </div>
                </div>
            </section>)}

            
<footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} CalculatorHub. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-500">
                <a
                    href={dedicatedPage ? '/#calculators' : '#calculators'}
                    className="transition hover:text-[#c58357]"
                >
                    Calculators
                </a>

                <a
                    href={dedicatedPage ? '/#about' : '#about'}
                    className="transition hover:text-[#c58357]"
                >
                    About
                </a>

                <a href="/about" className="transition hover:text-[#c58357]">
                    About Us
                </a>

                <a href="/contact" className="transition hover:text-[#c58357]">
                    Contact Us
                </a>

                <a href="/privacy-policy" className="transition hover:text-[#c58357]">
                    Privacy Policy
                </a>

                <a href="/terms" className="transition hover:text-[#c58357]">
                    Terms &amp; Conditions
                </a>

                {authUser ? (
                    <a href="/history" className="transition hover:text-[#c58357]">
                        History
                    </a>
                ) : (
                    <a href="/login" className="transition hover:text-[#c58357]">
                        Login
                    </a>
                )}
            </div>
        </div>
    </div>
</footer>

        </main>
    );
}
