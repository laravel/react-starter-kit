'use client';

import * as React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/components/ui/field';
import { cn } from '@/lib/utils';
import { useField } from '@wandry/inertia-form';

type CheckboxFieldClasses = {
    field?: string;
    checkbox?: string;
    label?: string;
    description?: string;
    error?: string;
};

export type CheckboxFieldProps = {
    name: string;
    label?: string;
    description?: string;
    classes?: CheckboxFieldClasses;
    orientation?: 'vertical' | 'horizontal' | 'responsive';
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
    name,
    label,
    description,
    classes,
    orientation = 'horizontal',
}) => {
    const field = useField(name, { defaultValue: false });

    return (
        <Field orientation={orientation} className={classes?.field}>
            <Checkbox
                id={name}
                name={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                className={classes?.checkbox}
            />
            <FieldLabel
                htmlFor={name}
                className={cn('font-normal', classes?.label)}
            >
                {label}
            </FieldLabel>
            <FieldDescription className={classes?.description}>
                {description}
            </FieldDescription>
            <FieldError className={classes?.error}>{field.error}</FieldError>
        </Field>
    );
};

export default CheckboxField;
