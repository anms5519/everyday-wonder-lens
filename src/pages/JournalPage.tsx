
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WonderCard from '@/components/WonderCard';
import EmptyState from '@/components/EmptyState';
import { useWonderStore } from '@/hooks/useWonderStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Trash2, X } from 'lucide-react';

const JournalPage = () => {
  const { entries, deleteEntry } = useWonderStore();
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleEntryClick = (id: string) => {
    setSelectedEntry(id);
  };
  
  const handleDeleteClick = () => {
    if (selectedEntry) {
      setDeleteDialogOpen(true);
    }
  };
  
  const confirmDelete = () => {
    if (selectedEntry) {
      deleteEntry(selectedEntry);
      setSelectedEntry(null);
      setDeleteDialogOpen(false);
    }
  };
  
  const selectedEntryData = selectedEntry ? entries.find(e => e.id === selectedEntry) : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl mb-2">Your Wonder Journal</h1>
          <p className="text-muted-foreground mb-8">
            A collection of moments you've captured and the insights they've inspired
          </p>
          
          {entries.length === 0 ? (
            <EmptyState type="journal" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {entries.map(entry => (
                <WonderCard 
                  key={entry.id} 
                  entry={entry}
                  onClick={() => handleEntryClick(entry.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Entry Detail Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={(open) => !open && setSelectedEntry(null)}>
        {selectedEntryData && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                Moment of Wonder
              </DialogTitle>
              <DialogDescription>
                Captured {format(selectedEntryData.date, 'MMMM d, yyyy')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={selectedEntryData.image} 
                  alt="Captured moment" 
                  className="w-full object-contain max-h-[400px]" 
                />
              </div>
              
              <div>
                <h3 className="text-sm text-muted-foreground italic mb-2">
                  "{selectedEntryData.prompt}"
                </h3>
                <p className="whitespace-pre-line">
                  {selectedEntryData.reflection}
                </p>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleDeleteClick}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={16} />
              </Button>
              <Button onClick={() => setSelectedEntry(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this moment?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this captured moment and reflection.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 flex sm:justify-between">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              className="flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JournalPage;
