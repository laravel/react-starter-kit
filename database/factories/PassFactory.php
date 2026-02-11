<?php

namespace Database\Factories;

use App\Models\Pass;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pass>
 */
class PassFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Pass::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $passTypes = ['generic', 'coupon', 'eventTicket', 'boardingPass', 'storeCard', 'loyalty', 'stampCard'];
        $platforms = ['apple', 'google'];
        $passType = fake()->randomElement($passTypes);

        return [
            'user_id' => User::factory(),
            'pass_template_id' => null,
            'platforms' => [fake()->randomElement($platforms)],
            'pass_type' => $passType,
            'serial_number' => Str::uuid()->toString(),
            'status' => 'active',
            'pass_data' => [
                'description' => fake()->sentence(),
                'backgroundColor' => 'rgb('.fake()->numberBetween(0, 255).','.fake()->numberBetween(0, 255).','.fake()->numberBetween(0, 255).')',
                'foregroundColor' => 'rgb(255,255,255)',
                'labelColor' => 'rgb(200,200,200)',
                'headerFields' => [
                    ['key' => 'header1', 'label' => 'Header', 'value' => 'Value'],
                ],
                'primaryFields' => [
                    ['key' => 'primary1', 'label' => 'Primary', 'value' => fake()->word()],
                ],
                'secondaryFields' => [
                    ['key' => 'secondary1', 'label' => 'Label', 'value' => fake()->word()],
                    ['key' => 'secondary2', 'label' => 'Date', 'value' => fake()->date()],
                ],
                'auxiliaryFields' => [
                    ['key' => 'aux1', 'label' => 'Info', 'value' => fake()->word()],
                ],
                'backFields' => [
                    ['key' => 'terms', 'label' => 'Terms', 'value' => fake()->paragraph()],
                ],
            ],
            'barcode_data' => [
                'format' => 'PKBarcodeFormatQR',
                'message' => Str::uuid()->toString(),
                'messageEncoding' => 'iso-8859-1',
                'altText' => fake()->numerify('####-####-####'),
            ],
            'images' => null,
            'pkpass_path' => null,
            'google_save_url' => null,
            'google_class_id' => null,
            'google_object_id' => null,
            'last_generated_at' => null,
        ];
    }

    /**
     * Indicate that the pass is for Apple Wallet.
     */
    public function apple(): static
    {
        return $this->state(fn (array $attributes) => [
            'platforms' => ['apple'],
        ]);
    }

    /**
     * Indicate that the pass is for Google Wallet.
     */
    public function google(): static
    {
        return $this->state(fn (array $attributes) => [
            'platforms' => ['google'],
        ]);
    }

    /**
     * Indicate that the pass is voided.
     */
    public function voided(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'voided',
        ]);
    }

    /**
     * Indicate that the pass is expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'expired',
        ]);
    }
}
