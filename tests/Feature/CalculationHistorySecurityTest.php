<?php

namespace Tests\Feature;

use App\Models\CalculationHistory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CalculationHistorySecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_calculation_history(): void
    {
        $response = $this->get('/history');

        $response->assertRedirect('/login');
    }

    public function test_user_cannot_view_another_users_history(): void
    {
        $owner = User::factory()->create();
        $anotherUser = User::factory()->create();

       $history = $owner->calculationHistories()->create([
    'calculator_type' => 'scientific',
    'inputs' => ['expression' => '2 + 3'],
    'result' => '5',
]);

        $response = $this->actingAs($anotherUser)
            ->delete('/history/' . $history->id);

        $response->assertNotFound();

        $this->assertDatabaseHas('calculation_histories', [
            'id' => $history->id,
            'user_id' => $owner->id,
            'result' => '5',
        ]);
    }

    public function test_user_can_view_their_own_history_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/history');

        $response->assertOk();
    }

    public function test_user_can_delete_their_own_history(): void
    {
        $user = User::factory()->create();

        $history = $user->calculationHistories()->create([
            'calculator_type' => 'scientific',
            'inputs' => ['expression' => '2 + 3'],
            'result' => '5',
        ]);

        $response = $this->actingAs($user)
            ->delete('/history/' . $history->id);

        $response->assertRedirect('/history');

        $this->assertDatabaseMissing('calculation_histories', [
            'id' => $history->id,
        ]);
    }
}
