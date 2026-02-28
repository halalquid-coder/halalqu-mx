"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, LayoutDashboard } from "lucide-react";

export function UserNav() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full bg-muted animate-pulse" />
        );
    }

    if (!session?.user) {
        return (
            <div className="flex items-center space-x-2">
                <Link href="/login">
                    <Button variant="ghost" size="sm">
                        Log in
                    </Button>
                </Link>
                <Link href="/register">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Sign up
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200">
                    <span className="font-semibold text-sm">
                        {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal border-b pb-2">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>

                {session.user.role === "ADMIN" && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/admin">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Admin Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
