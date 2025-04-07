<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Blaspsoft\SocialitePlus\SocialitePlusFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SocialitePlusController extends Controller
{
    /**
     * The SocialitePlusManager instance.
     *
     * @var SocialitePlusFactory
     */
    protected $socialitePlus;

    /**
     * Create a new SocialLoginController instance.
     */
    public function __construct(SocialitePlusFactory $socialitePlus)
    {
        $this->socialitePlus = $socialitePlus;
    }

    /**
     * Redirect to the social login page
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirect(string $provider)
    {
        try {
            return $this->socialitePlus->build($provider)->redirect();
        } catch (\Exception $e) {

            return redirect()->route('login')->with('error', $e->getMessage());
        }
    }

    /**
     * Handle the social login callback
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback(string $provider, Request $request)
    {
        if (! $request->has('code')) {
            return redirect()->route('login')->with('error', 'Invalid request');
        }

        $user = $this->socialitePlus->build($provider)->user();

        $existingUser = User::where('email', $user->getEmail())->first();

        if ($existingUser) {
            Auth::login($existingUser);

            return redirect()->intended('/dashboard');
        }

        $newUser = User::create([
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'password' => bcrypt('password'),
        ]);

        Auth::login($newUser);

        return redirect()->intended('/dashboard');
    }
}
