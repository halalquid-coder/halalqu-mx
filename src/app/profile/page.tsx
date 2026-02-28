import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import { RestaurantCard } from '@/components/shared/restaurant-card';

export default async function ProfilePage() {
    // TODO: Add proper Auth using NextAuth
    // For MVP, using the seeded admin user
    const user = await prisma.user.findFirst({
        where: { email: 'admin@halalqu.com' },
        include: {
            restaurants: {
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-emerald-900 dark:text-emerald-50">My Profile</h1>
                    <p className="text-muted-foreground">Manage your settings and submitted places.</p>
                </div>
                <div className="mt-4 md:mt-2 bg-white dark:bg-zinc-900 border px-6 py-4 rounded-xl shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl">
                        {user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <Button variant="outline" size="sm" className="ml-4">Edit</Button>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Submitted Places</h2>
                    <Button variant="outline" asChild><a href="/submit">Add New Place</a></Button>
                </div>

                {user.restaurants.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user.restaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                id={restaurant.id}
                                name={restaurant.name}
                                city={restaurant.city}
                                category={restaurant.category}
                                halalStatus={restaurant.halalStatus as 'Certified' | 'Community' | 'MuslimOwned' | 'SelfClaimed'}
                                image={restaurant.image}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-zinc-50 dark:bg-zinc-900 border border-dashed rounded-xl p-10 text-center">
                        <p className="text-muted-foreground mb-4">You haven&apos;t submitted any places yet.</p>
                        <Button asChild><a href="/submit">Submit your first place</a></Button>
                    </div>
                )}
            </div>
        </div>
    );
}
