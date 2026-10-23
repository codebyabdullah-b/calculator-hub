
<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CalculationHistoryController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactSubmissionController;

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::post('/contact', [ContactSubmissionController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact.store');
    
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');


Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/', function () {
    return Inertia::render('Home', [
        'initialCalculator' => 'scientific',
        'dedicatedPage' => false,
    ]);
})->name('home');

// Dedicated calculator pages
Route::get('/scientific-calculator', function () {
    return Inertia::render('Home', [
        'initialCalculator' => 'scientific',
        'dedicatedPage' => true,
    ]);
})->name('calculators.scientific');

Route::get('/age-calculator', function () {
    return Inertia::render('Home', [
        'initialCalculator' => 'age',
        'dedicatedPage' => true,
    ]);
})->name('calculators.age');

Route::get('/calories-calculator', function () {
    return Inertia::render('Home', [
        'initialCalculator' => 'calories',
        'dedicatedPage' => true,
    ]);
})->name('calculators.calories');

Route::get('/protein-calculator', function () {
    return Inertia::render('Home', [
        'initialCalculator' => 'protein',
        'dedicatedPage' => true,
    ]);
})->name('calculators.protein');

// Guest authentication routes
Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister'])
        ->name('register');

    Route::post('/register', [AuthController::class, 'register'])
        ->middleware('throttle:5,1');

    Route::get('/login', [AuthController::class, 'showLogin'])
        ->name('login');

    Route::post('/login', [AuthController::class, 'login'])
        ->name('login.store');
});

// Logout
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

// Authenticated user routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::post('/history', [
        CalculationHistoryController::class,
        'store',
    ])->name('history.store');

    Route::get('/history', [CalculationHistoryController::class, 'index'])
        ->name('history.index');

    Route::delete('/history/{calculationHistory}', [
        CalculationHistoryController::class,
        'destroy',
    ])->name('history.destroy');
});

// Admin routes
Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'can:access-admin'])
    ->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])
            ->name('dashboard');
    });
    
