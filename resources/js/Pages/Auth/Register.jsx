
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post('/register');
    }

    return (
        <>
            <Head title="Create Account | Calculator Hub" />

            <main className="auth-page">
                <section className="auth-card">
                    <Link href="/" className="auth-brand">
                        Calculator<span>Hub.</span>
                    </Link>

                    <h1>Create your account</h1>
                    <p className="auth-description">
                        Register to save and access your calculation history.
                    </p>

                    <form onSubmit={submit} className="auth-form">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <p className="auth-error">{errors.name}</p>}

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
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <p className="auth-error">{errors.password}</p>}

                        <label htmlFor="password_confirmation">Confirm password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <button type="submit" disabled={processing}>
                            {processing ? 'Creating account...' : 'Create account'}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already registered? <Link href="/login">Sign in</Link>
                    </p>
                </section>
            </main>
        </>
    );
}
