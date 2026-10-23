import { useState } from 'react';
import { router } from '@inertiajs/react';
import {
    evaluate,
    parse,
    format,
    fraction,
    factorial,
} from 'mathjs';

const buttonBase =
    'flex min-h-[48px] items-center justify-center rounded-lg border px-2 py-3 text-sm font-semibold transition duration-150 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50';

function ViewHistoryButton({ authUser }) {
    return (
        <button
            type="button"
            onClick={() => router.visit(authUser ? '/history' : '/login')}
            className="rounded-lg border border-[#b87345]/40 px-4 py-2 text-sm text-[#d69a70] transition hover:bg-[#b87345]/10"
        >
            {authUser ? 'View History' : 'Login to save history'}
        </button>
    );
}

export default function ScientificCalculator({ authUser }) {
    const [expression, setExpression] = useState('');
    const [display, setDisplay] = useState('0');
    const [lastResult, setLastResult] = useState(0);
    const [angleMode, setAngleMode] = useState('DEG');
    const [shiftOn, setShiftOn] = useState(false);
    const [alphaOn, setAlphaOn] = useState(false);
    const [showFraction, setShowFraction] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    function insert(value) {
        setExpression((current) => {
            if (value === 'Ans') {
                return current + String(lastResult);
            }

            if (current === '' && ['+', '*', '/', '^'].includes(value)) {
                return current;
            }

            return current + value;
        });

        setDisplay((current) => {
            if (value === 'π') return current === '0' ? 'π' : current + 'π';
            if (value === 'e') return current === '0' ? 'e' : current + 'e';

            if (value === 'Ans') {
                return current === '0'
                    ? String(lastResult)
                    : current + String(lastResult);
            }

            return current === '0' ? value : current + value;
        });

        setShowFraction(false);
        setSaveMessage('');
    }

    function clearAll() {
        setExpression('');
        setDisplay('0');
        setShowFraction(false);
        setSaveMessage('');
    }

    function deleteLast() {
        setExpression((current) => current.slice(0, -1));
        setDisplay((current) =>
            current.length <= 1 ? '0' : current.slice(0, -1),
        );
        setShowFraction(false);
        setSaveMessage('');
    }

    function calculate() {
        const original = expression.trim();

        if (!original) return;

        const input = original
            .replace(/π/g, 'pi')
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');

        if (!/^[0-9a-zA-Z_+\-*/^().,!%\s]+$/.test(input)) {
            setSaveMessage('Please enter a valid mathematical expression.');
            return;
        }

        const allowedSymbols = new Set([
            'pi', 'e', 'Ans', 'ans',
            'sin', 'cos', 'tan',
            'asin', 'acos', 'atan',
            'sqrt', 'cbrt', 'abs',
            'log', 'log10', 'ln',
            'factorial', 'exp',
        ]);

        try {
            const parsed = parse(input);
            let invalidSymbol = false;

            parsed.traverse((node) => {
                if (node.isSymbolNode && !allowedSymbols.has(node.name)) {
                    invalidSymbol = true;
                }

                if (
                    node.isAssignmentNode ||
                    node.isAccessorNode ||
                    node.isArrayNode ||
                    node.isObjectNode ||
                    node.isBlockNode
                ) {
                    invalidSymbol = true;
                }
            });

            if (invalidSymbol) {
                setSaveMessage(
                    'This expression contains an unsupported operation.',
                );
                return;
            }

            const toRadians = (value) =>
                angleMode === 'DEG' ? (value * Math.PI) / 180 : value;

            const fromRadians = (value) =>
                angleMode === 'DEG' ? (value * 180) / Math.PI : value;

            const scope = {
                Ans: lastResult,
                ans: lastResult,
                sin: (value) => Math.sin(toRadians(Number(value))),
                cos: (value) => Math.cos(toRadians(Number(value))),
                tan: (value) => Math.tan(toRadians(Number(value))),
                asin: (value) => fromRadians(Math.asin(Number(value))),
                acos: (value) => fromRadians(Math.acos(Number(value))),
                atan: (value) => fromRadians(Math.atan(Number(value))),
                sqrt: (value) => Math.sqrt(Number(value)),
                cbrt: (value) => Math.cbrt(Number(value)),
                abs: (value) => Math.abs(Number(value)),
                log: (value) => Math.log10(Number(value)),
                log10: (value) => Math.log10(Number(value)),
                ln: (value) => Math.log(Number(value)),
                factorial: (value) => factorial(Number(value)),
                exp: (value) => Math.exp(Number(value)),
            };

            const result = evaluate(input, scope);

            if (
                typeof result !== 'number' &&
                !(result && typeof result.toNumber === 'function')
            ) {
                setSaveMessage(
                    'Please enter a complete numerical expression.',
                );
                return;
            }

            const numericResult =
                typeof result === 'number' ? result : result.toNumber();

            if (!Number.isFinite(numericResult)) {
                setSaveMessage('The result is not a finite number.');
                return;
            }

            const formatted = format(result, { precision: 14 });

            setDisplay(formatted);
            setLastResult(numericResult);
            setExpression(formatted);
            setShowFraction(false);
            setSaveMessage('');

            if (authUser) {
                setSaving(true);

                router.post(
                    '/history',
                    {
                        calculator_type: 'scientific',
                        inputs: {
                            expression: original,
                            angle_mode: angleMode,
                        },
                        result: String(numericResult),
                    },
                    {
                        preserveScroll: true,
                        onSuccess: () =>
                            setSaveMessage(
                                'Calculation saved to your history.',
                            ),
                        onError: () =>
                            setSaveMessage(
                                'Calculation completed, but history could not be saved.',
                            ),
                        onFinish: () => setSaving(false),
                    },
                );
            }
        } catch {
            setSaveMessage(
                'Invalid expression. Check your numbers, brackets and operators.',
            );
        }
    }

    function showFractionOrDecimal() {
        try {
            const value = Number(display.replace(/,/g, ''));

            if (!Number.isFinite(value)) return;

            if (showFraction) {
                setDisplay(format(value, { precision: 14 }));
                setShowFraction(false);
            } else {
                const fractionResult = fraction(value);
                setDisplay(fractionResult.toFraction());
                setShowFraction(true);
            }
        } catch {
            setSaveMessage(
                'This result could not be converted to a fraction.',
            );
        }
    }

    function handleKey(key) {
        setSaveMessage('');

        if (key === 'SHIFT') {
            setShiftOn((current) => !current);
            setAlphaOn(false);
            return;
        }

        if (key === 'ALPHA') {
            setAlphaOn((current) => !current);
            setShiftOn(false);
            return;
        }

        if (key === 'DEG/RAD') {
            setAngleMode((current) =>
                current === 'DEG' ? 'RAD' : 'DEG',
            );
            setShiftOn(false);
            setAlphaOn(false);
            return;
        }

        if (key === 'AC') {
            clearAll();
            return;
        }

        if (key === 'DEL') {
            deleteLast();
            return;
        }

        if (key === '=') {
            calculate();
            setShiftOn(false);
            setAlphaOn(false);
            return;
        }

        if (key === 'S⇔D') {
            showFractionOrDecimal();
            setShiftOn(false);
            setAlphaOn(false);
            return;
        }

        if (alphaOn) {
            const alphaValues = {
                sin: 'π',
                cos: 'e',
                tan: 'Ans',
                log: '%',
                ln: '!',
            };

            insert(alphaValues[key] || key);
            setAlphaOn(false);
            return;
        }

        if (key === 'sin' || key === 'cos' || key === 'tan') {
            const fn = shiftOn ? `a${key}` : key;
            insert(`${fn}(`);
        } else if (key === '√') {
            insert(shiftOn ? 'cbrt(' : 'sqrt(');
        } else if (key === 'x²') {
            insert(shiftOn ? '^3' : '^2');
        } else if (key === 'xʸ') {
            insert('^(');
        } else if (key === 'log') {
            insert(shiftOn ? '10^(' : 'log10(');
        } else if (key === 'ln') {
            insert(shiftOn ? 'exp(' : 'ln(');
        } else if (key === 'x!') {
            insert('!');
        } else if (key === 'EXP') {
            insert('*10^(');
        } else if (key === 'a b/c') {
            insert('(');
        } else if (key === 'Ans') {
            insert('Ans');
        } else if (key === '(-)') {
            insert('-');
        } else if (key === 'π') {
            insert('π');
        } else {
            insert(key);
        }

        setShiftOn(false);
    }

    const keys = [
        { label: 'SHIFT', kind: 'mode' },
        { label: 'ALPHA', kind: 'mode' },
        { label: 'DEG/RAD', kind: 'mode' },
        { label: 'S⇔D', kind: 'mode' },
        { label: 'AC', kind: 'danger' },

        { label: 'sin', kind: 'function' },
        { label: 'cos', kind: 'function' },
        { label: 'tan', kind: 'function' },
        { label: '√', kind: 'function' },
        { label: 'DEL', kind: 'danger' },

        { label: 'x²', kind: 'function' },
        { label: 'xʸ', kind: 'function' },
        { label: 'log', kind: 'function' },
        { label: 'ln', kind: 'function' },
        { label: '÷', kind: 'operator' },

        { label: '(', kind: 'function' },
        { label: ')', kind: 'function' },
        { label: 'x!', kind: 'function' },
        { label: 'π', kind: 'function' },
        { label: '×', kind: 'operator' },

        { label: '7', kind: 'number' },
        { label: '8', kind: 'number' },
        { label: '9', kind: 'number' },
        { label: 'EXP', kind: 'function' },
        { label: '−', kind: 'operator' },

        { label: '4', kind: 'number' },
        { label: '5', kind: 'number' },
        { label: '6', kind: 'number' },
        { label: 'Ans', kind: 'function' },
        { label: '+', kind: 'operator' },

        { label: '1', kind: 'number' },
        { label: '2', kind: 'number' },
        { label: '3', kind: 'number' },
        { label: 'a b/c', kind: 'function' },
        { label: '=', kind: 'equals' },

        { label: '0', kind: 'number' },
        { label: '.', kind: 'number' },
        { label: '(-)', kind: 'operator' },
    ];

    function keyClass(kind, label) {
        if (kind === 'mode') {
            const active =
                (label === 'SHIFT' && shiftOn) ||
                (label === 'ALPHA' && alphaOn);

            return active
                ? 'border-[#b87345] bg-[#b87345] text-white'
                : 'border-[#59616b] bg-[#343a42] text-[#f0c4a3] hover:bg-[#424a54]';
        }

        if (kind === 'danger') {
            return 'border-red-900/60 bg-[#542d2a] text-red-100 hover:bg-[#713b35]';
        }

        if (kind === 'equals') {
            return 'border-[#b87345] bg-[#b87345] text-white hover:bg-[#a66339]';
        }

        if (kind === 'operator') {
            return 'border-[#8e5c3e]/60 bg-[#49362d] text-[#f3c7a8] hover:bg-[#624636]';
        }

        if (kind === 'function') {
            return 'border-[#4a515b] bg-[#30363e] text-[#e5e7eb] hover:bg-[#424a54]';
        }

        return 'border-[#3c424b] bg-[#252a31] text-white hover:bg-[#353c45]';
    }

    return (
        <div className="mx-auto w-full max-w-3xl">
            <div className="overflow-hidden rounded-2xl border border-[#454b53] bg-[#1b1f24] p-3 shadow-2xl sm:p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <p className="text-xs font-bold tracking-[0.2em] text-[#d69a70]">
                            SCIENTIFIC
                        </p>
                        <h3 className="text-lg font-semibold text-white">
                            Advanced Calculator
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] font-bold tracking-wider">
                        <span className="rounded border border-[#b87345]/50 bg-[#b87345]/10 px-2 py-1 text-[#e7b08c]">
                            {angleMode}
                        </span>
                        <span
                            className={`rounded border px-2 py-1 ${
                                shiftOn
                                    ? 'border-[#b87345] text-[#e7b08c]'
                                    : 'border-[#414751] text-gray-500'
                            }`}
                        >
                            SHIFT
                        </span>
                        <span
                            className={`rounded border px-2 py-1 ${
                                alphaOn
                                    ? 'border-[#b87345] text-[#e7b08c]'
                                    : 'border-[#414751] text-gray-500'
                            }`}
                        >
                            ALPHA
                        </span>
                    </div>
                </div>

                <div className="mb-4 rounded-xl border border-[#6d8a68]/40 bg-[#c7d6b4] p-3 text-right text-[#20271d] shadow-inner sm:p-4">
                    <p className="min-h-5 break-all text-xs text-[#475342] sm:text-sm">
                        {expression || ' '}
                    </p>
                    <p className="min-h-10 break-all pt-1 font-mono text-2xl font-bold sm:text-4xl">
                        {display}
                    </p>
                    <p className="mt-1 text-[10px] tracking-wider text-[#475342]">
                        CASIO-STYLE SCIENTIFIC MODE
                    </p>
                </div>

                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {keys.map((key, index) => (
                        <button
                            key={`${key.label}-${index}`}
                            type="button"
                            onClick={() => handleKey(key.label)}
                            className={`${buttonBase} ${keyClass(
                                key.kind,
                                key.label,
                            )} ${
                                key.label === '='
                                    ? 'min-h-[54px] text-lg'
                                    : ''
                            }`}
                        >
                            {key.label}
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#343a42] pt-4">
                    <p className="text-xs text-gray-400">
                        {saving
                            ? 'Saving calculation...'
                            : authUser
                              ? 'Your completed calculations are saved to your account.'
                              : 'Login to save calculations to your account.'}
                    </p>
                    <ViewHistoryButton authUser={authUser} />
                </div>

                {saveMessage && (
                    <p
                        role="status"
                        className="mt-3 rounded-lg border border-[#b87345]/30 bg-[#b87345]/10 p-3 text-sm text-[#e5b38f]"
                    >
                        {saveMessage}
                    </p>
                )}

                <p className="mt-4 text-xs leading-5 text-gray-500">
                    Supports standard arithmetic, brackets, trigonometry,
                    logarithms, roots, powers, factorial and scientific
                    notation. Use SHIFT for alternate scientific functions and
                    S⇔D to switch result format.
                </p>
            </div>
        </div>
    );
}
