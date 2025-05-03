'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bulkEmails, setBulkEmails] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchSubscribers();
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

            {/* Subscribers List */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Current Subscribers</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2 px-4">Email</th>
                                <th className="text-left py-2 px-4">Status</th>
                                <th className="text-left py-2 px-4">Subscribed On</th>
                                <th className="text-left py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((subscriber) => (
                                <tr key={subscriber._id} className="border-b">
                                    <td className="py-2 px-4">{subscriber.email}</td>
                                    <td className="py-2 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            subscriber.subscribed 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {subscriber.subscribed ? 'Active' : 'Unsubscribed'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleToggleStatus(subscriber)}
                                                title={subscriber.subscribed ? 'Deactivate' : 'Activate'}
                                            >
                                                {subscriber.subscribed ? (
                                                    <ToggleRight className="h-5 w-5 text-green-600" />
                                                ) : (
                                                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                                                )}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedSubscriber(subscriber);
                                                    setDeleteDialogOpen(true);
                                                }}
                                                className="text-red-600 hover:text-red-700"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the subscriber{' '}
                            <span className="font-semibold">{selectedSubscriber?.email}</span>.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedSubscriber(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 