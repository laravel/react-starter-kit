<?php

namespace App\Http\Requests\Individual;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIndividualRequest extends FormRequest
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
        $id = $this->route('individual');
        
        return [
            'national_id' => 'required|string|max:20|unique:individuals,national_id,'.$id,
            'passport' => 'nullable|string|max:30|unique:individuals,passport,'.$id,
            'first_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'last_name' => 'required|string|max:100',
            'second_last_name' => 'nullable|string|max:100',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|in:male,female,other',
            'civil_status' => 'nullable|in:single,married,divorced,widowed,cohabiting',
            'rif' => 'nullable|string|max:15|unique:individuals,rif,'.$id,
            'email_1' => 'nullable|email|max:255|unique:individuals,email_1,'.$id,
            'email_2' => 'nullable|email|max:255|unique:individuals,email_2,'.$id,
            'phone_number_1' => 'nullable|string|max:20',
            'phone_number_2' => 'nullable|string|max:20',
            'address_line_1' => 'nullable|string|max:255',
            'address_line_2' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'nationality' => 'nullable|string|max:100',
            'occupation' => 'nullable|string|max:100',
            'educational_level' => 'nullable|string|max:100',
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
            'national_id.required' => 'La cédula de identidad es obligatoria.',
            'national_id.unique' => 'Esta cédula de identidad ya está registrada.',
            'first_name.required' => 'El primer nombre es obligatorio.',
            'last_name.required' => 'El primer apellido es obligatorio.',
            'passport.unique' => 'Este número de pasaporte ya está registrado.',
            'rif.unique' => 'Este RIF ya está registrado.',
            'email_1.email' => 'El correo electrónico principal debe ser una dirección válida.',
            'email_1.unique' => 'Este correo electrónico ya está registrado.',
            'email_2.email' => 'El correo electrónico secundario debe ser una dirección válida.',
            'email_2.unique' => 'Este correo electrónico ya está registrado.',
        ];
    }
} 