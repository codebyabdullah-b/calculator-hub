<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAccessSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_admin_dashboard(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/login');
    }

    public function test_normal_user_cannot_access_admin_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin');

        $response->assertForbidden();
    }

    public function test_admin_user_can_access_admin_dashboard(): void
{
    $admin = User::factory()->create();
    $admin->is_admin = true;
    $admin->save();

    $response = $this->actingAs($admin)->get('/admin');

    $response->assertOk();
}
}
