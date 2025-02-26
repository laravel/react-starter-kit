import { jsxs, jsx } from "react/jsx-runtime";
import { useId } from "react";
import { A as AppLayout } from "./app-layout-D4gdSMSC.js";
import { Head } from "@inertiajs/react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "lucide-react";
import "./app-logo-icon-CoogQ1E6.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
function PlaceholderPattern({ className }) {
  const patternId = useId();
  return /* @__PURE__ */ jsxs("svg", { className, fill: "none", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("pattern", { id: patternId, x: "0", y: "0", width: "10", height: "10", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx("path", { d: "M-3 13 15-5M-5 5l18-18M-1 21 17 3" }) }) }),
    /* @__PURE__ */ jsx("rect", { stroke: "none", fill: `url(#${patternId})`, width: "100%", height: "100%" })
  ] });
}
const breadcrumbs = [
  {
    title: "Dashboard",
    href: "/dashboard"
  }
];
function Dashboard() {
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-1 flex-col gap-4 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid auto-rows-min gap-4 md:grid-cols-3", children: [
        /* @__PURE__ */ jsx("div", { className: "border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsx(PlaceholderPattern, { className: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" }) }),
        /* @__PURE__ */ jsx("div", { className: "border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsx(PlaceholderPattern, { className: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" }) }),
        /* @__PURE__ */ jsx("div", { className: "border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsx(PlaceholderPattern, { className: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min", children: /* @__PURE__ */ jsx(PlaceholderPattern, { className: "absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" }) })
    ] })
  ] });
}
export {
  Dashboard as default
};
