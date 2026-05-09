import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Sidebar } from "./Sidebar";
import { useAppContext } from "@/contexts/AppContext";
import { ActiveCall } from "@/components/calls/ActiveCall";
import { IncomingCall } from "@/components/calls/IncomingCall";
import { MessageCircle, Phone, Users, Gift, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const BOTTOM_NAV = [
  { href: "/",         icon: MessageCircle, label: "Чаты"     },
  { href: "/calls",    icon: Phone,         label: "Звонки"   },
  { href: "/contacts", icon: Users,         label: "Контакты" },
  { href: "/gifts",    icon: Gift,          label: "Подарки"  },
  { href: "/settings", icon: Settings,      label: "Настройки"},
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { activeCall } = useAppContext();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar
        mobileSidebarOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onMobileOpen={() => setMobileSidebarOpen(true)}
      />

      {/* Main content — shrinks by 56px on mobile to leave room for bottom nav */}
      <main className="flex-1 flex overflow-hidden relative pb-14 md:pb-0">
        {children}
        <ActiveCall />
        <IncomingCall />
      </main>

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Mobile bottom navigation bar ─────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-card/95 backdrop-blur-md border-t border-border flex items-center z-40 safe-area-inset-bottom">
        {BOTTOM_NAV.map(({ href, icon: Icon, label }) => {
          const isActive = href === "/" ? location === "/" : location.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className={cn("text-[10px] font-medium leading-none", isActive ? "text-primary" : "text-muted-foreground")}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
