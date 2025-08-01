import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "form-check-input",
        className
      )}
      {...props}
    >
      {/* <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="form-check-input"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator> */}
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
