
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar, BookOpen, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border py-3">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-medium text-wonder-700">Wonder Lens</span>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link to="/" className="flex items-center gap-1">
              <Home size={18} />
              <span className="hidden md:inline">Home</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link to="/capture" className="flex items-center gap-1">
              <Camera size={18} />
              <span className="hidden md:inline">Capture</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link to="/journal" className="flex items-center gap-1">
              <BookOpen size={18} />
              <span className="hidden md:inline">Journal</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
            <Link to="/calendar" className="flex items-center gap-1">
              <Calendar size={18} />
              <span className="hidden md:inline">Calendar</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
