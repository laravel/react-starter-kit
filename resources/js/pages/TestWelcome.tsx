import React from 'react';
import { Head } from '@inertiajs/react';

interface TestProps {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    locale?: string;
}

export default function TestWelcome({ auth, locale = 'en' }: TestProps) {
    return (
        <>
            <Head title="Test Welcome" />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold mb-4">Test Welcome Page</h1>

                    <div className="space-y-4">
                        <div>
                            <strong>Locale:</strong> {locale}
                        </div>

                        {auth?.user ? (
                            <div className="bg-green-50 p-4 rounded">
                                <h2 className="font-semibold text-green-800">Authenticated User</h2>
                                <p>ID: {auth.user.id}</p>
                                <p>Name: {auth.user.name}</p>
                                <p>Email: {auth.user.email}</p>
                            </div>
                        ) : (
                            <div className="bg-blue-50 p-4 rounded">
                                <h2 className="font-semibold text-blue-800">Guest User</h2>
                                <p>No authentication detected</p>
                            </div>
                        )}

                        <div className="pt-4">
                            <a
                                href="/assessment-tools"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Go to Assessment Tools
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
