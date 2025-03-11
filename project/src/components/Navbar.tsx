'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  User,
  Settings,
  Zap,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const tabs = [
    { name: 'dashboard', path: '/' },
    { name: 'sequences', path: '/sequences' },
    { name: 'templates', path: '/templates' },
    { name: 'analytics', path: '/analytics' },
  ];

  const isActiveTab = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl">EmailFlow</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {tabs.map((tab) => (
              <Link key={tab.name} href={tab.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-2 rounded-lg capitalize ${
                    isActiveTab(tab.path) ? 'text-blue-600 font-semibold' : 'text-gray-600'
                  }`}
                >
                  {tab.name}
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <User className="w-5 h-5" />
                </motion.button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.email}
                    </div>
                    <Link href="/settings">
                      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </div>
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 