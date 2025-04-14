
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaptureModal from '@/components/CaptureModal';
import { useWonderStore } from '@/hooks/useWonderStore';
import { Camera, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CapturePage = () => {
  const { dailyPrompt, addEntry } = useWonderStore();
  const [captureModalOpen, setCaptureModalOpen] = useState(false);
  
  const handleCapture = (image: string, reflection: string, prompt: string) => {
    addEntry(image, reflection, prompt);
    setCaptureModalOpen(false);
  };
  
  // Animation variants for the elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 } 
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h1 className="font-serif text-4xl mb-4">Capture a Moment of Wonder</h1>
            <p className="text-muted-foreground">
              Take a moment to pause, look around, and find something that sparks curiosity or joy
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-8 bg-gradient-to-r from-wonder-50 to-nature-50 rounded-lg p-6 border border-wonder-200"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <div className="bg-wonder-100 rounded-full p-3">
                <Sparkles size={24} className="text-wonder-600" />
              </div>
              <div>
                <h2 className="font-serif text-xl mb-2">Today's Wonder Prompt</h2>
                <p className="text-muted-foreground italic">"{dailyPrompt}"</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-muted/30 rounded-lg p-8 text-center"
            variants={itemVariants}
          >
            <div className="max-w-md mx-auto">
              <div className="bg-background rounded-full p-4 inline-block mb-6">
                <Camera size={32} className="text-wonder-600" />
              </div>
              <h2 className="font-serif text-2xl mb-4">Ready to Capture?</h2>
              <p className="text-muted-foreground mb-6">
                Use today's prompt as inspiration, or simply capture whatever catches your eye and makes you pause.
              </p>
              <Button 
                onClick={() => setCaptureModalOpen(true)}
                className="bg-wonder-600 hover:bg-wonder-700 text-white px-8 py-6 text-lg"
              >
                <Camera className="mr-2" size={20} />
                Open Camera
              </Button>
              
              <div className="mt-8 text-sm text-muted-foreground">
                <p>Tips for meaningful captures:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Look for details you normally overlook</li>
                  <li>• Notice interesting light, shadows, or colors</li>
                  <li>• Capture ordinary objects from new perspectives</li>
                  <li>• Focus on what evokes a feeling, not just what looks nice</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
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

export default CapturePage;
