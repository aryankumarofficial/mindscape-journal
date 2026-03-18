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
import { useAppSelector } from "@/store/hooks";
import { Button } from "../ui/button";


export default function Navbar() {
  const { isAuthenticated } = useAppSelector(state => state.auth);

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
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
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
        <AuthButton isAuthenticated={isAuthenticated} />
      </div>
    </header>
  )
}


function AuthButton({isAuthenticated}:{isAuthenticated:boolean}) {

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
            <Button variant={"destructive"} className="cursor-pointer">
              Logout
            </Button>
          )}
              </div>

    </React.Fragment>
  )
}
