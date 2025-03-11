'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AiChat from './AiChat';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main className={`pt-16 ${isSidebarOpen ? 'md:pl-64' : ''} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      </main>
      <AiChat />
    </>
  );
} 