'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname?.startsWith(path) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
    };

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-white font-bold">Admin Dashboard</span>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        href="/admin/articles"
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/articles')}`}
                                    >
                                        Articles
                                    </Link>
                                    <Link
                                        href="/admin/thoughts"
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/thoughts')}`}
                                    >
                                        Thoughts
                                    </Link>
                                    <Link
                                        href="/admin/gallery"
                                        className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/gallery')}`}
                                    >
                                        Gallery
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
} 