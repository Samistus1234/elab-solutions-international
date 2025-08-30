'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, User, FileText, Upload, MessageSquare, BookOpen } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard/applicant', icon: LayoutDashboard },
    { name: 'Profile', href: '/dashboard/applicant/profile', icon: User },
    { name: 'My Applications', href: '/dashboard/applicant/applications', icon: FileText },
    { name: 'Documents', href: '/dashboard/applicant/documents', icon: Upload },
    { name: 'Messages', href: '/dashboard/applicant/messages', icon: MessageSquare },
    { name: 'ELAB Academy', href: '/dashboard/applicant/academy', icon: BookOpen },
    { name: 'CentralOps', href: '/dashboard/centralops', icon: LayoutDashboard }, // Added CentralOps link
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary-800">Applicant Hub</h2>
        </div>
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-primary-100 text-primary-800 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary-700'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
