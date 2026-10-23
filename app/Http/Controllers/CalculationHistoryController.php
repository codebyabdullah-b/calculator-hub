<?php

namespace App\Http\Controllers;

use App\Models\CalculationHistory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CalculationHistoryController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'calculator_type' => [
                'required',
                'string',
                Rule::in(['scientific', 'age', 'calories', 'protein']),
            ],
            'inputs' => ['required', 'array', 'max:30'],
            'result' => ['required', 'string', 'max:2000'],
        ]);

        $request->user()->calculationHistories()->create($validated);

        return redirect()
            ->back()
            ->with('success', 'Calculation saved to your history.');
    }

    public function index(Request $request): Response
    {
        $history = $request->user()
            ->calculationHistories()
            ->latest()
            ->paginate(15);

        return Inertia::render('History/Index', [
            'history' => $history,
        ]);
    }

    public function destroy(
        Request $request,
        CalculationHistory $calculationHistory
    ): RedirectResponse {
        $history = $request->user()
            ->calculationHistories()
            ->findOrFail($calculationHistory->id);

        $history->delete();

        return redirect()
            ->route('history.index')
            ->with('success', 'Calculation deleted successfully.');
    }
}
