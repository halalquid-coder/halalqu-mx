import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { approveRestaurantAction, rejectRestaurantAction } from './actions';
import { HalalBadge } from '@/components/shared/halal-badge';
import { MapPin } from 'lucide-react';

export default async function AdminPanelPage() {
    // TODO: Add Auth check to ensure user is ADMIN

    const pendingSubmissions = await prisma.restaurant.findMany({
        where: { verified: false },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 border-b pb-6">
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage pending place submissions</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Pending Approvals ({pendingSubmissions.length})</h2>

                {pendingSubmissions.length === 0 ? (
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-dashed rounded-xl p-10 text-center text-muted-foreground">
                        No pending submissions right now.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pendingSubmissions.map((restaurant) => (
                            <div key={restaurant.id} className="bg-white dark:bg-zinc-950 border rounded-xl p-6 flex flex-col md:flex-row gap-6">
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                                        <div>
                                            <h3 className="text-xl font-bold">{restaurant.name}</h3>
                                            <div className="flex items-center text-muted-foreground text-sm mt-1">
                                                <MapPin size={14} className="mr-1" />
                                                <span>{restaurant.city}</span>
                                                <span className="mx-2">•</span>
                                                <span>{restaurant.category}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <HalalBadge status={restaurant.halalStatus as 'Certified' | 'Community' | 'MuslimOwned' | 'SelfClaimed'} />
                                        </div>
                                    </div>

                                    <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-lg text-sm">
                                        {restaurant.description}
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col justify-end gap-3 md:w-32">
                                    <form action={async () => {
                                        'use server';
                                        await approveRestaurantAction(restaurant.id);
                                    }} className="w-full">
                                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                                    </form>
                                    <form action={async () => {
                                        'use server';
                                        await rejectRestaurantAction(restaurant.id);
                                    }} className="w-full">
                                        <Button type="submit" variant="destructive" className="w-full">Reject</Button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
