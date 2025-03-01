import { FooterProps } from '@/pages/type';
import type React from 'react';


const Footer: React.FC<FooterProps> = ({ links = [], copyrightText }) => {
    return (
        <footer className="bg-gray-900 py-8 text-white">
            <div className="container mx-auto px-4">
                {links.length > 0 && (
                    <div className="mb-4 flex flex-wrap justify-center gap-6">
                        {links.map((link) => (
                            <a key={link.name} href={link.href} className="hover:text-primary transition-colors duration-300">
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
                <div className="text-center text-gray-400">
                    <p>{copyrightText}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
