import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { HalalBadge } from './halal-badge';

type HalalStatus = 'Certified' | 'Community' | 'MuslimOwned' | 'SelfClaimed';

interface RestaurantCardProps {
    id: string;
    name: string;
    city: string;
    image?: string | null;
    category: string;
    halalStatus: HalalStatus;
}

export function RestaurantCard({
    id,
    name,
    city,
    image,
    category,
    halalStatus,
}: RestaurantCardProps) {
    return (
        <Link href={`/restaurant/${id}`}>
            <Card className="overflow-hidden group hover:shadow-md transition-all cursor-pointer border-neutral-200/60 dark:border-neutral-800">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {image ? (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-emerald-50 text-emerald-200">
                            <MapPin size={48} />
                        </div>
                    )}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm dark:bg-black/90 px-2.5 py-1 rounded-md text-xs font-medium shadow-sm">
                        {category}
                    </div>
                </div>
                <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {name}
                        </h3>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                        <MapPin size={14} className="mr-1" />
                        <span>{city}</span>
                    </div>
                    <div className="mt-auto">
                        <HalalBadge status={halalStatus} />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
