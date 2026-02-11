<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class PassImageRequest extends FormRequest
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
        $maxUploadKb = (int) config('passkit.images.max_upload_kb', 1024);

        return [
            'image' => ['required', File::image()->max($maxUploadKb)],
            'slot' => ['required', 'string', 'in:icon,logo,strip,thumbnail,background,footer'],
            'platform' => ['required', 'string', 'in:apple,google'],
            'resize_mode' => ['nullable', 'string', 'in:contain,cover'],
        ];
    }
}
