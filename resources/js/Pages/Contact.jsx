
import { Head, Link, useForm } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post, processing, errors, wasSuccessful, reset } =
        useForm({
            name: '',
            email: '',
            subject: '',
            message: '',
        });

    function handleSubmit(event) {
        event.preventDefault();

        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    }

    const inputClass =
        'w-full rounded-xl border border-white/10 bg-[#101215] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-[#c58357] focus:ring-2 focus:ring-[#c58357]/10';

    const labelClass =
        'mb-2 block text-sm font-semibold text-gray-300';

    function fieldError(field) {
        return errors[field] ? (
            <p className="mt-2 text-sm text-red-400" role="alert">
                {errors[field]}
            </p>
        ) : null;
    }

    return (
        <>
            <Head title="Contact Us | CalculatorHub" />

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

                <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-3 rounded-full border border-[#c58357]/25 bg-[#c58357]/[0.07] px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-[#d69a70]" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d69a70]">
                                Contact us
                            </span>
                        </div>

                        <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                            Let's start a
                            <span className="block bg-gradient-to-r from-[#e5b18d] to-[#9c623f] bg-clip-text text-transparent">
                                conversation.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                            Have a question, feedback, or a suggestion for
                            CalculatorHub? Use the form below to get in touch.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                        <aside className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 sm:p-9">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d69a70]">
                                Get in touch
                            </p>

                            <h2 className="mt-4 text-2xl font-bold">
                                We value your feedback
                            </h2>

                            <p className="mt-4 leading-7 text-gray-400">
                                Your questions and suggestions can help us
                                improve our calculators and make the website
                                more useful.
                            </p>

                            <div className="mt-9 space-y-5">
                                <div className="flex gap-4 rounded-2xl border border-white/[0.06] bg-[#15181c] p-5">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c58357]/10 text-xl text-[#d69a70]">
                                        ✉
                                    </span>

                                    <div>
                                        <h3 className="font-semibold">Email enquiries</h3>
                                        <p className="mt-1 text-sm leading-6 text-gray-400">
                                            Send your question through the contact form.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 rounded-2xl border border-white/[0.06] bg-[#15181c] p-5">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#c58357]/10 text-xl text-[#d69a70]">
                                        ◷
                                    </span>

                                    <div>
                                        <h3 className="font-semibold">General feedback</h3>
                                        <p className="mt-1 text-sm leading-6 text-gray-400">
                                            Tell us about a problem or suggest a useful feature.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-white/[0.08] pt-6">
                                <p className="text-sm leading-6 text-gray-500">
                                    Please do not include passwords or other
                                    sensitive personal information in your message.
                                </p>
                            </div>
                        </aside>

                        <section className="rounded-3xl border border-white/[0.08] bg-[#15181c] p-6 sm:p-9">
                            <h2 className="text-2xl font-bold">Send us a message</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Fill in the fields below.
                            </p>

                            {wasSuccessful && (
                                <div
                                    role="status"
                                    className="mt-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm leading-6 text-green-300"
                                >
                                    Your message has been sent successfully.
                                </div>
                            )}

                            {errors.contact && (
                                <div
                                    role="alert"
                                    className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-300"
                                >
                                    {errors.contact}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                                <div>
                                    <label htmlFor="name" className={labelClass}>
                                        Your name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        maxLength={100}
                                        value={data.name}
                                        onChange={(event) => setData('name', event.target.value)}
                                        placeholder="Enter your name"
                                        required
                                        aria-invalid={Boolean(errors.name)}
                                        className={inputClass}
                                    />
                                    {fieldError('name')}
                                </div>

                                <div>
                                    <label htmlFor="email" className={labelClass}>
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        maxLength={255}
                                        value={data.email}
                                        onChange={(event) => setData('email', event.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        aria-invalid={Boolean(errors.email)}
                                        className={inputClass}
                                    />
                                    {fieldError('email')}
                                </div>

                                <div>
                                    <label htmlFor="subject" className={labelClass}>
                                        Subject
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        maxLength={200}
                                        value={data.subject}
                                        onChange={(event) => setData('subject', event.target.value)}
                                        placeholder="What is your message about?"
                                        required
                                        aria-invalid={Boolean(errors.subject)}
                                        className={inputClass}
                                    />
                                    {fieldError('subject')}
                                </div>

                                <div>
                                    <label htmlFor="message" className={labelClass}>
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        maxLength={5000}
                                        value={data.message}
                                        onChange={(event) => setData('message', event.target.value)}
                                        placeholder="Write your message here..."
                                        required
                                        aria-invalid={Boolean(errors.message)}
                                        className={`${inputClass} resize-y`}
                                    />
                                    {fieldError('message')}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#b87345] px-6 py-4 font-bold text-white shadow-lg shadow-[#b87345]/10 transition hover:-translate-y-0.5 hover:bg-[#c58357] focus:outline-none focus:ring-2 focus:ring-[#d69a70] focus:ring-offset-2 focus:ring-offset-[#15181c] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                    {!processing && <span aria-hidden="true">→</span>}
                                </button>

                                <p className="text-xs leading-5 text-gray-500">
                                    Your message will be stored so the CalculatorHub team
                                    can review it. Please do not include passwords or
                                    sensitive personal information.
                                </p>
                            </form>
                        </section>
                    </div>
                </section>

                <footer className="relative z-10 border-t border-white/[0.08] px-5 py-7 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} CalculatorHub. All rights reserved.
                </footer>
            </main>
        </>
    );
}
