
import React from 'react';
import { Camera, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  type: 'capture' | 'journal' | 'calendar';
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onAction }) => {
  const content = {
    capture: {
      icon: <Camera size={48} className="text-wonder-500" />,
      title: 'No moments captured yet',
      description: 'Start your journey by capturing your first moment of wonder',
      actionText: 'Capture a Moment'
    },
    journal: {
      icon: <BookOpen size={48} className="text-wonder-500" />,
      title: 'Your journal is empty',
      description: 'Reflect on moments of wonder to fill your journal with insights',
      actionText: 'Start Journaling'
    },
    calendar: {
      icon: <Calendar size={48} className="text-wonder-500" />,
      title: 'No entries in your calendar',
      description: 'Capture moments regularly to see your wonder journey unfold',
      actionText: 'Capture a Moment'
    }
  }[type];
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center rounded-lg border border-dashed border-muted-foreground/20">
      <div className="bg-muted rounded-full p-4 mb-4">
        {content.icon}
      </div>
      <h3 className="text-xl font-serif mb-2">{content.title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {content.description}
      </p>
      {onAction && (
        <Button onClick={onAction} className="bg-wonder-600 hover:bg-wonder-700">
          {content.actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
