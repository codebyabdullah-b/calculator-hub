<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_rejects_an_incorrect_password(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'CorrectPassword123!',
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'WrongPassword123!',
        ]);

        $response->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_login_is_rate_limited_after_repeated_failures(): void
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => 'CorrectPassword123!',
        ]);

        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->post('/login', [
                'email' => $user->email,
                'password' => 'WrongPassword123!',
            ]);
        }

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'WrongPassword123!',
        ]);

        $response->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_registration_rejects_an_existing_email(): void
    {
        User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'existing@example.com',
            'password' => 'SecurePassword123!',
            'password_confirmation' => 'SecurePassword123!',
        ]);

        $response->assertSessionHasErrors('email');

        $this->assertGuest();
    }

    public function test_registration_rejects_mismatched_password_confirmation(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'newuser@example.com',
            'password' => 'SecurePassword123!',
            'password_confirmation' => 'DifferentPassword123!',
        ]);

        $response->assertSessionHasErrors('password');

        $this->assertGuest();
    }
}
