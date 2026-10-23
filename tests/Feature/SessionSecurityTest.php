<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class SessionSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_login_regenerates_the_session(): void
    {
        $user = User::factory()->create([
            'email' => 'session@example.com',
            'password' => 'SecurePassword123!',
        ]);

        $response = $this->post('/login', [
            'email' => 'session@example.com',
            'password' => 'SecurePassword123!',
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertAuthenticatedAs($user);
    }

    public function test_logout_logs_the_user_out(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $response->assertRedirect('/');
        $this->assertGuest();
    }

    public function test_logout_route_rejects_guests(): void
    {
        $response = $this->post('/logout');

        $response->assertRedirect('/login');
    }
}
