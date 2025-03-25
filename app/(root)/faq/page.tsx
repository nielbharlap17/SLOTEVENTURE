"use client"
import { useState } from 'react';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 text-left font-semibold text-lg flex justify-between items-center ${isOpen ? 'bg-gray-50' : 'bg-white'}`}
      >
        {question}
        <span className={`text-xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 text-gray-600 bg-white">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I create an event?",
      answer: "To create an event, navigate to the \"Create Event\" page from the navigation menu. Fill out the required details about your event including title, description, date, time, location, and any other relevant information."
    },
    {
      question: "Can I edit my event after publishing?",
      answer: "Yes, you can edit your event details after publishing. Go to your profile page, find the event you want to edit, and click on the edit button."
    },
    {
      question: "How do I register for an event?",
      answer: "To register for an event, navigate to the event page and click on the \"Register\" or \"RSVP\" button. Follow the instructions to complete your registration."
    },
    {
      question: "Is there a fee to use Slot Eventure?",
      answer: "Slot Eventure is free to use for basic event creation and management. Premium features may require a subscription or one-time payment."
    },
    {
      question: "How can I contact support?",
      answer: "If you need assistance, please visit our Contact page or email us at support@sloteventure.com."
    }
  ];

  return (
    <div className="wrapper my-12 max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="h1-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">Frequently Asked Questions</h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Find answers to common questions about using Slot Eventure for your events
        </p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md">
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500">Still have questions?</p>
        <a href="/contact" className="inline-block mt-4 px-6 py-3 bg-primary-500 text-white rounded-full font-medium hover:bg-primary-600 transition-colors">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default FAQPage; 