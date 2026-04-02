<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrdersTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login_page_for_orders()
    {
        $response = $this->get(route('orders.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_orders_page()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get(route('orders.index'));

        $response->assertOk();
    }
}
