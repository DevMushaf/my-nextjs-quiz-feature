"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  MessageCircle,
  Settings,
  LogOut
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Progress', href: '/progress', icon: <TrendingUp className="w-5 h-5" /> },
    { name: 'Quiz', href: '/quiz', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Chat', href: '/chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Confessions', href: '/confessions', icon: <MessageCircle className="w-5 h-5" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-blue-900 text-white w-[224px] min-h-screen flex flex-col font-mono">
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        <h1 className="text-xl font-bold">StudyZen</h1>
        <button className="text-blue-300 hover:text-white">
          <span className="text-xl">«</span>
        </button>
      </div>
      
      <nav className="flex-1 pt-4">
        {navItems.map((item) => (
          <Link 
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 ${
              pathname.startsWith(item.href) 
                ? 'text-white bg-blue-800' 
                : 'text-blue-300 hover:text-white hover:bg-blue-800'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto border-t border-blue-800 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-700 overflow-hidden">
            <img 
              src="https://via.placeholder.com/40" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <span>John Doe</span>
        </div>
        
        <button className="flex items-center gap-2 text-blue-300 hover:text-white w-full p-2">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};