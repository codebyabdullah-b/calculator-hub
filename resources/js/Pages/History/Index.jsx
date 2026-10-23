
import { Head, Link, router } from '@inertiajs/react';

export default function History({ history }) {
    const records = history?.data ?? [];

    function deleteRecord(id) {
        if (window.confirm('Delete this calculation from your history?')) {
            router.delete(`/history/${id}`);
        }
    }

    function getExpression(item) {
        const inputs = item.inputs ?? {};

        if (inputs.expression) {
            return inputs.expression;
        }

        if (inputs.operation === 'square root') {
            return `√(${inputs.value})`;
        }

        if (['sin', 'cos', 'tan'].includes(inputs.operation)) {
            return `${inputs.operation}(${inputs.degrees}°)`;
        }

        if (inputs.date_of_birth) {
            return `Date of birth: ${inputs.date_of_birth}`;
        }

        if (inputs.weight_kg !== undefined) {
            const details = [
                `Weight: ${inputs.weight_kg} kg`,
            ];

            if (inputs.height_cm !== undefined) {
                details.push(`Height: ${inputs.height_cm} cm`);
            }

            if (inputs.age_years !== undefined) {
                details.push(`Age: ${inputs.age_years} years`);
            }

            if (inputs.sex) {
                details.push(`Sex: ${inputs.sex}`);
            }

            if (inputs.goal) {
                details.push(`Goal: ${inputs.goal}`);
            }

            return details.join(' | ');
        }

        return 'Calculation details unavailable';
    }

    function formatType(type) {
        return type
            .replaceAll('_', ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }

    return (
        <>
            <Head title="My Calculation History | Calculator Hub" />

            <main className="account-page">
                <header className="account-header">
                    <Link href="/" className="auth-brand">
                        Calculator<span>Hub.</span>
                    </Link>

                    <nav className="account-nav">
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="/">Home</Link>
                    </nav>
                </header>

                <section className="account-content">
                    <p className="account-eyebrow">YOUR PERSONAL RECORDS</p>
                    <h1>Calculation History</h1>

                    <p className="auth-description">
                        Review or delete calculations saved to your account.
                    </p>

                    {records.length === 0 ? (
                        <div className="account-empty">
                            <h3>Your history is empty</h3>
                            <p>Saved calculations will appear here.</p>
                            <Link href="/">Explore calculators</Link>
                        </div>
                    ) : (
                        <>
                            <div className="history-list">
                                {records.map((item) => (
                                    <article
                                        className="history-item"
                                        key={item.id}
                                    >
                                        <div>
                                            <strong>
                                                {formatType(item.calculator_type)}
                                            </strong>

                                            <p>
                                                {new Date(
                                                    item.created_at
                                                ).toLocaleString()}
                                            </p>

                                            <p className="history-result">
                                                Calculation: {getExpression(item)}
                                            </p>

                                            <p className="history-result">
                                                Result: {item.result}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            className="history-delete"
                                            onClick={() => deleteRecord(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </article>
                                ))}
                            </div>

                            <div className="history-pagination">
                                {history.prev_page_url && (
                                    <button
                                        onClick={() =>
                                            router.visit(history.prev_page_url)
                                        }
                                    >
                                        Previous
                                    </button>
                                )}

                                <span>
                                    Page {history.current_page} of {history.last_page}
                                </span>

                                {history.next_page_url && (
                                    <button
                                        onClick={() =>
                                            router.visit(history.next_page_url)
                                        }
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </section>
            </main>
        </>
    );
}
