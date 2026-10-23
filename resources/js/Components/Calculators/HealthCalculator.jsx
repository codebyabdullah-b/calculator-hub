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

export default function HealthCalculator({ protein = false, authUser }) {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [activity, setActivity] = useState('1.375');
    const [gender, setGender] = useState('male');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    function calculateHealthValue() {
        setError('');
        setResult(null);

        const weightValue = Number(weight);
        const ageValue = Number(age);
        const heightValue = Number(height);

        if (!weight || !age || weightValue <= 0 || ageValue <= 0) {
            setError('Enter a valid weight and age.');
            return;
        }

        let calculated;

        if (protein) {
            calculated = weightValue * 0.8;
        } else {
            if (!height || heightValue <= 0) {
                setError('Enter a valid height in centimetres.');
                return;
            }

            const genderAdjustment = gender === 'male' ? 5 : -161;
            const bmr =
                10 * weightValue +
                6.25 * heightValue -
                5 * ageValue +
                genderAdjustment;

            calculated = bmr * Number(activity);
        }

        const rounded = Math.round(calculated);
        setResult(rounded);

        if (authUser) {
            setSaving(true);

            router.post(
                '/history',
                {
                    calculator_type: protein ? 'protein' : 'calories',
                    inputs: protein
                        ? { weight_kg: weightValue, age: ageValue }
                        : {
                              weight_kg: weightValue,
                              height_cm: heightValue,
                              age: ageValue,
                              gender,
                              activity_level: activity,
                          },
                    result: protein
                        ? `${rounded} g protein/day`
                        : `${rounded} calories/day`,
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
                {protein ? 'NUTRITION TOOL' : 'HEALTH TOOL'}
            </p>
            <h3 className="mb-5 text-xl font-semibold text-white">
                {protein ? 'Protein Calculator' : 'Daily Calories Calculator'}
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-gray-300">
                    Weight (kg)
                    <input
                        type="number"
                        min="1"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                        placeholder="e.g. 65"
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                    />
                </label>

                <label className="text-sm text-gray-300">
                    Age (years)
                    <input
                        type="number"
                        min="1"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                        placeholder="e.g. 25"
                        className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                    />
                </label>

                {!protein && (
                    <>
                        <label className="text-sm text-gray-300">
                            Height (cm)
                            <input
                                type="number"
                                min="1"
                                value={height}
                                onChange={(event) => setHeight(event.target.value)}
                                placeholder="e.g. 170"
                                className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                            />
                        </label>

                        <label className="text-sm text-gray-300">
                            Formula
                            <select
                                value={gender}
                                onChange={(event) => setGender(event.target.value)}
                                className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                            >
                                <option value="male">Male formula</option>
                                <option value="female">Female formula</option>
                            </select>
                        </label>

                        <label className="text-sm text-gray-300 sm:col-span-2">
                            Activity level
                            <select
                                value={activity}
                                onChange={(event) => setActivity(event.target.value)}
                                className="mt-2 w-full rounded-lg border border-white/10 bg-[#15181d] p-3 text-white"
                            >
                                <option value="1.2">Sedentary</option>
                                <option value="1.375">Lightly active</option>
                                <option value="1.55">Moderately active</option>
                                <option value="1.725">Very active</option>
                                <option value="1.9">Extra active</option>
                            </select>
                        </label>
                    </>
                )}
            </div>

            <button
                type="button"
                onClick={calculateHealthValue}
                className="mt-5 rounded-lg bg-[#b87345] px-5 py-3 font-semibold text-white transition hover:bg-[#a66339]"
            >
                Calculate {protein ? 'Protein' : 'Calories'}
            </button>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            {result !== null && (
                <div className="mt-5 rounded-xl border border-[#b87345]/30 bg-[#b87345]/10 p-5">
                    <p className="text-sm text-gray-300">Estimated daily amount</p>
                    <p className="mt-2 text-3xl font-bold text-white">
                        {result.toLocaleString()} {protein ? 'g/day' : 'kcal/day'}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                        {protein
                            ? 'This is a basic estimate, not a personalized medical or sports nutrition plan.'
                            : 'This is an estimate, not a medical recommendation. Individual energy needs vary.'}
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
