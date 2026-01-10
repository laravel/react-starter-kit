import type { MantineColorsTuple } from '@mantine/core';

/**
 * Generate a Mantine color tuple from Tailwind CSS variables.
 * Tailwind v4 exposes colors as --color-{name}-{shade} CSS variables.
 */
function createTailwindColor(name: string): MantineColorsTuple {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    return shades.map(
        (shade) => `var(--color-${name}-${shade})`,
    ) as unknown as MantineColorsTuple;
}

/**
 * Generate a color tuple from custom CSS variables (like --org-50, --platform-50).
 */
function createCustomColor(prefix: string): MantineColorsTuple {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    return shades.map(
        (shade) => `var(--${prefix}-${shade})`,
    ) as unknown as MantineColorsTuple;
}

// Tailwind's default color palettes
const tailwindColors = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
] as const;

// Custom app color names
type CustomColors = 'brand' | 'dark';

// Export type for all valid color names (Tailwind + custom only, no Mantine defaults)
export type AppColor = (typeof tailwindColors)[number] | CustomColors;

// Module augmentation to override Mantine's color types
// This ensures TypeScript errors if you use invalid colors like "grape"
// https://mantine.dev/theming/colors/#add-custom-colors-types
declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<AppColor, MantineColorsTuple>;
    }
}

const brand = createCustomColor('brand');
const dark = createCustomColor('dark');

// Generate all Tailwind colors as Mantine tuples
const colors = {
    brand,
    dark,
    ...(Object.fromEntries(
        tailwindColors.map((name) => [name, createTailwindColor(name)]),
    ) as Record<(typeof tailwindColors)[number], MantineColorsTuple>),
} as const;

export { colors };
