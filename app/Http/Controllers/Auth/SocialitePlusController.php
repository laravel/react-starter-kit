<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Blaspsoft\SocialitePlus\SocialitePlusFactory;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

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
     *
     * @param SocialitePlusFactory $socialitePlus
     */
    public function __construct(SocialitePlusFactory $socialitePlus)
    {
        $this->socialitePlus = $socialitePlus;
    }

    /**
     * Redirect to the social login page
     *
     * @param string $provider
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
     * @param string $provider
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback(string $provider, Request $request)
    {
        if (!$request->has('code')) return redirect()->route('login')->with('error', 'Invalid request');

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
