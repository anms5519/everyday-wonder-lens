
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Camera, Heart, Sparkles } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl mb-6 text-center">About Wonder Lens</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-center text-xl mb-8">
              Helping you discover beauty and meaning in your everyday experiences
            </p>
            
            <div className="mb-12 flex justify-center">
              <div className="bg-gradient-to-r from-wonder-100 to-nature-100 p-6 rounded-full">
                <Sparkles size={48} className="text-wonder-600" />
              </div>
            </div>
            
            <h2 className="font-serif text-2xl mb-4">Our Philosophy</h2>
            <p>
              Wonder Lens was created with a simple but powerful belief: there is extraordinary beauty in ordinary moments, if only we train ourselves to see it. In today's fast-paced world, we often rush past the small wonders that surround us every day.
            </p>
            <p>
              This app is a tool to help you pause, notice, and reflect on those moments—developing a practice of mindfulness and appreciation that can transform how you experience your daily life.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">The Science of Wonder</h2>
            <p>
              Research shows that regularly experiencing awe and wonder has significant benefits for mental health, creativity, and overall well-being. When we take time to notice small moments of beauty or meaning:
            </p>
            <ul>
              <li>Stress hormones like cortisol decrease</li>
              <li>Feelings of connection to others and the world increase</li>
              <li>The brain's default mode network is activated, enhancing creativity</li>
              <li>Time perception slows, creating a sense of abundance</li>
              <li>Gratitude and positive emotions are strengthened</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <div className="bg-wonder-100 rounded-full p-3 inline-block mb-4">
                  <Camera size={24} className="text-wonder-600" />
                </div>
                <h3 className="font-medium mb-2">Prompted Captures</h3>
                <p className="text-sm">Daily inspirations that help you notice new aspects of your environment</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <div className="bg-nature-100 rounded-full p-3 inline-block mb-4">
                  <Heart size={24} className="text-nature-600" />
                </div>
                <h3 className="font-medium mb-2">Mindful Reflections</h3>
                <p className="text-sm">Space to note the meaning behind your captures, deepening their impact</p>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <div className="bg-warmth-100 rounded-full p-3 inline-block mb-4">
                  <Sparkles size={24} className="text-warmth-600" />
                </div>
                <h3 className="font-medium mb-2">Wonder Insights</h3>
                <p className="text-sm">Patterns and trends in your practice to understand your personal sources of joy</p>
              </div>
            </div>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Start Your Journey</h2>
            <p>
              Whether you're looking to reduce stress, increase gratitude, or simply bring more moments of joy into your daily life, Wonder Lens is your companion in cultivating a practice of noticing what matters.
            </p>
            <p>
              Begin today by capturing just one moment that catches your attention. Over time, you'll build a collection of wonder that tells the story of your unique way of seeing the world.
            </p>
            
            <div className="mt-12 text-center">
              <Link to="/" className="text-wonder-600 hover:text-wonder-700 font-medium">
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
