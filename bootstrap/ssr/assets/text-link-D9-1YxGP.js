import { jsx } from "react/jsx-runtime";
import { c as cn } from "./app-logo-icon-CoogQ1E6.js";
import { Link } from "@inertiajs/react";
function TextLink({ className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      className: cn(
        "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500",
        className
      ),
      ...props,
      children
    }
  );
}
export {
  TextLink as T
};
