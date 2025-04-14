
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWonderStore } from '@/hooks/useWonderStore';
import { format, isSameDay, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, getMonth, getYear } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Trash2, Download, Share2 } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CalendarPage = () => {
  const { entries } = useWonderStore();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [isMonthView, setIsMonthView] = useState(true);
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Get entries for the selected date
  const entriesForDate = useMemo(() => {
    return date
      ? entries.filter(entry => isSameDay(entry.date, date))
      : [];
  }, [date, entries]);
  
  // Function to get dates with entries for the calendar
  const getDatesWithEntries = useMemo(() => {
    const dates = new Set<number>();
    entries.forEach(entry => {
      const dateTime = new Date(entry.date).setHours(0, 0, 0, 0);
      dates.add(dateTime);
    });
    return Array.from(dates).map(time => new Date(time));
  }, [entries]);

  // Get entries for the current month
  const entriesForMonth = useMemo(() => {
    if (!date) return [];
    
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  }, [date, entries]);

  // Create a record of how many entries per day in the current month
  const entriesCountByDay = useMemo(() => {
    if (!date) return {};
    
    const result: Record<string, number> = {};
    
    entriesForMonth.forEach(entry => {
      const day = format(entry.date, 'yyyy-MM-dd');
      result[day] = (result[day] || 0) + 1;
    });
    
    return result;
  }, [entriesForMonth, date]);
  
  const handleDayClick = (day: Date | undefined) => {
    setDate(day);
  };

  const handlePrevMonth = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - 1);
      setDate(newDate);
    }
  };

  const handleNextMonth = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + 1);
      setDate(newDate);
    }
  };
  
  const selectedEntryData = selectedEntry ? entries.find(e => e.id === selectedEntry) : null;

  // Handle delete
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Implement delete functionality
    setDeleteDialogOpen(false);
    setSelectedEntry(null);
  };

  // Create a modifiers object for the calendar
  const datesWithEntries = getDatesWithEntries;
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

  // Generate days in month for the heatmap view
  const daysInMonth = useMemo(() => {
    if (!date) return [];
    
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [date]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <div>
              <h1 className="font-serif text-4xl mb-2">Your Wonder Calendar</h1>
              <p className="text-muted-foreground">
                See your journey of noticing wonder over time
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'calendar' | 'timeline')}>
                <TabsList>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setDate(new Date())}
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Go to today</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {entries.length === 0 ? (
            <EmptyState type="calendar" />
          ) : viewMode === 'calendar' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <Card className="md:col-span-5">
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle>
                      {date ? format(date, 'MMMM yyyy') : 'Select a date'}
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleNextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
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
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
                    </CardTitle>
                    {date && entriesForDate.length > 0 && (
                      <Badge className="ml-2">
                        {entriesForDate.length} {entriesForDate.length === 1 ? 'moment' : 'moments'}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    {entriesForDate.length === 0 ? (
                      <div className="bg-muted/30 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">
                          {date ? 'No moments captured on this day' : 'Select a date to view your moments'}
                        </p>
                        {date && (
                          <Button 
                            className="mt-4" 
                            variant="outline"
                            onClick={() => window.location.href = '/capture'}
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Capture a moment
                          </Button>
                        )}
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
                  </CardContent>
                </Card>
                
                {date && (
                  <Card className="mt-6">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">Month Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-1">
                        {daysInMonth.map(day => {
                          const formattedDay = format(day, 'yyyy-MM-dd');
                          const count = entriesCountByDay[formattedDay] || 0;
                          const isToday = isSameDay(day, new Date());
                          const isSelected = date && isSameDay(day, date);
                          
                          return (
                            <div 
                              key={day.toString()}
                              className={cn(
                                "aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer text-xs transition-colors",
                                count > 0 ? "bg-accent/40 hover:bg-accent" : "hover:bg-muted",
                                isToday && "ring-2 ring-primary",
                                isSelected && "bg-primary/20"
                              )}
                              onClick={() => setDate(day)}
                            >
                              <span>{format(day, 'd')}</span>
                              {count > 0 && (
                                <Badge 
                                  variant="secondary" 
                                  className="mt-1 px-1.5 py-0 text-[8px] min-w-[16px] flex items-center justify-center"
                                >
                                  {count}
                                </Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Wonder Timeline</CardTitle>
                <CardDescription>Your journey through time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {entries.length === 0 ? (
                    <EmptyState type="calendar" />
                  ) : (
                    Object.entries(
                      entries.reduce((acc, entry) => {
                        const month = format(entry.date, 'MMMM yyyy');
                        if (!acc[month]) acc[month] = [];
                        acc[month].push(entry);
                        return acc;
                      }, {} as Record<string, typeof entries>)
                    )
                    .sort(([monthA], [monthB]) => {
                      const [monthNameA, yearA] = monthA.split(' ');
                      const [monthNameB, yearB] = monthB.split(' ');
                      return (
                        (parseInt(yearB) - parseInt(yearA)) || 
                        (getMonth(new Date(`${monthNameB} 1, 2000`)) - getMonth(new Date(`${monthNameA} 1, 2000`)))
                      );
                    })
                    .map(([month, monthEntries]) => (
                      <div key={month}>
                        <h3 className="font-serif text-xl mb-4 sticky top-0 bg-background/80 backdrop-blur-sm py-2">
                          {month}
                        </h3>
                        <div className="pl-4 border-l-2 border-muted space-y-6">
                          {monthEntries.map(entry => (
                            <div 
                              key={entry.id}
                              className="relative"
                            >
                              <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-accent"></div>
                              <div className="flex items-start gap-4">
                                <Card 
                                  className="flex-1 cursor-pointer hover:shadow-md transition-shadow"
                                  onClick={() => setSelectedEntry(entry.id)}
                                >
                                  <div className="flex flex-col sm:flex-row">
                                    <div className="sm:w-1/4 aspect-video">
                                      <img 
                                        src={entry.image}
                                        alt="Captured moment"
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="p-4 sm:w-3/4">
                                      <p className="text-sm text-muted-foreground">
                                        {format(entry.date, 'EEEE, MMMM d, yyyy · h:mm a')}
                                      </p>
                                      <p className="text-sm italic my-2">"{entry.prompt}"</p>
                                      <p className="line-clamp-2 text-sm">{entry.reflection}</p>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
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
                Captured on {format(selectedEntryData.date, 'EEEE, MMMM d, yyyy')} at {format(selectedEntryData.date, 'h:mm a')}
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
            
            <DialogFooter className="gap-2 flex sm:justify-between">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleDeleteClick}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Download size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Download image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share this moment</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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

export default CalendarPage;

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
