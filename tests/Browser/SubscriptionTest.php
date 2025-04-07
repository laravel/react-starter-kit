<?php

namespace Tests\Browser;

use App\Models\User;
use Laravel\Dusk\Browser;
use PHPUnit\Framework\Assert;
use Tests\DuskTestCase;

class SubscriptionTest extends DuskTestCase
{
    /**
     * Test that a non-subscribed user sees the subscription banner and can navigate to Stripe.
     */
    public function test_user_can_see_subscription_banner_and_navigate_to_stripe(): void
    {
        // Create a user - Don't use DatabaseMigrations to avoid affecting the main DB
        // Use a timestamp to ensure a unique email address
        $timestamp = time();
        $email = "dusk_test_{$timestamp}@example.com";

        $user = User::factory()->create([
            'email' => $email,
            'password' => bcrypt('password'),
        ]);

        try {
            $this->browse(function (Browser $browser) use ($user) {
                $browser->visit('/login')
                    // Fill in login form - using the correct ID selectors
                    ->type('#email', $user->email)
                    ->type('#password', 'password')
                    ->press('Log in')
                    ->waitForLocation('/dashboard')

                    // Check that we're on the dashboard
                    ->assertPathIs('/dashboard')

                    // Verify the subscription banner is visible
                    ->assertSee('Unlock Premium Features')
                    ->assertSee("You don't have an active subscription")

                    // Find and click the Subscribe Now button
                    ->assertSeeIn('.bg-rajah-50', 'Subscribe Now')
                    ->clickLink('Subscribe Now')

                    // Wait for redirect to Stripe
                    ->pause(5000); // Wait for Stripe redirect

                // Get the current URL and check if it contains 'stripe.com'
                $url = $browser->driver->getCurrentURL();
                Assert::assertStringContainsString('stripe.com', $url, "URL does not contain 'stripe.com'");
            });
        } finally {
            // Clean up - always delete the test user to avoid cluttering the database
            $user->delete();
        }
    }
}
