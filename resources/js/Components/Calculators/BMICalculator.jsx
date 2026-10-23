import { useState } from 'react';
import { router } from '@inertiajs/react';

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

export default function BMICalculator({ authUser }) {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    function calculateBMI() {
        setError('');
        setResult(null);

        const weightKg = Number(weight);
        const heightCm = Number(height);

        if (!weight || !height || !Number.isFinite(weightKg) || !Number.isFinite(heightCm) || weightKg <= 0 || heightCm <= 0) {
            setError('Enter a valid weight and height.');
            return;
        }

        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        let category = 'Obesity range';

        if (bmi < 18.5) category = 'Underweight range';
        else if (bmi < 25) category = 'Healthy weight range';
        else if (bmi < 30) category = 'Overweight range';

        const rounded = Number(bmi.toFixed(1));
        setResult({ value: rounded, category });

        if (authUser) {
            setSaving(true);
            router.post(
                '/history',
                {
                    calculator_type: 'bmi',
                    inputs: { weight_kg: weightKg, height_cm: heightCm },
                    result: `BMI ${rounded} (${category})`,
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
                WELLNESS TOOL
            </p>
            <h3 className="mb-5 text-xl font-semibold text-white">BMI Calculator</h3>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-gray-300">
                    Weight (kg)
                    <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                        placeholder="e.g. 65"
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                    />
                </label>

                <label className="text-sm text-gray-300">
                    Height (cm)
                    <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={height}
                        onChange={(event) => setHeight(event.target.value)}
                        placeholder="e.g. 170"
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                    />
                </label>
            </div>

            <button
                type="button"
                onClick={calculateBMI}
                className="mt-5 rounded-lg bg-[#b87345] px-5 py-3 font-semibold text-white transition hover:bg-[#a66339]"
            >
                Calculate BMI
            </button>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            {result && (
                <div className="mt-5 rounded-xl border border-[#b87345]/30 bg-[#b87345]/10 p-5">
                    <p className="text-sm text-gray-300">Your BMI estimate</p>
                    <p className="mt-2 text-3xl font-bold text-white">{result.value}</p>
                    <p className="mt-2 text-sm font-semibold text-[#d69a70]">{result.category}</p>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                        BMI is a screening estimate and does not measure body composition or diagnose health conditions.
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
