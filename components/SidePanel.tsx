'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Package, Users, LineChart } from 'lucide-react';
import { forwardRef } from 'react';
import Image from 'next/image';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidePanel = forwardRef<HTMLDivElement, SidePanelProps>(
  ({ isOpen, onClose }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed top-0 left-0 z-40 h-full w-60 bg-muted/100 transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                width={30}
                height={30}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GpJBNsAy5i6kFKBjwoumNZSZG_T11SBq3w&s" // Update with your logo path
                alt="Logo"
              />
              <span>Aarogya Minds</span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8 md:hidden"
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>✕
            </Button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-2 text-sm font-medium">
            <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/patients" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200">
              <Users className="h-4 w-4" />
              View Patients
              <Badge className="ml-auto h-6 w-6 flex items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link href="/addblog" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200">
              <Package className="h-4 w-4" />
              Add Blog
            </Link>
            <Link href="/viewblogs" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200">
              <LineChart className="h-4 w-4" />
              View Blogs
            </Link>
          </nav>
        </div>
      </div>
    );
  }
);

SidePanel.displayName = 'SidePanel';

export default SidePanel;
