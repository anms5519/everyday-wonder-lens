
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl mb-6">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8">
              Last updated: April 14, 2025
            </p>
            
            <h2 className="font-serif text-2xl mb-4">Introduction</h2>
            <p>
              Welcome to Wonder Lens. By using our app and services, you agree to these Terms of Service. Please read them carefully.
            </p>
            <p>
              These Terms of Service ("Terms") govern your access to and use of the Wonder Lens application and services (the "Service"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Using Our Service</h2>
            <p>
              You must follow any policies made available to you within the Service. You may use our Service only as permitted by law. We may suspend or stop providing our Service to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.
            </p>
            
            <h3 className="font-medium mt-4 mb-2">Account Usage</h3>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Content in the Service</h2>
            <p>
              The content you create, upload, or store on Wonder Lens remains yours. By using our Service, you grant Wonder Lens a limited license to use, host, store, and display your content solely for the purpose of providing the Service to you.
            </p>
            <p>
              You are responsible for the content you create, upload or store on the Service, and you confirm that you have all necessary rights to do so.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Prohibited Uses</h2>
            <p>
              You agree not to misuse our Service. For example, you must not:
            </p>
            <ul>
              <li>Use the Service for any illegal purpose or in violation of any applicable laws</li>
              <li>Upload, post, or transmit any content that infringes intellectual property rights</li>
              <li>Attempt to interfere with, compromise, or harm the Service or our systems</li>
              <li>Engage in automated use of the system, or take any action that imposes an unreasonable load on our infrastructure</li>
              <li>Impersonate another person or entity, or falsify your affiliation with a person or entity</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Termination</h2>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Changes to Terms</h2>
            <p>
              We may modify these Terms at any time, and such modifications shall be effective immediately upon posting of the modified Terms on the Service. It is your responsibility to review these Terms periodically.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Disclaimer of Warranties</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Limitation of Liability</h2>
            <p>
              In no event shall Wonder Lens, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            
            <h2 className="font-serif text-2xl mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              terms@wonderlens.example.com
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

export default TermsPage;
