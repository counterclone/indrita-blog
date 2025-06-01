'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface Subscriber {
    _id: string;
    email: string;
    subscribed: boolean;
    subscribedAt: string;
}

interface TestSubscriber {
    _id: string;
    email: string;
    createdAt: string;
}

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [testSubscribers, setTestSubscribers] = useState<TestSubscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bulkEmails, setBulkEmails] = useState('');
    const [testEmail, setTestEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
    const [selectedTestSubscriber, setSelectedTestSubscriber] = useState<TestSubscriber | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchSubscribers();
        fetchTestSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await fetch('/api/admin/subscribers');
            if (!response.ok) throw new Error('Failed to fetch subscribers');
            const data = await response.json();
            setSubscribers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const fetchTestSubscribers = async () => {
        try {
            const response = await fetch('/api/test-subscribers');
            if (!response.ok) throw new Error('Failed to fetch test subscribers');
            const data = await response.json();
            setTestSubscribers(data);
        } catch (err) {
            console.error('Error fetching test subscribers:', err);
        }
    };

    const handleBulkAdd = async () => {
        setIsSubmitting(true);
        try {
            // Split emails by newline and remove empty lines
            const emails = bulkEmails
                .split('\n')
                .map(email => email.trim())
                .filter(email => email);

            const response = await fetch('/api/admin/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to add subscribers');
            }

            // Show results
            toast({
                title: 'Subscribers Processed',
                description: (
                    <div className="mt-2 text-sm">
                        <p>✅ Added: {data.results.added.length}</p>
                        <p>🔄 Reactivated: {data.results.reactivated.length}</p>
                        <p>⚠️ Already subscribed: {data.results.existing.length}</p>
                        <p>❌ Invalid emails: {data.results.invalid.length}</p>
                    </div>
                ),
            });

            // Clear textarea and refresh list
            setBulkEmails('');
            fetchSubscribers();

        } catch (err) {
            toast({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to add subscribers',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddTestSubscriber = async () => {
        if (!testEmail.trim()) return;

        try {
            const response = await fetch('/api/test-subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: testEmail.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to add test subscriber');
            }

            toast({
                title: 'Success',
                description: 'Test subscriber added successfully',
            });

            setTestEmail('');
            fetchTestSubscribers();
        } catch (err) {
            toast({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to add test subscriber',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteTestSubscriber = async (email: string) => {
        try {
            const response = await fetch('/api/test-subscribers', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete test subscriber');
            }

            toast({
                title: 'Success',
                description: 'Test subscriber deleted successfully',
            });

            fetchTestSubscribers();
        } catch (err) {
            toast({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to delete test subscriber',
                variant: 'destructive',
            });
        }
    };

    const handleToggleStatus = async (subscriber: Subscriber) => {
        try {
            const response = await fetch('/api/admin/subscribers', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subscriberId: subscriber._id,
                    subscribed: !subscriber.subscribed,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to update subscriber');
            }

            toast({
                title: 'Success',
                description: data.message,
            });

            fetchSubscribers();
        } catch (err) {
            toast({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to update subscriber',
                variant: 'destructive',
            });
        }
    };

    const handleDelete = async () => {
        if (!selectedSubscriber) return;

        try {
            const response = await fetch(`/api/admin/subscribers?id=${selectedSubscriber._id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete subscriber');
            }

            toast({
                title: 'Success',
                description: data.message,
            });

            setDeleteDialogOpen(false);
            setSelectedSubscriber(null);
            fetchSubscribers();
        } catch (err) {
            toast({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to delete subscriber',
                variant: 'destructive',
            });
        }
    };

    if (loading) return <div className="p-6">Loading...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Subscribers</h1>

            {/* Test Subscribers Section */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Test Subscribers</h2>
                <div className="flex gap-4 mb-4">
                    <Input
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        placeholder="Enter test email address"
                        className="flex-1"
                    />
                    <Button 
                        onClick={handleAddTestSubscriber}
                        disabled={!testEmail.trim()}
                    >
                        Add Test Subscriber
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Added Date
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {testSubscribers.map((subscriber) => (
                                <tr key={subscriber._id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {subscriber.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {new Date(subscriber.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteTestSubscriber(subscriber.email)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bulk Add Section */}
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Add Subscribers</h2>
                <p className="text-gray-600 mb-4">
                    Enter email addresses (one per line) to add multiple subscribers at once.
                </p>
                <Textarea
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                    placeholder="email1@example.com&#10;email2@example.com&#10;email3@example.com"
                    className="mb-4 font-mono"
                    rows={6}
                />
                <Button 
                    onClick={handleBulkAdd} 
                    disabled={isSubmitting || !bulkEmails.trim()}
                >
                    {isSubmitting ? 'Adding...' : 'Add Subscribers'}
                </Button>
            </div>

            {/* Regular Subscribers List */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Current Subscribers</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Subscribed Date
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {subscribers.map((subscriber) => (
                                <tr key={subscriber._id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {subscriber.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                subscriber.subscribed
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {subscriber.subscribed ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleToggleStatus(subscriber)}
                                            className="mr-2"
                                        >
                                            {subscriber.subscribed ? (
                                                <ToggleRight className="h-4 w-4" />
                                            ) : (
                                                <ToggleLeft className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedSubscriber(subscriber);
                                                setDeleteDialogOpen(true);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the subscriber. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 