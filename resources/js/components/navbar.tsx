import type React from 'react';
import { Library } from 'lucide-react';
import { NavbarProps } from '@/pages/type';


const Navbar: React.FC<NavbarProps> = ({ logo, navLinks = [] }) => {
    return (
        <nav className="fixed top-0 right-0 left-0 z-50 bg-white shadow-md dark:bg-black">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <div className="flex items-center">
                    <a href="/" className="text-primary text-xl font-bold">
                        <Library name={logo} size={24} />
                    </a>
                </div>

                {navLinks.length > 0 && (
                    <div className="hidden items-center space-x-6 md:flex">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="hover:text-primary text-gray-700 transition-colors duration-300 dark:text-white">
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}

                <div>
                    <a href="/login" className="bg-primary hover:bg-primary-dark rounded-md px-4 py-1 text-white  transition-colors duration-300 dark:text-neutral-900">
                        Admin
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
