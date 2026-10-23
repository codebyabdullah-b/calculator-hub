<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CalculationHistoryValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_invalid_calculator_type_is_rejected(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/history', [
            'calculator_type' => 'unknown-calculator',
            'inputs' => ['expression' => '2 + 3'],
            'result' => '5',
        ]);

        $response->assertSessionHasErrors('calculator_type');

        $this->assertDatabaseCount('calculation_histories', 0);
    }

    public function test_missing_inputs_are_rejected(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/history', [
            'calculator_type' => 'scientific',
            'result' => '5',
        ]);

        $response->assertSessionHasErrors('inputs');

        $this->assertDatabaseCount('calculation_histories', 0);
    }

    public function test_result_longer_than_allowed_limit_is_rejected(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/history', [
            'calculator_type' => 'scientific',
            'inputs' => ['expression' => '2 + 3'],
            'result' => str_repeat('5', 2001),
        ]);

        $response->assertSessionHasErrors('result');

        $this->assertDatabaseCount('calculation_histories', 0);
    }

    public function test_guest_cannot_save_calculation_history(): void
    {
        $response = $this->post('/history', [
            'calculator_type' => 'scientific',
            'inputs' => ['expression' => '2 + 3'],
            'result' => '5',
        ]);

        $response->assertRedirect('/login');

        $this->assertDatabaseCount('calculation_histories', 0);
    }
}
