import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { HalalBadge } from '@/components/shared/halal-badge';
import { MapPin, Utensils, Calendar, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function RestaurantDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const restaurant = await prisma.restaurant.findUnique({
        where: { id: params.id },
        include: {
            user: {
                select: { name: true },
            },
            reviews: {
                orderBy: { createdAt: 'desc' },
                include: { user: { select: { name: true } } },
            },
        },
    });

    if (!restaurant || !restaurant.verified) {
        notFound();
    }

    // Calculate average rating
    const avgRating =
        restaurant.reviews.length > 0
            ? restaurant.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
            restaurant.reviews.length
            : 0;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
            {/* Cover Image */}
            <div className="w-full h-[40vh] md:h-[50vh] relative bg-zinc-200 dark:bg-zinc-800">
                {restaurant.image ? (
                    <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                        <Utensils size={64} />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Header Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                                        {restaurant.category}
                                    </span>
                                    <HalalBadge status={restaurant.halalStatus as 'Certified' | 'Community' | 'MuslimOwned' | 'SelfClaimed'} />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
                                <div className="flex items-center text-zinc-200">
                                    <MapPin size={18} className="mr-1.5" />
                                    <span className="text-lg">{restaurant.city}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border">
                            <h2 className="text-2xl font-bold mb-4">About this place</h2>
                            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                {restaurant.description}
                            </p>
                        </section>

                        {/* Reviews Section */}
                        <section className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 shadow-sm border">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold">Reviews</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-2xl font-bold">{avgRating.toFixed(1)}</span>
                                        <span className="text-muted-foreground">({restaurant.reviews.length} reviews)</span>
                                    </div>
                                </div>
                                <Button>Write a Review</Button>
                            </div>

                            <div className="space-y-6 mt-8">
                                {restaurant.reviews.length > 0 ? (
                                    restaurant.reviews.map((review) => (
                                        <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="font-medium">{review.user.name || 'Anonymous User'}</div>
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-zinc-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
                                            <div className="text-xs text-zinc-400">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 bg-zinc-50 dark:bg-zinc-950 rounded-xl">
                                        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Verification Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="text-emerald-600 mt-1" size={20} />
                                    <div>
                                        <div className="font-medium">Halal Status</div>
                                        <div className="text-sm text-muted-foreground mt-1">
                                            {restaurant.halalStatus === 'Certified' && 'This establishment holds an official Halal certification from the recognized authority.'}
                                            {restaurant.halalStatus === 'MuslimOwned' && 'This establishment is owned and operated by Muslims.'}
                                            {restaurant.halalStatus === 'Community' && 'This establishment has been verified by the Halalqu community.'}
                                            {restaurant.halalStatus === 'SelfClaimed' && 'This establishment claims to be halal but is pending official certification or community consensus.'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4 border-t">
                                    <Calendar className="text-zinc-400" size={20} />
                                    <div>
                                        <div className="text-sm font-medium">Added to Halalqu</div>
                                        <div className="text-sm text-muted-foreground">
                                            {new Date(restaurant.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
