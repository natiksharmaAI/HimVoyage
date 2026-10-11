import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, Calendar, ArrowUp } from 'lucide-react';

export default function FloatingActions({ onOpenBooking }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello HimVoyage! I want to plan a tour to Himachal / Uttarakhand. Please share popular packages and best price.");
    window.open(`https://wa.me/919816045678?text=${message}`, '_blank');
  };

  return (
    <div className="floating-actions-container">
      {/* Quick Booking Pill */}
      <button 
        className="floating-book-pill"
        onClick={() => onOpenBooking(null)}
        title="Plan Custom Trip"
      >
        <Calendar size={18} />
        <span>Plan Trip</span>
      </button>

      {/* WhatsApp Floating Button */}
      <button 
        className="floating-whatsapp-btn"
        onClick={openWhatsApp}
        aria-label="Chat on WhatsApp with native Himalayan guide"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
        <span className="wa-pulse-dot"></span>
      </button>

      {/* Scroll to top */}
      {showScrollTop && (
        <button 
          className="floating-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
