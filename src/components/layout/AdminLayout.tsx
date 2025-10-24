"use client";

import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, Users } from 'lucide-react'; // Removed LayoutDashboard
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/contexts/SessionContext';
import { showSuccess, showError } from '@/utils/toast';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const AdminLayout: React.FC = () => {
  const { user, isAdmin, loading: sessionLoading } = useSession();
  const navigate = useNavigate();

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading admin session...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      showSuccess('Logged out successfully!');
      navigate('/admin/login');
    } catch (error: any) {
      showError(error.message || 'Failed to log out.');
      console.error('Logout error:', error);
    }
  };

  const navLinks = [
    { to: '/admin/leads', icon: Users, label: 'Leads' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground p-6 flex flex-col shadow-lg">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-sidebar-primary-foreground">Admin Panel</h2>
        </div>
        <nav className="flex-grow space-y-2">
          {navLinks.map((link) => (
            <Button
              key={link.to}
              variant="ghost"
              className={cn(
                "w-full justify-start text-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location.pathname.startsWith(link.to) && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
              asChild
            >
              <Link to={link.to}>
                <link.icon className="mr-3 h-5 w-5" />
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <Separator className="my-6 bg-sidebar-border" />
        <Button
          variant="ghost"
          className="w-full justify-start text-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 border-b border-gray-200">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>
            <span className="text-gray-600">Welcome, {user?.email}</span>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet /> {/* Renders child routes */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;