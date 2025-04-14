
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface DailyPromptProps {
  prompt: string;
  onClick?: () => void;
}

const DailyPrompt: React.FC<DailyPromptProps> = ({ prompt, onClick }) => {
  return (
    <Card 
      className="bg-gradient-to-r from-wonder-50 to-nature-50 border-wonder-200 shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-wonder-100 rounded-full p-2 mt-1">
            <Sparkles size={20} className="text-wonder-600" />
          </div>
          <div>
            <h3 className="font-serif text-lg mb-2">Today's Wonder Prompt</h3>
            <p className="text-muted-foreground italic">"{prompt}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPrompt;
