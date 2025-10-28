"use client";

import { useField } from "@wandry/inertia-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type InputProps = Omit<React.ComponentProps<"input">, "name">;

type TextFieldClasses = {
  field?: string;
  label?: string;
  input?: string;
  description?: string;
  error?: string;
};

export type TextFieldProps = {
  name: string;
  description?: string;
  label?: string;
  addonLeft?: React.ReactNode;
  addonRight?: React.ReactNode;
  classes?: TextFieldClasses;
};

const TextField: React.FC<TextFieldProps & InputProps> = ({
  name,
  label,
  description,
  addonLeft,
  addonRight,
  classes,
  defaultValue = "",
  ...inputProps
}) => {
  const field = useField(name, { defaultValue });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    field.onChange(value);
  };

  return (
    <Field className={classes?.field}>
      <FieldLabel className={classes?.label} htmlFor={name}>
        {label}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={name}
          name={name}
          value={field.value}
          onChange={onChange}
          className={classes?.input}
          {...inputProps}
        />
        {addonLeft && <InputGroupAddon>{addonLeft}</InputGroupAddon>}
        {addonRight && (
          <InputGroupAddon align="inline-end">{addonRight}</InputGroupAddon>
        )}
      </InputGroup>
      <FieldDescription className={classes?.description}>
        {description}
      </FieldDescription>
      <FieldError className={classes?.error}>{field.error}</FieldError>
    </Field>
  );
};

export default TextField;
