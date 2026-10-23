
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <>
            <Head title="Sign In | Calculator Hub" />

            <main className="auth-page">
                <section className="auth-card">
                    <Link href="/" className="auth-brand">
                        Calculator<span>Hub.</span>
                    </Link>

                    <h1>Welcome back</h1>
                    <p className="auth-description">
                        Sign in to access your saved calculations.
                    </p>

                    <form onSubmit={submit} className="auth-form">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <p className="auth-error">{errors.email}</p>}

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <p className="auth-error">{errors.password}</p>}

                        <label className="auth-remember">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            Remember me
                        </label>

                        <button type="submit" disabled={processing}>
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        New to Calculator Hub? <Link href="/register">Create account</Link>
                    </p>
                </section>
            </main>
        </>
    );
}
