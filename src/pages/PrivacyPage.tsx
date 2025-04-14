
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: April 14, 2025
            </p>
            
            <h2 className="font-serif text-2xl mb-4">Overview</h2>
            <p>
              Wonder Lens is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Wonder Lens.
            </p>
            <p>
              This Privacy Policy applies to our website and app, and its associated services (collectively, our "Service"). By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Information We Collect</h2>
            <p>
              Wonder Lens collects information in the following ways:
            </p>
            <h3 className="font-medium mt-4 mb-2">Information You Provide to Us</h3>
            <ul>
              <li>Photos you capture through the app</li>
              <li>Reflections and journal entries you write</li>
              <li>Account information if you create an account</li>
            </ul>
            
            <h3 className="font-medium mt-4 mb-2">Information Automatically Collected</h3>
            <ul>
              <li>Device information (such as your mobile device ID, model, and manufacturer)</li>
              <li>Usage information (such as how you use the app, frequency and duration of usage)</li>
              <li>Generally, no location data is collected unless explicitly enabled by you</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Develop new features and functionality</li>
              <li>Understand and analyze how you use our app</li>
              <li>Communicate with you, including sending service updates</li>
              <li>Protect against fraud and abuse</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Local Storage</h2>
            <p>
              Wonder Lens stores your photos and reflections locally on your device by default. This means your captured moments remain private to you and are not automatically uploaded to our servers.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Sharing Your Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share information in the following situations:
            </p>
            <ul>
              <li>With your consent</li>
              <li>For legal reasons, if required by applicable law</li>
              <li>To protect the rights, property, and safety of Wonder Lens, our users, or the public</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access personal information we hold about you</li>
              <li>The right to request correction or deletion of your personal information</li>
              <li>The right to restrict or object to our processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              privacy@wonderlens.example.com
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

export default PrivacyPage;
