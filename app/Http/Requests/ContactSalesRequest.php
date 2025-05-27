<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactSalesRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'company' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'company_type' => ['nullable', 'string', 'max:255'],
            'interest' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:2000'],
            'estimated_users' => ['nullable', 'string', 'max:50'],
            'timeline' => ['nullable', 'string', 'max:100'],
            'budget_range' => ['nullable', 'string', 'max:100'],
            'subscribe_newsletter' => ['boolean'],
            'subscribe_updates' => ['boolean'],
            'subscribe_offers' => ['boolean'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please provide your full name.',
            'email.required' => 'A valid business email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'company.required' => 'Please provide your company name.',
            'phone.max' => 'Phone number cannot exceed 20 characters.',
            'message.max' => 'Message cannot exceed 2000 characters.',
        ];
    }

    /**
     * Get custom attribute names for error messages.
     */
    public function attributes(): array
    {
        return [
            'name' => 'full name',
            'email' => 'email address',
            'phone' => 'phone number',
            'company' => 'company name',
            'position' => 'job title',
            'company_type' => 'company type',
            'interest' => 'primary interest',
            'message' => 'additional details',
            'estimated_users' => 'estimated users',
            'timeline' => 'implementation timeline',
            'budget_range' => 'budget range',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'subscribe_newsletter' => $this->boolean('subscribe_newsletter'),
            'subscribe_updates' => $this->boolean('subscribe_updates'),
            'subscribe_offers' => $this->boolean('subscribe_offers'),
        ]);
    }
}
