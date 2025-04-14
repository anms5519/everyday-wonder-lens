
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export interface WonderEntry {
  id: string;
  image: string;
  reflection: string;
  prompt: string;
  date: Date;
}

interface WonderCardProps {
  entry: WonderEntry;
  onClick?: () => void;
  className?: string;
}

const WonderCard: React.FC<WonderCardProps> = ({ entry, onClick, className }) => {
  return (
    <Card 
      className={cn("overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={entry.image} 
          alt={entry.reflection.substring(0, 20)} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="font-serif text-sm italic text-muted-foreground">
          "{entry.prompt}"
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2 pb-2">
        <p className="line-clamp-2 text-sm">
          {entry.reflection}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0">
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(entry.date, { addSuffix: true })}
        </p>
      </CardFooter>
    </Card>
  );
};

export default WonderCard;
