import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Moon, Lock, Shield, CircleUser, Smartphone } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
      <header className="h-16 border-b border-border flex items-center px-6 justify-between bg-card/80 backdrop-blur-md z-10 shrink-0">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <SettingsIcon className="text-primary" /> Settings
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl w-full mx-auto scrollbar-thin space-y-6">
        
        <section>
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Appearance</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Moon size={20} />
                </div>
                <div>
                  <Label htmlFor="dark-mode" className="text-base font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Always use dark theme</p>
                </div>
              </div>
              <Switch id="dark-mode" checked={true} disabled />
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <Smartphone size={20} />
                </div>
                <div>
                  <Label htmlFor="animations" className="text-base font-medium">Reduce Animations</Label>
                  <p className="text-sm text-muted-foreground">Disable complex visual effects</p>
                </div>
              </div>
              <Switch id="animations" checked={false} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Notifications</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Bell size={20} />
                </div>
                <div>
                  <Label htmlFor="push" className="text-base font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive messages when app is closed</p>
                </div>
              </div>
              <Switch id="push" checked={true} />
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                  <Bell size={20} />
                </div>
                <div>
                  <Label htmlFor="sounds" className="text-base font-medium">Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">Play sounds for incoming messages</p>
                </div>
              </div>
              <Switch id="sounds" checked={true} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Privacy & Security</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                  <Lock size={20} />
                </div>
                <div>
                  <h3 className="text-base font-medium">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground">Control who can see your activity</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-base font-medium">Blocked Users</h3>
                  <p className="text-sm text-muted-foreground">Manage your blocked contacts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-center pt-6 pb-12">
          <button className="text-destructive hover:bg-destructive/10 px-6 py-3 rounded-xl font-bold transition-colors">
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
}
