import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserNav } from './user-nav';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto">
                <Link href="/" className="flex items-center space-x-2 ms-4 lg:ms-0">
                    <UtensilsCrossed className="h-6 w-6 text-emerald-600" />
                    <span className="font-bold inline-block text-xl">Halalqu</span>
                </Link>
                <div className="flex items-center space-x-4 me-4 lg:me-0">
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link
                            href="/explore"
                            className="transition-colors hover:text-emerald-600 text-foreground/60"
                        >
                            Explore
                        </Link>
                        <Link
                            href="/submit"
                            className="transition-colors hover:text-emerald-600 text-foreground/60"
                        >
                            Submit a Place
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-2">
                        {/* TODO: Add Auth session checks here */}
                        <UserNav />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
