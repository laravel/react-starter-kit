import { Head, Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';

export default function BlogLayout({ children, title }: PropsWithChildren<{ title: string }>) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <Head title={title} />
            <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200/50 fixed w-full z-50">
                <div className="flex justify-between items-center px-8 py-4">
                    <Link href="/" className="flex items-center space-x-3">
                        <img src="/storage/logo.svg" alt="FAQ Logo" className="h-12 w-auto" />
                        <span className="text-lg font-bold text-blue-900">AFAQ</span>
                    </Link>
                    <Link href={route('posts.index')} className="text-blue-700 font-medium hover:text-blue-900">
                        Blog
                    </Link>
                </div>
            </header>
            <main className="pt-20 pb-8 px-8">
                {children}
            </main>
        </div>
    );
}
