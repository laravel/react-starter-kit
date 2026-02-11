<?php

namespace App\Http\Requests\Pass;

use Illuminate\Foundation\Http\FormRequest;

class StorePassRequest extends FormRequest
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
            'platforms' => ['required', 'array', 'min:1'],
            'platforms.*' => ['required', 'string', 'in:apple,google'],
            'pass_type' => ['required', 'string', 'in:generic,coupon,boardingPass,eventTicket,storeCard,loyalty,offer,transit,stampCard'],
            'pass_template_id' => ['nullable', 'exists:pass_templates,id'],
            'pass_data' => ['required', 'array'],
            'pass_data.description' => ['required', 'string', 'max:255'],
            'pass_data.backgroundColor' => ['nullable', 'string'],
            'pass_data.foregroundColor' => ['nullable', 'string'],
            'pass_data.labelColor' => ['nullable', 'string'],
            'pass_data.headerFields' => ['nullable', 'array'],
            'pass_data.primaryFields' => ['nullable', 'array'],
            'pass_data.secondaryFields' => ['nullable', 'array'],
            'pass_data.auxiliaryFields' => ['nullable', 'array'],
            'pass_data.backFields' => ['nullable', 'array'],
            'pass_data.transitType' => ['nullable', 'string'],
            'barcode_data' => ['nullable', 'array'],
            'barcode_data.format' => ['nullable', 'string', 'in:PKBarcodeFormatQR,PKBarcodeFormatPDF417,PKBarcodeFormatAztec,PKBarcodeFormatCode128'],
            'barcode_data.message' => ['nullable', 'string'],
            'barcode_data.messageEncoding' => ['nullable', 'string'],
            'barcode_data.altText' => ['nullable', 'string'],
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
