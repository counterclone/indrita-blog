'use client';

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function AdminLoginButton() {
    const { data: session } = useSession();
    const router = useRouter();

    if (session?.user) {
        return (
            <Link href="/admin/articles">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <LockKeyhole className="h-4 w-4 mr-1" />
                    Admin Panel
                </Button>
            </Link>
        );
    }

    const handleClick = () => {
        router.push('/admin/login');
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
            onClick={handleClick}
        >
            <LockKeyhole className="h-4 w-4 mr-1" />
            Admin
        </Button>
    );
} 