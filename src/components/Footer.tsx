
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 text-muted-foreground py-6 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="font-serif text-sm">
              Wonder Lens
            </span>
            <span className="text-xs">© {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex items-center text-sm gap-6">
            <Link to="/about" className="hover:text-foreground transition">About</Link>
            <Link to="/privacy" className="hover:text-foreground transition">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition">Terms</Link>
          </div>
          
          <div className="flex items-center text-sm gap-2">
            <span>Made with</span>
            <Heart size={14} className="fill-warmth-500 text-warmth-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
