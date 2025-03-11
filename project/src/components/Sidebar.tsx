'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Mail, 
  BarChart3, 
  Settings, 
  PlusCircle 
} from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', path: '/' },
    { icon: <Mail className="w-5 h-5" />, label: 'Sequences', path: '/sequences' },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-40"
        >
          <div className="p-4">
            <Link href="/sequences/new">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold"
              >
                <PlusCircle className="w-5 h-5" />
                New Sequence
              </motion.div>
            </Link>

            <div className="mt-6 space-y-2">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.path}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                      isActive(item.path)
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 