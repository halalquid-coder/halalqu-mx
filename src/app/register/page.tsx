import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function RegisterPage() {
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md bg-white dark:bg-zinc-950 p-8 rounded-2xl shadow-sm border">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
                    <p className="text-muted-foreground">Join the Halalqu community today</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6">
                        Sign Up
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="text-emerald-600 font-medium hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
