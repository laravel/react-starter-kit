<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FileUpload>
 */
class FileUploadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $filename = Str::uuid().'.pdf';

        return [
            'user_id' => User::factory(),
            'filename' => $filename,
            'original_filename' => $this->faker->word().'.pdf',
            'path' => 'uploads/'.$filename,
            'mime_type' => 'application/pdf',
            'size' => $this->faker->numberBetween(1000, 5000000),
            'status' => $this->faker->randomElement(['uploaded', 'processing', 'processed']),
        ];
    }

    /**
     * Indicate that the file is processed.
     */
    public function processed(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'processed',
            ];
        });
    }

    /**
     * Indicate that the file is processing.
     */
    public function processing(): self
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'processing',
            ];
        });
    }
}
