'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

// Add ErrorPopup component
function ErrorPopup({ message, onClose }: { message: string; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Auto-close after 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in">
            <div className="flex items-center">
                <span>{message}</span>
                <button
                    onClick={onClose}
                    className="ml-4 text-white hover:text-red-200 focus:outline-none"
                >
                    ×
                </button>
            </div>
        </div>
    );
}

// Create a separate component for the login form
function LoginForm() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [error, setError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/admin/articles';

    useEffect(() => {
        // Check for error in URL parameters
        const errorParam = searchParams.get('error');
        if (errorParam) {
            setError('Authentication failed. Please try again.');
            setShowErrorPopup(true);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setShowErrorPopup(false);

        const formData = new FormData(e.currentTarget);
        
        try {
            const res = await signIn('credentials', {
                username: formData.get('username'),
                password: formData.get('password'),
                callbackUrl: '/admin/articles',
                redirect: true
            });
            
            // Note: The code below won't execute if redirect is true
            // This is just a fallback in case redirect fails
            if (res?.error) {
                setError('Invalid username or password');
                setShowErrorPopup(true);
                setIsLoading(false);
            } else if (!res?.error && !res?.url) {
                // If no error but also no redirect URL, force redirect
                console.log('Login successful, forcing redirect...');
                router.push('/admin/articles');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again.');
            setShowErrorPopup(true);
            setIsLoading(false);
        }
    };

    // Show loading state while checking session
    if (status === 'loading') {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // If already authenticated, show redirect message with fallback
    if (status === 'authenticated' && session?.user?.role === 'admin') {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div>Redirecting to admin dashboard...</div>
                <div className="text-sm text-gray-500 mt-2">
                    If you are not redirected, <button 
                        onClick={() => router.push('/admin/articles')}
                        className="text-blue-500 hover:text-blue-700 underline"
                    >
                        click here
                    </button>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {showErrorPopup && error && (
                <ErrorPopup
                    message={error}
                    onClose={() => setShowErrorPopup(false)}
                />
            )}
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Admin Login
                    </h2>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Main page component with Suspense boundary
export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
