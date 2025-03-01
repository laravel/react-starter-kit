export interface GalleryData {
    id: number;
    src: string;
    alt: string;
    title: string;
    description: string;
    created_at: any;
    updated_at: any;
}

export type NavbarProps = {
    logo: string;
    navLinks?: Array<{ name: string; href: string }>;
};

export type HeroProps = {
    headline: string;
    subtext: string;
    showCta?: boolean;
    ctaText?: string;
    ctaLink?: string;
};

export type FooterProps = {
    links?: Array<{ name: string; href: string }>;
    copyrightText: string;
};
