import * as React from "react"
import { useState } from 'react';
import { X } from 'lucide-react';
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  
  "relative w-full rounded-lg border px-5 py-3 mb-3 has-[.alert-dismissed]:pr-10 text-[14px]",
  {
    variants: {
      variant: {
        primary: "bg-primary-500/20 text-primary-800 border-primary-500/2",
        secondary: "bg-secondary-500/20 text-secondary-800 border-secondary-500/2",
        success: "bg-success-500/20 text-success-800 border-success-500/2",
        danger: "bg-danger-500/20 text-danger-800 border-danger-500/2",
        warning: "bg-warning-500/20 text-warning-800 border-warning-500/2",
        info: "bg-info-500/20 text-info-800 border-info-500/2",
        dark: "bg-dark-500/20 text-dark-800 border-dark-500/2",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
      />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm [&_p]:leading-relaxed [&_a]:inline-block [&_a]:font-semibold",
        className
      )}
      {...props}
    />
  )
}

function AlertDismissible({
  className,
}: React.ComponentProps<"div">) {
  // const [isDismissed, setIsDismissed] = useState(false);

  // // Handle dismiss action
  // const handleDismiss = () => {
  //   setIsDismissed(true);
  // };
  return (
    <div
      data-slot="alert-dismissed"
      className={cn(
        "alert-dismissed absolute right-2 top-2 z-10", className 
      )}
    >
      <button className="text-lg flex items-center justify-center rounded w-7 h-7 text-inherit bg-transparent hover:bg-inherit bg-opacity-10"><X className="w-[18px] h-[18px]"/></button>
    </div>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertDismissible }
