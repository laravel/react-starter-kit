<?php

namespace App\Http\Requests\PassTemplate;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePassTemplateRequest extends FormRequest
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
            'name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'design_data' => ['nullable', 'array'],
            'design_data.backgroundColor' => ['nullable', 'string'],
            'design_data.foregroundColor' => ['nullable', 'string'],
            'design_data.labelColor' => ['nullable', 'string'],
            'design_data.headerFields' => ['nullable', 'array'],
            'design_data.primaryFields' => ['nullable', 'array'],
            'design_data.secondaryFields' => ['nullable', 'array'],
            'design_data.auxiliaryFields' => ['nullable', 'array'],
            'design_data.backFields' => ['nullable', 'array'],
            'images' => ['nullable', 'array'],
            'images.originals' => ['nullable', 'array'],
            'images.originals.*.path' => ['required', 'string'],
            'images.originals.*.width' => ['required', 'integer'],
            'images.originals.*.height' => ['required', 'integer'],
            'images.originals.*.mime' => ['required', 'string'],
            'images.originals.*.size_bytes' => ['nullable', 'integer'],
            'images.variants' => ['nullable', 'array'],
            'images.variants.*' => ['array'],
            'images.variants.*.*' => ['array'],
            'images.variants.*.*.*.path' => ['required', 'string'],
            'images.variants.*.*.*.url' => ['nullable', 'string'],
            'images.variants.*.*.*.width' => ['required', 'integer'],
            'images.variants.*.*.*.height' => ['required', 'integer'],
            'images.variants.*.*.*.quality_warning' => ['nullable', 'boolean'],
        ];
    }
}
