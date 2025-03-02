<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdategalleryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => 'sometimes|image|max:5120',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'alt' => 'sometimes|string|max:255',
        ];
    }
}
