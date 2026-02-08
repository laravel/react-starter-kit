<?php

namespace Database\Factories;

use App\Models\PassTemplate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PassTemplate>
 */
class PassTemplateFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = PassTemplate::class;

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
            'name' => fake()->words(3, true) . ' Template',
            'description' => fake()->sentence(),
            'pass_type' => $passType,
            'platform' => fake()->randomElement($platforms),
            'design_data' => [
                'backgroundColor' => 'rgb(' . fake()->numberBetween(0, 255) . ',' . fake()->numberBetween(0, 255) . ',' . fake()->numberBetween(0, 255) . ')',
                'foregroundColor' => 'rgb(255,255,255)',
                'labelColor' => 'rgb(200,200,200)',
                'headerFields' => [
                    ['key' => 'header1', 'label' => 'Header', 'value' => 'Value'],
                ],
                'primaryFields' => [
                    ['key' => 'primary1', 'label' => 'Primary', 'value' => fake()->word()],
                ],
                'secondaryFields' => [
                    ['key' => 'secondary1', 'label' => 'Secondary', 'value' => fake()->word()],
                ],
                'auxiliaryFields' => [],
                'backFields' => [
                    ['key' => 'terms', 'label' => 'Terms and Conditions', 'value' => fake()->paragraph()],
                ],
            ],
            'images' => null,
        ];
    }
}
