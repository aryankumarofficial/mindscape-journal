"use client";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "../ui/button";
import type { SafeUser } from "@repo/types/db";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { logoutUserThunk } from "@/features/auth/authThunk";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  const dashboardLinks: {
    href: string;
    label: string;
  }[] = [{
    href: "/profile",
    label:"Profile"
    }, {
      href: "/journal",
      label:"Journal"
      }, {
        href: "/ai-analysis",
        label:"AI Analysis"
    }]

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
        >
          Mindscape
        </Link>
      <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="px-3 py-2">Home</NavigationMenuLink>
            </NavigationMenuItem>
            {isAuthenticated && (
            <NavigationMenuItem>
                          <NavigationMenuTrigger>
                            Dashboard
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                <ul className="grid w-55 gap-1 p-2">
                  {dashboardLinks.map(({href,label}, idx) => (
                              <li key={idx}>
                                  <NavigationMenuLink href={href}>
                                    {label}
                                  </NavigationMenuLink>
                              </li>
                  ))}
                            </ul>
                          </NavigationMenuContent>
              </NavigationMenuItem>
            )}
        </NavigationMenuList>
        </NavigationMenu>
        <AuthButton isAuthenticated={isAuthenticated} user={user} />
      </div>
    </header>
  )
}


function AuthButton({ isAuthenticated, user }: { isAuthenticated: boolean; user: SafeUser | null; }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk());
      toast.success("Logged out successfully");
      setTimeout(() => {
        router.push("/login");
      }, 100);
    } catch (error) {
      console.log(`Err`, error);
      toast.error((error as Error).message || `Failed to logout`);
    }
  }

  return (
    <React.Fragment>
      <div className="flex items-center gap-3">
        {!isAuthenticated ? (
             <React.Fragment>
          <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Register
                </Link>
             </React.Fragment>
        ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-muted transition cursor-pointer">
                  <Avatar>
                    <AvatarFallback className="h-8 w-8">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Signed in as
                  <div className="font-medium text-foreground truncate">
                    {user?.email}
                  </div>
                </div>

                <DropdownMenuItem asChild>
                  <Link className="cursor-pointer" href={"/profile"}>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className="cursor-pointer" href="/journal">Journal</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className="cursor-pointer" href="/ai-analysis">AI Analysis</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button variant={"destructive"} className="w-full cursor-pointer hover:border-none hover:ring-0 focus-visible:ring-0 hover:bg-destructive! hover:text-white!"
                    size={"sm"}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
              </div>

    </React.Fragment>
  )
}
