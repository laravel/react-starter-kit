import Footer from '@/components/footer';
import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import type React from 'react';



// Navigation links
const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/dashboard' },
    { name: 'About', href: '/about' },
];

// Footer links
const footerLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact', href: '/contact' },
];

// Also update the logo to use a placeholder
const App: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar logo="https://via.placeholder.com/200x80?text=Digital+Museum" navLinks={navLinks} />

            <main className="flex-grow">
                <Hero
                    headline="Your Memories, Your Museum"
                    subtext="Create and curate your personal digital museum. Showcase your art, memories, and collections in a beautiful online space."
                />
            </main>

            <Footer links={footerLinks} copyrightText="© 2025 Digital Personal Museum. All rights reserved." />
        </div>
    );
};

export default App;
