import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    return (
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md bg-white dark:bg-zinc-950 p-8 rounded-2xl shadow-sm border">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Log in to your Halalqu account</p>
                </div>

                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link href="#" className="text-sm text-emerald-600 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 mt-6">
                        Log In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-emerald-600 font-medium hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
