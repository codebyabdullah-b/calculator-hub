<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class ContactSubmissionController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $key = 'contact-form:' . $request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            return back()->withErrors([
                'contact' => 'Too many messages submitted. Please try again later.',
            ])->withInput();
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:200'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        RateLimiter::hit($key, 600);

        ContactMessage::create($validated);

        return back()->with('success', 'Your message has been sent successfully.');
    }
}
