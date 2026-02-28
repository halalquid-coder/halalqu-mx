import Link from "next/link"
import { UtensilsCrossed } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-gray-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <UtensilsCrossed className="h-6 w-6 text-emerald-600" />
                            <span className="font-bold text-xl">Halalqu</span>
                        </Link>
                        <p className="text-sm text-neutral-500 max-w-xs">
                            Your trusted discovery platform for verified halal places. Helping the community find good food with peace of mind.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Discover</h3>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><Link href="/explore" className="hover:text-emerald-600">All Restaurants</Link></li>
                            <li><Link href="/explore?category=Cafe" className="hover:text-emerald-600">Cafes</Link></li>
                            <li><Link href="/explore?category=Street Food" className="hover:text-emerald-600">Street Food</Link></li>
                            <li><Link href="/submit" className="hover:text-emerald-600">Add a Place</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-neutral-500">
                            <li><Link href="/about" className="hover:text-emerald-600">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-emerald-600">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-emerald-600">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-emerald-600">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} Halalqu. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
