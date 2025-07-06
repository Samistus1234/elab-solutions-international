/**
 * Application Sidebar Component
 * 
 * Role-based navigation sidebar for the dashboard
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  BarChart3,
  MessageSquare,
  Upload,
  CheckCircle,
  Clock,
  DollarSign,
  UserCheck,
  BookOpen,
  Calendar,
  X
} from 'lucide-react';
import { UserRole } from '@/types/business';

interface ApplicationSidebarProps {
  userRole: UserRole;
  onClose?: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT, UserRole.APPLICANT]
  },
  {
    name: 'My Applications',
    href: '/dashboard/applications',
    icon: FileText,
    roles: [UserRole.APPLICANT]
  },
  {
    name: 'Applications',
    href: '/dashboard/applications',
    icon: FileText,
    roles: [UserRole.SUPER_ADMIN, UserRole.CONSULTANT]
  },
  {
    name: 'Admin Panel',
    href: '/dashboard/admin',
    icon: Users,
    roles: [UserRole.ADMIN]
  },
  {
    name: 'Documents',
    href: '/dashboard/documents',
    icon: Upload,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT, UserRole.APPLICANT]
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
    badge: 2,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT, UserRole.APPLICANT]
  },
  
  // Admin & Consultant only
  {
    name: 'User Management',
    href: '/dashboard/users',
    icon: Users,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN]
  },
  {
    name: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT]
  },
  
  // Application Management
  {
    name: 'Document Review',
    href: '/dashboard/documents',
    icon: CheckCircle,
    badge: 5,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT]
  },
  {
    name: 'Pending Approvals',
    href: '/dashboard/approvals',
    icon: Clock,
    badge: 3,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN]
  },
  
  // Client-facing
  {
    name: 'My Documents',
    href: '/dashboard/my-documents',
    icon: Upload,
    roles: [UserRole.APPLICANT]
  },
  {
    name: 'Progress Tracking',
    href: '/dashboard/progress',
    icon: CheckCircle,
    roles: [UserRole.APPLICANT]
  },
  
  // Communication - Messages moved to core navigation
  
  // Financial
  {
    name: 'Payments',
    href: '/dashboard/payments',
    icon: DollarSign,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT, UserRole.APPLICANT]
  },
  
  // Application Types (Quick Access)
  {
    name: 'DataFlow',
    href: '/dashboard/applications?type=dataflow',
    icon: UserCheck,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT]
  },
  {
    name: 'MUMARIS+',
    href: '/dashboard/applications?type=mumaris_plus',
    icon: UserCheck,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT]
  },
  {
    name: 'License Renewal',
    href: '/dashboard/applications?type=license_renewal',
    icon: BookOpen,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT]
  },
  {
    name: 'Exam Booking',
    href: '/dashboard/applications?type=exam_booking',
    icon: Calendar,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT]
  },
  
  // Settings
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONSULTANT, UserRole.APPLICANT]
  }
];

export function ApplicationSidebar({ userRole, onClose }: ApplicationSidebarProps) {
  const pathname = usePathname();
  
  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  // Group items by category
  const coreItems = filteredNavItems.filter(item => 
    ['Dashboard', 'My Applications', 'Applications', 'Admin Panel', 'Documents', 'Messages'].includes(item.name)
  );
  
  const workflowItems = filteredNavItems.filter(item => 
    ['Document Review', 'Pending Approvals', 'My Documents', 'Progress Tracking'].includes(item.name)
  );
  
  const communicationItems = filteredNavItems.filter(item => 
    ['Payments'].includes(item.name)
  );
  
  const applicationTypeItems = filteredNavItems.filter(item => 
    ['DataFlow', 'MUMARIS+', 'License Renewal', 'Exam Booking'].includes(item.name)
  );
  
  const settingsItems = filteredNavItems.filter(item => 
    item.name === 'Settings'
  );

  const NavGroup = ({ title, items }: { title: string; items: NavItem[] }) => {
    if (items.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          {title}
        </h3>
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive
                    ? 'bg-primary-100 text-primary-900 border-r-2 border-primary-500'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <item.icon 
                  className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && item.badge > 0 && (
                  <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-primary-600">ELAB</span>
          </div>
          <span className="ml-2 text-sm text-gray-500">Dashboard</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <NavGroup title="Core" items={coreItems} />
        <NavGroup title="Workflow" items={workflowItems} />
        <NavGroup title="Communication" items={communicationItems} />
        
        {(userRole === UserRole.SUPER_ADMIN || userRole === UserRole.ADMIN || userRole === UserRole.CONSULTANT) && (
          <NavGroup title="Application Types" items={applicationTypeItems} />
        )}
        
        <NavGroup title="System" items={settingsItems} />
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500 text-center">
          <p className="mb-1">ELAB Solutions International</p>
          <p>Application Management System</p>
        </div>
      </div>
    </div>
  );
}