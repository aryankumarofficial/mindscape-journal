"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hooks";
import { BadgeCheck, Calendar, Loader2, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { user } = useAppSelector(state => state.auth);

  if (!user) return (
    <section className="flex flex-col justify-center items-center min-h-screen">
      <Loader2 size={100} className="animate-spin" />
    </section>
  );

  const memeberSince = new Date(user.createdAt || "").toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  return (
    <React.Fragment>
      <section className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-auto overflow-hidden border-zinc-200 shadow-sm">
          <CardHeader className="flex flex-row items-center gap-4 bg-zinc-50/50 pb-6">
            <Avatar className="h-16 w-16 border-2 bg-white shadow-sm">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <CardTitle className="capitalize text-xl">
                  {user.name}
                </CardTitle>
                {user.isVerified && (
                  <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-50"/>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-mono text-[10px] uppercase tracking-wider">
                          ID: {user.id?.slice(0, 8)}...
              </p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 pt-6">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-zinc-600">{user.email}</span>
              {user.isVerified && (
                <Badge variant={"secondary"} className="ml-auto text-[10px] py-0 px-2 bg-green-700 text-background tracking-widest font-bold">Verified</Badge>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground"/>
              <span className="text-zinc-500 text-xs">Joined { memeberSince }</span>
            </div>

          </CardContent>
        </Card>
      </section>
    </React.Fragment>
  )
}
