
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WonderEntry } from '@/components/WonderCard';
import { toast } from 'sonner';

interface WonderStoreContextProps {
  entries: WonderEntry[];
  dailyPrompt: string;
  addEntry: (image: string, reflection: string, prompt: string) => void;
  getEntryById: (id: string) => WonderEntry | undefined;
  deleteEntry: (id: string) => void;
  updateEntry: (id: string, updates: Partial<Omit<WonderEntry, 'id' | 'date'>>) => void;
  exportEntriesToJSON: () => string;
  importEntriesFromJSON: (jsonString: string) => boolean;
  getRandomPrompt: () => string;
  getEntriesByTag: (tag: string) => WonderEntry[];
  getEntriesByMonth: (month: number, year: number) => WonderEntry[];
  clearAllEntries: () => void;
}

const WonderStoreContext = createContext<WonderStoreContextProps | undefined>(undefined);

// List of wonder prompts
const WONDER_PROMPTS = [
  "Find beauty in something you usually ignore",
  "Capture a small detail that brings you joy",
  "What unexpected pattern do you see today?",
  "Notice a color that stands out to you right now",
  "What texture nearby feels interesting?",
  "Capture a shadow that creates an interesting shape",
  "Find something old that still has beauty",
  "What is growing or changing around you?",
  "Capture something tiny but meaningful",
  "What brings a feeling of peace in your surroundings?",
  "Notice a moment of connection between people or things",
  "What ordinary object has extraordinary details?",
  "Capture a reflection you find interesting",
  "What reminds you of childhood wonder?",
  "Find beauty in something broken or imperfect",
  "Capture light falling in an interesting way",
  "What simple pleasure do you notice today?",
  "Find an unexpected contrast in your environment",
  "What geometric shape appears naturally around you?",
  "Capture something that represents hope to you",
  "What has a fascinating texture in your space?",
  "Find something with an interesting history",
  "Capture a moment of serendipity",
  "Notice how light changes something ordinary",
  "What natural element catches your attention?",
  "Find beauty in repetition or patterns",
  "Capture something that represents transformation",
  "What everyday object has an interesting design?",
  "Find something that tells a story without words",
  "Capture a fleeting moment of beauty"
];

export const WonderStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<WonderEntry[]>(() => {
    const saved = localStorage.getItem('wonderEntries');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
          tags: entry.tags || []
        }));
      } catch (e) {
        console.error('Failed to parse entries:', e);
        return [];
      }
    }
    return [];
  });

  const [dailyPrompt, setDailyPrompt] = useState(() => {
    // Get random prompt, but check if we already have one for today
    const savedPrompt = localStorage.getItem('dailyPrompt');
    const savedDate = localStorage.getItem('dailyPromptDate');
    
    if (savedPrompt && savedDate) {
      const today = new Date().toDateString();
      if (savedDate === today) {
        return savedPrompt;
      }
    }
    
    return WONDER_PROMPTS[Math.floor(Math.random() * WONDER_PROMPTS.length)];
  });
  
  useEffect(() => {
    // Save daily prompt
    localStorage.setItem('dailyPrompt', dailyPrompt);
    localStorage.setItem('dailyPromptDate', new Date().toDateString());
  }, [dailyPrompt]);
  
  useEffect(() => {
    // Save entries whenever they change
    localStorage.setItem('wonderEntries', JSON.stringify(entries));
  }, [entries]);
  
  const addEntry = (image: string, reflection: string, prompt: string) => {
    const newEntry: WonderEntry = {
      id: Date.now().toString(),
      image,
      reflection,
      prompt,
      date: new Date(),
      tags: extractTags(reflection)
    };
    
    setEntries(prev => [newEntry, ...prev]);
    toast.success('Moment captured successfully!');
  };
  
  const getEntryById = (id: string) => {
    return entries.find(entry => entry.id === id);
  };
  
  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast.success('Entry deleted');
  };

  const updateEntry = (id: string, updates: Partial<Omit<WonderEntry, 'id' | 'date'>>) => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === id 
          ? { 
              ...entry, 
              ...updates,
              tags: updates.reflection 
                ? extractTags(updates.reflection) 
                : entry.tags 
            } 
          : entry
      )
    );
    toast.success('Entry updated successfully!');
  };

  const exportEntriesToJSON = () => {
    return JSON.stringify(entries);
  };

  const importEntriesFromJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        toast.error('Invalid format: Import data must be an array');
        return false;
      }

      const newEntries = parsed.map((entry: any) => ({
        ...entry,
        id: entry.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
        date: new Date(entry.date),
        tags: entry.tags || extractTags(entry.reflection) || []
      }));

      setEntries(prev => [...newEntries, ...prev]);
      toast.success(`Successfully imported ${newEntries.length} entries`);
      return true;
    } catch (e) {
      console.error('Failed to import entries:', e);
      toast.error('Failed to import entries. Invalid JSON format.');
      return false;
    }
  };

  const getRandomPrompt = () => {
    return WONDER_PROMPTS[Math.floor(Math.random() * WONDER_PROMPTS.length)];
  };

  const getEntriesByTag = (tag: string) => {
    return entries.filter(entry => 
      entry.tags && entry.tags.includes(tag.toLowerCase())
    );
  };

  const getEntriesByMonth = (month: number, year: number) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    });
  };

  const clearAllEntries = () => {
    if (window.confirm('Are you sure you want to delete ALL entries? This cannot be undone.')) {
      setEntries([]);
      toast.success('All entries have been deleted');
    }
  };

  // Helper function to extract hashtags from text
  const extractTags = (text: string): string[] => {
    if (!text) return [];
    
    const hashtagRegex = /#(\w+)/g;
    const matches = text.match(hashtagRegex);
    
    if (!matches) return [];
    
    return matches.map(tag => tag.slice(1).toLowerCase());
  };
  
  return (
    <WonderStoreContext.Provider value={{ 
      entries, 
      dailyPrompt, 
      addEntry,
      getEntryById,
      deleteEntry,
      updateEntry,
      exportEntriesToJSON,
      importEntriesFromJSON,
      getRandomPrompt,
      getEntriesByTag,
      getEntriesByMonth,
      clearAllEntries
    }}>
      {children}
    </WonderStoreContext.Provider>
  );
};

export const useWonderStore = () => {
  const context = useContext(WonderStoreContext);
  if (!context) {
    throw new Error('useWonderStore must be used within a WonderStoreProvider');
  }
  return context;
};
