
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { useWonderStore } from '@/hooks/useWonderStore';
import { format, isSameDay } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EmptyState from '@/components/EmptyState';

const CalendarPage = () => {
  const { entries } = useWonderStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  
  // Get entries for the selected date
  const entriesForDate = date
    ? entries.filter(entry => isSameDay(entry.date, date))
    : [];
  
  // Function to get dates with entries for the calendar
  const getDatesWithEntries = () => {
    const dates = new Set<number>();
    entries.forEach(entry => {
      const dateTime = new Date(entry.date).setHours(0, 0, 0, 0);
      dates.add(dateTime);
    });
    return Array.from(dates).map(time => new Date(time));
  };
  
  const handleDayClick = (day: Date | undefined) => {
    setDate(day);
  };
  
  const selectedEntryData = selectedEntry ? entries.find(e => e.id === selectedEntry) : null;

  // Create a modifiers object for the calendar
  const datesWithEntries = getDatesWithEntries();
  const modifiers = {
    highlighted: datesWithEntries
  };

  // Create a modifier styles object
  const modifiersStyles = {
    highlighted: {
      fontWeight: 'bold',
      backgroundColor: 'var(--accent)',
      color: 'var(--accent-foreground)',
      borderRadius: '100%'
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-4xl mb-2">Your Wonder Calendar</h1>
          <p className="text-muted-foreground mb-8">
            See your journey of noticing wonder over time
          </p>
          
          {entries.length === 0 ? (
            <EmptyState type="calendar" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <Card className="md:col-span-5">
                <CardContent className="p-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDayClick}
                    className="rounded-md border"
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                  />
                </CardContent>
              </Card>
              
              <div className="md:col-span-7">
                <h2 className="font-serif text-2xl mb-4">
                  {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
                </h2>
                
                {entriesForDate.length === 0 ? (
                  <div className="bg-muted/30 rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">
                      {date ? 'No moments captured on this day' : 'Select a date to view your moments'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {entriesForDate.map(entry => (
                      <Card 
                        key={entry.id}
                        className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedEntry(entry.id)}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-1/3 aspect-square">
                            <img 
                              src={entry.image}
                              alt="Captured moment"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="sm:w-2/3 p-6">
                            <p className="text-sm text-muted-foreground italic mb-2">
                              "{entry.prompt}"
                            </p>
                            <p className="line-clamp-3">
                              {entry.reflection}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
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
              
              <div className="text-sm text-muted-foreground">
                Captured on {format(selectedEntryData.date, 'MMMM d, yyyy')} at {format(selectedEntryData.date, 'h:mm a')}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CalendarPage;
