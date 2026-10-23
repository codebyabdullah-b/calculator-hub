<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Dashboard', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'recentHistory' => $user->calculationHistories()
                ->latest()
                ->limit(5)
                ->get([
                    'id',
                    'calculator_type',
                    'result',
                    'created_at',
                ]),
            'totalCalculations' => $user->calculationHistories()->count(),
        ]);
    }
}
