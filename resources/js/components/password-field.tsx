'use client';
import { useField } from '@wandry/inertia-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';

export type InputProps = Omit<React.ComponentProps<'input'>, 'type'>;

export type PasswordFieldProps = InputProps & {
    name: string;
    label?: string;
    labelRight?: React.ReactNode;
    description?: string;
    placeholder?: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
    name,
    label,
    description,
    placeholder,
    labelRight,
    ...inputProps
}) => {
    const [visible, setVisible] = React.useState(false);
    const field = useField(name, { defaultValue: '' });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        field.onChange(value);
    };

    return (
        <Field>
            <FieldLabel htmlFor={name}>
                {label}
                {labelRight}
            </FieldLabel>
            <InputGroup>
                <InputGroupInput
                    id={name}
                    name={name}
                    value={field.value}
                    onChange={onChange}
                    type={visible ? 'text' : 'password'}
                    {...inputProps}
                />

                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        aria-label="Toggle visibility"
                        onClick={() => setVisible(!visible)}
                        size="icon-xs"
                        variant="ghost"
                    >
                        {visible ? <EyeOffIcon /> : <EyeIcon />}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
            <FieldDescription>{description}</FieldDescription>
            <FieldError>{field.error}</FieldError>
        </Field>
    );
};

export default PasswordField;
