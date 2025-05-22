<?php

namespace App\Http\Requests\LegalEntity;

use Illuminate\Foundation\Http\FormRequest;

class StoreLegalEntityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // En un sistema con autenticación, aquí se aplicaría la lógica de autorización
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'rif' => 'required|string|max:15|unique:legal_entities,rif',
            'business_name' => 'required|string|max:255',
            'trade_name' => 'nullable|string|max:255',
            'legal_entity_type' => 'required|in:sociedad_anonima,compania_anonima,sociedad_de_responsabilidad_limitada,cooperativa,fundacion,asociacion_civil,otro',
            'registration_number' => 'nullable|string|max:50|unique:legal_entities,registration_number',
            'registration_date' => 'nullable|date',
            'fiscal_address_line_1' => 'required|string|max:255',
            'fiscal_address_line_2' => 'nullable|string|max:255',
            'fiscal_city' => 'required|string|max:100',
            'fiscal_state' => 'required|string|max:100',
            'fiscal_country' => 'nullable|string|max:100',
            'email_1' => 'nullable|email|max:255|unique:legal_entities,email_1',
            'email_2' => 'nullable|email|max:255|unique:legal_entities,email_2',
            'phone_number_1' => 'nullable|string|max:20',
            'phone_number_2' => 'nullable|string|max:20',
            'website' => 'nullable|string|max:255',
            'legal_representative_id' => 'nullable|exists:individuals,id',
        ];
    }
    
    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'rif.required' => 'El RIF es obligatorio.',
            'rif.unique' => 'Este RIF ya está registrado.',
            'business_name.required' => 'El nombre comercial es obligatorio.',
            'legal_entity_type.required' => 'El tipo de entidad legal es obligatorio.',
            'registration_number.unique' => 'Este número de registro ya está registrado.',
            'fiscal_address_line_1.required' => 'La dirección fiscal es obligatoria.',
            'fiscal_city.required' => 'La ciudad de la dirección fiscal es obligatoria.',
            'fiscal_state.required' => 'El estado de la dirección fiscal es obligatorio.',
            'email_1.email' => 'El correo electrónico principal debe ser una dirección válida.',
            'email_1.unique' => 'Este correo electrónico ya está registrado.',
            'email_2.email' => 'El correo electrónico secundario debe ser una dirección válida.',
            'email_2.unique' => 'Este correo electrónico ya está registrado.',
            'legal_representative_id.exists' => 'El representante legal seleccionado no existe.',
        ];
    }
} 