
import { Head, Link, router } from '@inertiajs/react';

export default function AdminDashboard({
    totalUsers = 0,
    totalCalculations = 0,
    recentCalculations = [],
    totalContactMessages = 0,
    recentContactMessages = [],
}) {
    function logout() {
        router.post('/logout');
    }

    return (
        <>
            <Head title="Admin Dashboard | Calculator Hub" />

            <main className="account-page">
                <header className="account-header">
                    <Link href="/" className="auth-brand">
                        Calculator<span>Hub.</span>
                    </Link>

                    <nav className="account-nav">
                        <Link href="/">View website</Link>
                        <button onClick={logout}>Log out</button>
                    </nav>
                </header>

                <section className="account-content">
                    <p className="account-eyebrow">ADMINISTRATION</p>
                    <h1>Admin Dashboard</h1>

                    <p className="auth-description">
                        Overview of Calculator Hub usage, registered accounts,
                        and visitor messages.
                    </p>

                    <div className="account-stats">
                        <article className="account-stat">
                            <span>Registered users</span>
                            <strong>{totalUsers}</strong>
                        </article>

                        <article className="account-stat">
                            <span>Total calculations</span>
                            <strong>{totalCalculations}</strong>
                        </article>

                        <article className="account-stat">
                            <span>Contact messages</span>
                            <strong>{totalContactMessages}</strong>
                        </article>
                    </div>

                    <section className="account-section">
                        <h2>Recent calculator activity</h2>

                        {recentCalculations.length === 0 ? (
                            <div className="account-empty">
                                <p>No calculations have been saved yet.</p>
                            </div>
                        ) : (
                            <div className="history-list">
                                {recentCalculations.map((item) => (
                                    <article className="history-item" key={item.id}>
                                        <div>
                                            <strong>{item.calculator_type}</strong>
                                            <p>
                                                {new Date(item.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="account-section">
                        <h2>Contact Messages</h2>

                        <p className="auth-description">
                            Messages submitted by visitors through the Contact Us page.
                        </p>

                        {recentContactMessages.length === 0 ? (
                            <div className="account-empty">
                                <p>No contact messages have been received yet.</p>
                            </div>
                        ) : (
                            <div className="history-list">
                                {recentContactMessages.map((item) => (
                                    <article className="history-item" key={item.id}>
                                        <div className="w-full min-w-0">
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <strong className="break-words">
                                                    {item.subject}
                                                </strong>

                                                <span className="text-sm text-gray-400">
                                                    {new Date(item.created_at).toLocaleString()}
                                                </span>
                                            </div>

                                            <p className="mt-2 break-words">
                                                From: {item.name} ({item.email})
                                            </p>

                                            <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6">
                                                {item.message}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <p className="admin-note">
                        Admin access is restricted to authorized accounts.
                    </p>
                </section>
            </main>
        </>
    );
}
