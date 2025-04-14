
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WonderCard from '@/components/WonderCard';
import EmptyState from '@/components/EmptyState';
import DailyPrompt from '@/components/DailyPrompt';
import WeeklyInsights from '@/components/WeeklyInsights';
import CaptureModal from '@/components/CaptureModal';
import { useWonderStore } from '@/hooks/useWonderStore';
import { Link } from 'react-router-dom';

const Index = () => {
  const { entries, dailyPrompt, addEntry } = useWonderStore();
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  
  const handleCapture = (image: string, reflection: string, prompt: string) => {
    addEntry(image, reflection, prompt);
    setCaptureModalOpen(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <section className="mb-12 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl mb-4">Capture the Wonder in Everyday Life</h1>
            <p className="text-muted-foreground mb-8">
              Train your eyes to see beauty in ordinary moments and build a collection of wonder
            </p>
            <Button 
              onClick={() => setCaptureModalOpen(true)}
              className="bg-wonder-600 hover:bg-wonder-700 text-white px-6"
            >
              <PlusCircle className="mr-2" size={18} />
              Capture a Moment
            </Button>
          </div>
        </section>
        
        <section className="mb-8 animate-fade-up" style={{ animationDelay: '100ms' }}>
          <DailyPrompt 
            prompt={dailyPrompt} 
            onClick={() => setCaptureModalOpen(true)} 
          />
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="md:col-span-2">
            <h2 className="font-serif text-2xl mb-6">Recent Moments</h2>
            
            {entries.length === 0 ? (
              <EmptyState 
                type="capture" 
                onAction={() => setCaptureModalOpen(true)} 
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {entries.slice(0, 4).map(entry => (
                  <WonderCard 
                    key={entry.id} 
                    entry={entry}
                    onClick={() => {}}
                  />
                ))}
              </div>
            )}
            
            {entries.length > 4 && (
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link to="/journal">View All Moments</Link>
                </Button>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="font-serif text-2xl mb-6">Your Insights</h2>
            {entries.length === 0 ? (
              <div className="bg-muted p-6 rounded-lg text-center">
                <p className="text-muted-foreground">
                  Capture moments to see your insights here
                </p>
              </div>
            ) : (
              <WeeklyInsights entries={entries} />
            )}
          </div>
        </section>
        
        <section className="mb-12 animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="bg-muted/30 rounded-lg p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-3xl mb-4">How It Works</h2>
              <p className="text-muted-foreground mb-8">
                Wonder Lens helps you develop a habit of noticing beauty and meaning in your everyday life
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-wonder-100 flex items-center justify-center mb-4">
                    <span className="font-serif text-xl text-wonder-600">1</span>
                  </div>
                  <h3 className="font-medium mb-2">Receive a Daily Prompt</h3>
                  <p className="text-sm text-muted-foreground">
                    Get inspired by daily suggestions to notice new things
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-nature-100 flex items-center justify-center mb-4">
                    <span className="font-serif text-xl text-nature-600">2</span>
                  </div>
                  <h3 className="font-medium mb-2">Capture a Moment</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a photo of something meaningful or beautiful
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-warmth-100 flex items-center justify-center mb-4">
                    <span className="font-serif text-xl text-warmth-600">3</span>
                  </div>
                  <h3 className="font-medium mb-2">Reflect & Connect</h3>
                  <p className="text-sm text-muted-foreground">
                    Write your thoughts about what this moment means to you
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <CaptureModal
        open={captureModalOpen}
        onOpenChange={setCaptureModalOpen}
        onCapture={handleCapture}
        dailyPrompt={dailyPrompt}
      />
    </div>
  );
};

export default Index;
