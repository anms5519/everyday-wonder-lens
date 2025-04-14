
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export interface WonderEntry {
  id: string;
  image: string;
  prompt: string;
  reflection: string;
  date: Date;
  tags?: string[];
}

interface WonderCardProps {
  entry: WonderEntry;
  onClick: (id: string) => void;
  compact?: boolean;
}

const WonderCard = ({ entry, onClick, compact = false }: WonderCardProps) => {
  // Extract hashtags from reflection
  const extractHashtags = (text: string) => {
    const hashtagRegex = /#(\w+)/g;
    const matches = text.match(hashtagRegex);
    return matches ? matches.map(tag => tag.substring(1)) : [];
  };
  
  const hashtags = entry.tags || extractHashtags(entry.reflection);
  
  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
      onClick={() => onClick(entry.id)}
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img
            src={entry.image}
            alt="Wonder moment"
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        {!compact && (
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
            {format(entry.date, 'MMM d, yyyy')}
          </div>
        )}
      </div>
      
      <CardContent className={compact ? "p-3" : "p-4"}>
        <p className={`${compact ? "text-xs" : "text-sm"} text-muted-foreground italic mb-2 line-clamp-1`}>
          "{entry.prompt}"
        </p>
        
        <p className={`${compact ? "text-sm" : ""} line-clamp-${compact ? "2" : "3"} mb-2`}>
          {entry.reflection}
        </p>
        
        {hashtags.length > 0 && !compact && (
          <div className="flex flex-wrap gap-1 mt-2">
            {hashtags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {hashtags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{hashtags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WonderCard;
