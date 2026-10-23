<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CalculationHistory;
use App\Models\ContactMessage;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'totalUsers' => User::count(),
            'totalCalculations' => CalculationHistory::count(),

            'recentCalculations' => CalculationHistory::query()
                ->latest()
                ->limit(10)
                ->get([
                    'id',
                    'calculator_type',
                    'created_at',
                ]),

            'totalContactMessages' => ContactMessage::count(),

            'recentContactMessages' => ContactMessage::query()
                ->latest()
                ->limit(10)
                ->get([
                    'id',
                    'name',
                    'email',
                    'subject',
                    'message',
                    'created_at',
                ]),
        ]);
    }
}
