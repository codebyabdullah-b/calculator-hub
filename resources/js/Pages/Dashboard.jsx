
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard({
    user,
    recentHistory = [],
    totalCalculations = 0,
}) {
    function logout() {
        router.post('/logout');
    }

    return (
        <>
            <Head title="My Dashboard | Calculator Hub" />

            <main className="account-page">
                <header className="account-header">
                    <Link href="/" className="auth-brand">
                        Calculator<span>Hub.</span>
                    </Link>

                    <nav className="account-nav">
                        <Link href="/">Home</Link>
                        <Link href="/history">My History</Link>
                        <button onClick={logout}>Log out</button>
                    </nav>
                </header>

                <section className="account-content">
                    <p className="account-eyebrow">PERSONAL DASHBOARD</p>
                    <h1>Welcome, {user.name}</h1>
                    <p className="auth-description">
                        Manage your account and review your saved calculations.
                    </p>

                    <div className="account-stats">
                        <article className="account-stat">
                            <span>Total saved calculations</span>
                            <strong>{totalCalculations}</strong>
                        </article>

                        <article className="account-stat">
                            <span>Account email</span>
                            <strong className="account-email">{user.email}</strong>
                        </article>
                    </div>

                    <section className="account-section">
                        <div className="account-section-heading">
                            <h2>Recent calculations</h2>
                            <Link href="/history">View all history</Link>
                        </div>

                        {recentHistory.length === 0 ? (
                            <div className="account-empty">
                                <h3>No saved calculations yet</h3>
                                <p>
                                    Use a calculator and save a result to see it here.
                                </p>
                                <Link href="/">Explore calculators</Link>
                            </div>
                        ) : (
                            <div className="history-list">
                                {recentHistory.map((item) => (
                                    <article className="history-item" key={item.id}>
                                        <div>
                                            <strong>{item.calculator_type}</strong>
                                            <p>
                                                {new Date(item.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <span>{item.result}</span>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </section>
            </main>
        </>
    );
}
