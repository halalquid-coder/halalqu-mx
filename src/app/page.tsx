import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, ShieldCheck, Map, Users } from 'lucide-react';
import { RestaurantCard } from '@/components/shared/restaurant-card';
import prisma from '@/lib/prisma';
import { PageTransition } from '@/components/page-transition';

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch top rated/most reviewed restaurants for the landing page
  const featuredRestaurants = await prisma.restaurant.findMany({
    where: { verified: true },
    take: 3,
    include: {
      _count: {
        select: { reviews: true }
      }
    },
    orderBy: [
      { reviews: { _count: 'desc' } },
      { createdAt: 'desc' }
    ],
  });
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-emerald-900 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
              Discover Verified Halal<br className="hidden md:block" /> Places Near You
            </h1>
            <p className="text-lg md:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto drop-shadow">
              Your trusted community for finding authentic, verified halal restaurants, cafes, and street food with peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/explore">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Places
                </Button>
              </Link>
              <Link href="/submit">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  Add a Place
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Value Proposition / How it Works */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How Halalqu Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We verify places through a multi-tier system to ensure you can eat with confidence.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Map className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Discover</h3>
                <p className="text-muted-foreground">
                  Search for halal food near your location or destination across various categories.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Verify Status</h3>
                <p className="text-muted-foreground">
                  Check our clear badge system to see if a place is MUI Certified, Muslim Owned, or Community Verified.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Contribute</h3>
                <p className="text-muted-foreground">
                  Help the community by submitting new places you find or reviewing existing ones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Places</h2>
                <p className="text-muted-foreground">
                  Explore popular and highly-rated halal destinations.
                </p>
              </div>
              <Link href="/explore">
                <Button variant="ghost" className="text-emerald-600 hidden sm:flex">
                  View all <span aria-hidden="true" className="ml-1">&rarr;</span>
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRestaurants.map((restaurant) => (
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

            <div className="mt-8 text-center sm:hidden">
              <Link href="/explore">
                <Button variant="outline" className="w-full">
                  View all places
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
