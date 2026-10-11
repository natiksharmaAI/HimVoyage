import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, PhoneCall, ChevronDown } from 'lucide-react';

export default function Navbar({ onOpenBooking, onSelectFilter }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    setIsStateDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo - Stylized like reference */}
        <a href="#" className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 19H21L12 2Z" fill="white" fillOpacity="0.9" />
              <path d="M12 7L7 17H17L12 7Z" fill="#0c141c" />
              <path d="M12 11L9.5 16H14.5L12 11Z" fill="#10b981" />
            </svg>
          </div>
          <span className="brand-name">himvoyage</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <button className="nav-link active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
          
          <div className="nav-dropdown-wrapper">
            <button 
              className="nav-link nav-dropdown-trigger"
              onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
              onMouseEnter={() => setIsStateDropdownOpen(true)}
            >
              Destinations <ChevronDown size={14} className={isStateDropdownOpen ? 'rotate' : ''} />
            </button>
            {isStateDropdownOpen && (
              <div 
                className="nav-dropdown-menu"
                onMouseLeave={() => setIsStateDropdownOpen(false)}
              >
                <div 
                  className="dropdown-item" 
                  onClick={() => {
                    onSelectFilter('Himachal Pradesh');
                    scrollToSection('destinations');
                  }}
                >
                  <div className="dropdown-bullet himachal"></div>
                  <div>
                    <div className="dropdown-title">Himachal Pradesh</div>
                    <div className="dropdown-sub">Manali, Spiti, Kasol, Jibhi, Dharamshala</div>
                  </div>
                </div>
                <div 
                  className="dropdown-item" 
                  onClick={() => {
                    onSelectFilter('Uttarakhand');
                    scrollToSection('destinations');
                  }}
                >
                  <div className="dropdown-bullet uttarakhand"></div>
                  <div>
                    <div className="dropdown-title">Uttarakhand</div>
                    <div className="dropdown-sub">Kedarnath, Rishikesh, Auli, Jim Corbett</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="nav-link" onClick={() => scrollToSection('packages')}>Tour Packages</button>
          <button className="nav-link" onClick={() => scrollToSection('about')}>Why Us</button>
          <button className="nav-link" onClick={() => scrollToSection('reviews')}>Reviews</button>
          <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact Us</button>
        </nav>

        {/* Right CTA */}
        <div className="nav-actions">
          <a href="tel:+919816045678" className="nav-call-btn">
            <PhoneCall size={16} />
            <span>+91 98160 45678</span>
          </a>
          <button className="nav-pill-btn" onClick={() => onOpenBooking(null)}>
            Plan Trip
          </button>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-links">
            <button onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Home
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); onSelectFilter('Himachal Pradesh'); scrollToSection('destinations'); }}>
              🌲 Himachal Pradesh Tours
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); onSelectFilter('Uttarakhand'); scrollToSection('destinations'); }}>
              🕉️ Uttarakhand Tours
            </button>
            <button onClick={() => scrollToSection('packages')}>
              Tours & Packages
            </button>
            <button onClick={() => scrollToSection('about')}>
              Why Choose Us
            </button>
            <button onClick={() => scrollToSection('reviews')}>
              Traveler Reviews
            </button>
            <button onClick={() => scrollToSection('contact')}>
              Custom Inquiry
            </button>
          </div>
          <div className="mobile-drawer-footer">
            <button className="drawer-book-btn" onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(null); }}>
              Reserve / Quick Quote
            </button>
            <a href="tel:+919816045678" className="drawer-phone-link">
              Call Native Guide: +91 98160 45678
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
