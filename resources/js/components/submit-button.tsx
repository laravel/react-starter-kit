"use client";
import * as React from "react";
import { useFormContext } from "@wandry/inertia-form";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export type SubmitButtonProps = React.PropsWithChildren<
  React.ComponentProps<typeof Button> & {
    disabled?: boolean;
  }
>;

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { form } = useFormContext();

  return (
    <Button
      type="submit"
      disabled={form.processing || props.disabled}
      {...props}
    >
      {form.processing && <Spinner />}
      {props.children}
    </Button>
  );
};

export default SubmitButton;
