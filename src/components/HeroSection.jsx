import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Calendar, Users, Compass, Car, Hotel } from 'lucide-react';
import { destinations } from '../data/travelData';

export default function HeroSection({ onOpenBooking, onSelectDestination }) {
  const [activeTab, setActiveTab] = useState('tour'); // tour, transit, hotels
  const [selectedDestId, setSelectedDestId] = useState('manali-solang');
  const [checkInDate, setCheckInDate] = useState('2026-10-20');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-25');
  const [guestCount, setGuestCount] = useState({ adults: 2, children: 1 });
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);

  const handleReserve = (e) => {
    e.preventDefault();
    const dest = destinations.find(d => d.id === selectedDestId) || destinations[0];
    onOpenBooking({
      destination: dest.name,
      state: dest.state,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: guestCount.adults,
      children: guestCount.children,
      tab: activeTab,
      estimatedPrice: dest.price
    });
  };

  const handleTakeTourClick = () => {
    const packagesEl = document.getElementById('packages');
    if (packagesEl) {
      packagesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalGuests = guestCount.adults + guestCount.children;

  return (
    <section className="hero-section">
      {/* Background Image Overlay with Mountain Chalet */}
      <div className="hero-bg-media">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85" 
          alt="Majestic snow-capped Himalayan mountain peaks in golden sunlight" 
          className="hero-bg-img"
        />
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="container hero-content-grid">
        {/* Left Column: Bold Typography & Action Button */}
        <div className="hero-text-col">
          <div className="hero-tag-badge">
            <span className="pulse-dot"></span>
            Himachal & Uttarakhand Specialists
          </div>

          <h1 className="hero-headline">
            Let's find your <br />
            <span className="hero-headline-accent">next adventure</span>
          </h1>

          <p className="hero-description">
            Handcrafted Himalayan tours, high-pass 4x4 expeditions, sacred pilgrimages, and cozy wooden chalets across Himachal and Uttarakhand. Guided by local mountain experts.
          </p>

          <div className="hero-cta-group">
            <button className="take-tour-pill" onClick={handleTakeTourClick} id="take-tour-btn">
              <span>Take a tour</span>
              <div className="arrow-circle">
                <ArrowUpRight size={18} />
              </div>
            </button>
            <div className="hero-trust-tag">
              <span className="star-rating">★★★★★</span>
              <span>4.9/5 from 4,200+ Indian Travelers</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Modern Booking Card (Matches reference card) */}
        <div className="hero-card-col">
          <div className="booking-widget-card">
            {/* Top Widget Tabs */}
            <div className="widget-tabs-row">
              <button 
                type="button"
                className={`widget-tab ${activeTab === 'tour' ? 'active' : ''}`}
                onClick={() => setActiveTab('tour')}
              >
                <Compass size={16} />
                <span>Tour</span>
              </button>
              <button 
                type="button"
                className={`widget-tab ${activeTab === 'transit' ? 'active' : ''}`}
                onClick={() => setActiveTab('transit')}
              >
                <Car size={16} />
                <span>Cabs & 4x4</span>
              </button>
              <button 
                type="button"
                className={`widget-tab ${activeTab === 'hotels' ? 'active' : ''}`}
                onClick={() => setActiveTab('hotels')}
              >
                <Hotel size={16} />
                <span>Hotels</span>
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleReserve} className="widget-form">
              {/* Destination Field */}
              <div className="form-group destination-group">
                <label className="form-label">Destination</label>
                <div className="input-with-icon">
                  <MapPin size={18} className="field-icon" />
                  <select 
                    value={selectedDestId} 
                    onChange={(e) => setSelectedDestId(e.target.value)}
                    className="form-select custom-field"
                    id="hero-destination-select"
                  >
                    <optgroup label="🌲 Himachal Pradesh">
                      <option value="manali-solang">Manali & Solang Valley • ₹13,499</option>
                      <option value="spiti-valley">Spiti Valley & Chandra Taal • ₹21,999</option>
                      <option value="kasol-tosh">Kasol, Tosh & Parvati Valley • ₹8,999</option>
                      <option value="dharamshala-bir">Dharamshala & Bir Billing • ₹14,200</option>
                      <option value="jibhi-tirthan">Jibhi & Tirthan Valley • ₹10,500</option>
                    </optgroup>
                    <optgroup label="🕉️ Uttarakhand">
                      <option value="kedarnath-dham">Kedarnath Dham & Chopta • ₹18,999</option>
                      <option value="rishikesh-haridwar">Rishikesh & Haridwar Rafting • ₹6,499</option>
                      <option value="auli-ski">Auli Ski Slopes & Joshimath • ₹15,999</option>
                      <option value="nainital-corbett">Nainital Lakes & Jim Corbett Safari • ₹14,800</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Check-In and Check-Out Side-by-Side */}
              <div className="form-row-dates">
                <div className="form-group">
                  <label className="form-label">Check In</label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="field-icon" />
                    <input 
                      type="date" 
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="form-input custom-field"
                      id="hero-checkin-date"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Check Out</label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="field-icon" />
                    <input 
                      type="date" 
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="form-input custom-field"
                      id="hero-checkout-date"
                    />
                  </div>
                </div>
              </div>

              {/* Guests Count Selector */}
              <div className="form-group guest-group-relative">
                <label className="form-label">Guest</label>
                <div 
                  className="input-with-icon clickable-guest-field"
                  onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
                  id="hero-guest-selector"
                >
                  <Users size={16} className="field-icon" />
                  <div className="guest-summary-text">
                    {guestCount.adults} Adults{guestCount.children > 0 ? `, ${guestCount.children} Child` : ''} ({totalGuests} People)
                  </div>
                </div>

                {/* Dropdown Stepper Popover */}
                {isGuestPickerOpen && (
                  <div className="guest-stepper-popover">
                    <div className="stepper-row">
                      <div>
                        <div className="stepper-label">Adults</div>
                        <div className="stepper-sub">Age 12+ years</div>
                      </div>
                      <div className="stepper-controls">
                        <button 
                          type="button" 
                          onClick={() => setGuestCount(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          disabled={guestCount.adults <= 1}
                        >–</button>
                        <span>{guestCount.adults}</span>
                        <button 
                          type="button" 
                          onClick={() => setGuestCount(prev => ({ ...prev, adults: prev.adults + 1 }))}
                        >+</button>
                      </div>
                    </div>

                    <div className="stepper-row">
                      <div>
                        <div className="stepper-label">Children</div>
                        <div className="stepper-sub">Age 2–11 years</div>
                      </div>
                      <div className="stepper-controls">
                        <button 
                          type="button" 
                          onClick={() => setGuestCount(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          disabled={guestCount.children <= 0}
                        >–</button>
                        <span>{guestCount.children}</span>
                        <button 
                          type="button" 
                          onClick={() => setGuestCount(prev => ({ ...prev, children: prev.children + 1 }))}
                        >+</button>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      className="stepper-done-btn"
                      onClick={() => setIsGuestPickerOpen(false)}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Reserve Button */}
              <button type="submit" className="reserve-action-btn" id="hero-reserve-btn">
                Reserve
              </button>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
}
