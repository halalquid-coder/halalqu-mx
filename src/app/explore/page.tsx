import { RestaurantCard } from '@/components/shared/restaurant-card';
import prisma from '@/lib/prisma';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { redirect } from 'next/navigation';
import { AnimatedList } from '@/components/animated-list';
import { PageTransition } from '@/components/page-transition';
import nextDynamic from 'next/dynamic';

// Dynamically import MapComponent to disable Server-Side Rendering
// because Leaflet accesses the window object
const MapComponent = nextDynamic(() => import('@/components/map'), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900">
            <div className="animate-pulse flex flex-col items-center">
                <Map className="h-10 w-10 text-emerald-600/50 mb-4" />
                <p className="text-muted-foreground font-medium">Loading Map...</p>
            </div>
        </div>
    )
});

import { Map } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function ExplorePage({
    searchParams,
}: {
    searchParams: { q?: string; category?: string };
}) {
    const query = searchParams.q || '';
    const category = searchParams.category || '';

    const restaurants = await prisma.restaurant.findMany({
        where: {
            verified: true,
            ...(query ? { name: { contains: query } } : {}),
            ...(category ? { category: category } : {}),
        },
        orderBy: { createdAt: 'desc' },
    });

    async function searchAction(formData: FormData) {
        'use server';
        const q = formData.get('q');
        const cat = formData.get('category');

        let url = '/explore?';
        if (q) url += `q=${q}&`;
        if (cat) url += `category=${cat}`;

        redirect(url);
    }

    return (
        <PageTransition>
            <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
                {/* Left Side: List & Filters */}
                <div className="w-full lg:w-[600px] xl:w-[700px] h-full overflow-y-auto border-r bg-background pb-20 lg:pb-8 flex-shrink-0">
                    <div className="px-4 py-8 max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold mb-8">Explore Halal Places</h1>

                        {/* Filters & Search */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 border rounded-xl p-4 mb-8">
                            <form action={searchAction} className="flex flex-col gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        name="q"
                                        defaultValue={query}
                                        placeholder="Search by restaurant name..."
                                        className="pl-9 bg-white dark:bg-zinc-950"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 items-center">
                                    <div className="flex-1 flex flex-wrap gap-2">
                                        {[
                                            { label: 'All', value: '' },
                                            { label: 'Restaurant', value: 'Restaurant' },
                                            { label: 'Cafe', value: 'Cafe' },
                                            { label: 'Street Food', value: 'Street Food' },
                                        ].map((cat) => (
                                            <label
                                                key={cat.label}
                                                className={`cursor-pointer px-4 py-2 rounded-full border text-sm font-medium transition-colors ${category === cat.value
                                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                                    : 'bg-zinc-100 dark:bg-zinc-800 text-foreground hover:bg-emerald-50 dark:hover:bg-emerald-900/30'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    value={cat.value}
                                                    defaultChecked={category === cat.value}
                                                    className="hidden"
                                                />
                                                {cat.label}
                                            </label>
                                        ))}
                                    </div>
                                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                                        Apply Filters
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Results */}
                        <div>
                            <p className="text-muted-foreground mb-6">
                                Found {restaurants.length} verified places
                            </p>

                            {restaurants.length > 0 ? (
                                <AnimatedList className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {restaurants.map((restaurant) => (
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
                                </AnimatedList>
                            ) : (
                                <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-dashed">
                                    <h3 className="text-xl font-semibold mb-2">No places found</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Try adjusting your search or filters to find what you&apos;re looking for.
                                    </p>
                                    <Button variant="outline" asChild>
                                        <a href="/explore">Clear all filters</a>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Map */}
                <div className="flex-1 h-[50vh] lg:h-full bg-zinc-100 dark:bg-zinc-900 relative z-0">
                    {/* The map itself provides a great visualization */}
                    <MapComponent restaurants={restaurants} />
                </div>
            </div>
        </PageTransition>
    );
}
