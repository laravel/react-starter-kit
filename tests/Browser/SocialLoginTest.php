<?php

namespace Tests\Browser;

use Laravel\Dusk\Browser;
use PHPUnit\Framework\Assert;
use Tests\DuskTestCase;

class SocialLoginTest extends DuskTestCase
{
    /**
     * Test Google login button redirects to Google.
     *
     * @return void
     */
    public function test_google_login()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->click('@Google-login-button') // Using the Dusk selector
                ->pause(2000); // Wait for the redirect to complete

            // Get the current URL and check if it contains 'google.com'
            $url = $browser->driver->getCurrentURL();
            Assert::assertStringContainsString('google.com', $url, "URL does not contain 'google.com'");
        });
    }

    /**
     * Test Facebook login button redirects to Facebook.
     *
     * @return void
     */
    public function test_facebook_login()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->click('@Facebook-login-button') // Using the Dusk selector
                ->pause(2000); // Wait for the redirect to complete

            // Get the current URL and check if it contains 'facebook.com'
            $url = $browser->driver->getCurrentURL();
            Assert::assertStringContainsString('facebook.com', $url, "URL does not contain 'facebook.com'");
        });
    }
}
