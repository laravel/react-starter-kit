import { jsx, jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { c as cn } from "./app-logo-icon-CoogQ1E6.js";
import { Sun, Moon, Monitor } from "lucide-react";
import { S as SettingsLayout, H as HeadingSmall } from "./layout-jPnBvemX.js";
import { A as AppLayout } from "./app-layout-D4gdSMSC.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
const prefersDark = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};
const applyTheme = (appearance) => {
  const isDark = appearance === "dark" || appearance === "system" && prefersDark();
  document.documentElement.classList.toggle("dark", isDark);
};
const mediaQuery = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.matchMedia("(prefers-color-scheme: dark)");
};
const handleSystemThemeChange = () => {
  const currentAppearance = localStorage.getItem("appearance");
  applyTheme(currentAppearance || "system");
};
function useAppearance() {
  const [appearance, setAppearance] = useState("system");
  const updateAppearance = (mode) => {
    setAppearance(mode);
    localStorage.setItem("appearance", mode);
    applyTheme(mode);
  };
  useEffect(() => {
    const savedAppearance = localStorage.getItem("appearance");
    updateAppearance(savedAppearance || "system");
    return () => {
      var _a;
      return (_a = mediaQuery()) == null ? void 0 : _a.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);
  return { appearance, updateAppearance };
}
function AppearanceToggleTab({ className = "", ...props }) {
  const { appearance, updateAppearance } = useAppearance();
  const tabs = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" }
  ];
  return /* @__PURE__ */ jsx("div", { className: cn("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800", className), ...props, children: tabs.map(({ value, icon: Icon, label }) => /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => updateAppearance(value),
      className: cn(
        "flex items-center rounded-md px-3.5 py-1.5 transition-colors",
        appearance === value ? "bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100" : "text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"
      ),
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "-ml-1 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { className: "ml-1.5 text-sm", children: label })
      ]
    },
    value
  )) });
}
const breadcrumbs = [
  {
    title: "Appearance settings",
    href: "/settings/appearance"
  }
];
function Appearance() {
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "Appearance settings" }),
    /* @__PURE__ */ jsx(SettingsLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(HeadingSmall, { title: "Appearance settings", description: "Update your account's appearance settings" }),
      /* @__PURE__ */ jsx(AppearanceToggleTab, {})
    ] }) })
  ] });
}
export {
  Appearance as default
};
