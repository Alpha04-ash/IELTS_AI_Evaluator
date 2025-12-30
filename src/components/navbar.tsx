"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold text-slate-900 tracking-tight">
          IELTS<span className="text-slate-400">AI</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
            <User className="w-4 h-4" />
            <span>{session.user?.name}</span>
            <span className="text-[10px] uppercase bg-slate-200 px-1.5 rounded text-slate-500">{(session.user as any).role}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full px-4"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
