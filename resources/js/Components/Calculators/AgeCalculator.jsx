import { useState } from 'react';
import { router } from '@inertiajs/react';

function ViewHistoryButton({ authUser }) {
    if (!authUser) {
        return (
            <button type="button" onClick={() => router.visit('/login')} className="rounded-lg border border-[#b87345]/40 px-4 py-2 text-sm text-[#d69a70] transition hover:bg-[#b87345]/10">
                Login to save history
            </button>
        );
    }
    return (
        <button type="button" onClick={() => router.visit('/history')} className="rounded-lg border border-[#b87345]/40 px-4 py-2 text-sm text-[#d69a70] transition hover:bg-[#b87345]/10">
            View History
        </button>
    );
}

export default function AgeCalculator({ authUser }) {
    const [birthDate, setBirthDate] = useState('');
    const [targetDate, setTargetDate] = useState(
        new Date().toISOString().slice(0, 10),
    );
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    function calculateAge() {
        setError('');
        setResult(null);

        if (!birthDate || !targetDate) {
            setError('Please select both dates.');
            return;
        }

        const birth = new Date(`${birthDate}T00:00:00`);
        const target = new Date(`${targetDate}T00:00:00`);

        if (Number.isNaN(birth.getTime()) || Number.isNaN(target.getTime())) {
            setError('Please enter valid dates.');
            return;
        }

        if (birth > target) {
            setError('Date of birth cannot be after the target date.');
            return;
        }

        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();

        if (days < 0) {
            months -= 1;
            const daysInPreviousMonth = new Date(
                target.getFullYear(),
                target.getMonth(),
                0,
            ).getDate();
            days += daysInPreviousMonth;
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        const ageResult = { years, months, days };
        setResult(ageResult);

        if (authUser) {
            setSaving(true);

            router.post(
                '/history',
                {
                    calculator_type: 'age',
                    inputs: { birth_date: birthDate, target_date: targetDate },
                    result: `${years} years, ${months} months, ${days} days`,
                },
                {
                    preserveScroll: true,
                    onFinish: () => setSaving(false),
                },
            );
        }
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-[#20242a] p-5 sm:p-7">
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#d69a70]">
                LIFESTYLE TOOL
            </p>
            <h3 className="mb-5 text-xl font-semibold text-white">Age Calculator</h3>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-gray-300">
                    Date of birth
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(event) => setBirthDate(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                    />
                </label>

                <label className="text-sm text-gray-300">
                    Calculate age on
                    <input
                        type="date"
                        value={targetDate}
                        onChange={(event) => setTargetDate(event.target.value)}
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                    />
                </label>
            </div>

            <button
                type="button"
                onClick={calculateAge}
                className="mt-5 rounded-lg bg-[#b87345] px-5 py-3 font-semibold text-white transition hover:bg-[#a66339]"
            >
                Calculate Age
            </button>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            {result && (
                <div className="mt-5 rounded-xl border border-[#b87345]/30 bg-[#b87345]/10 p-5">
                    <p className="text-sm text-gray-300">Your calculated age</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                        {result.years} years, {result.months} months, {result.days} days
                    </p>
                    {saving && <p className="mt-2 text-xs text-gray-400">Saving history...</p>}
                </div>
            )}

            <div className="mt-5">
                <ViewHistoryButton authUser={authUser} />
            </div>
        </div>
    );
}
