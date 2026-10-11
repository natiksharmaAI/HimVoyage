import React, { useState } from 'react';
import { 
  Clock, MapPin, Check, Star, ArrowRight, Eye 
} from 'lucide-react';
import { tourPackages } from '../data/travelData';

export default function TourPackages({ onOpenItinerary, onOpenBooking }) {
  const [selectedState, setSelectedState] = useState('all');

  const filteredPackages = tourPackages.filter(pkg => {
    if (selectedState === 'all') return true;
    return pkg.state === selectedState;
  });

  return (
    <section className="packages-section" id="packages">
      <div className="container">
        {/* Section Header */}
        <div className="packages-header">
          <div className="section-tag">All-Inclusive Tour Packages</div>
          <h2 className="section-title">Himalayan Tour Packages</h2>
          <p className="section-subtitle">
            Curated journeys with vetted mountain drivers, boutique stays, daily meals, and transparent pricing.
          </p>

          {/* Quick State Toggle */}
          <div className="state-toggle-pill-row">
            <button 
              className={`state-toggle-btn ${selectedState === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedState('all')}
            >
              All Packages ({tourPackages.length})
            </button>
            <button 
              className={`state-toggle-btn ${selectedState === 'Himachal Pradesh' ? 'active' : ''}`}
              onClick={() => setSelectedState('Himachal Pradesh')}
            >
              🌲 Himachal Pradesh
            </button>
            <button 
              className={`state-toggle-btn ${selectedState === 'Uttarakhand' ? 'active' : ''}`}
              onClick={() => setSelectedState('Uttarakhand')}
            >
              🕉️ Uttarakhand
            </button>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="packages-grid">
          {filteredPackages.map(pkg => {
            const savings = pkg.originalPrice - pkg.pricePerPerson;
            return (
              <div key={pkg.id} className="package-card compact-package-card">
                {/* Image & Header */}
                <div className="package-media-wrapper">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="package-img"
                    loading="lazy"
                    onError={(e) => {
                      // fallback to high quality mountain peak if network glitch
                      e.target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="package-media-gradient"></div>

                  <div className="package-top-badges">
                    <span className="package-badge-flag">{pkg.badge}</span>
                    <span className="package-state-pill">{pkg.state}</span>
                  </div>

                  <div className="package-duration-chip">
                    <Clock size={12} />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Compact Card Content */}
                <div className="package-body compact-package-body">
                  <div className="package-rating-row compact-rating-row">
                    <div className="package-stars">
                      <Star size={13} fill="#f59e0b" color="#f59e0b" />
                      <span className="rating-num">{pkg.rating}</span>
                      <span className="reviews-num">({pkg.reviews})</span>
                    </div>
                    <span className="package-pickup">Pickup: {pkg.departureCity.split('/')[0]}</span>
                  </div>

                  <h3 className="package-title compact-title">{pkg.title}</h3>
                  <div className="package-route-sub compact-route">{pkg.subtitle}</div>

                  {/* Compact Inclusions Chips */}
                  <div className="compact-inclusions-row">
                    <span className="inc-pill"><Check size={11} className="inc-check" /> 4-Star Stays</span>
                    <span className="inc-pill"><Check size={11} className="inc-check" /> Daily Meals</span>
                    <span className="inc-pill"><Check size={11} className="inc-check" /> Private Cab</span>
                  </div>

                  {/* Pricing Box */}
                  <div className="package-pricing-box compact-pricing-box">
                    <div className="price-main-row compact-price-row">
                      <span className="current-price compact-price">₹{pkg.pricePerPerson.toLocaleString('en-IN')}</span>
                      <span className="original-price compact-orig-price">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="save-badge compact-save">Save ₹{savings.toLocaleString('en-IN')}</span>
                    </div>
                    <span className="price-note">Per Person • All Taxes Included</span>
                  </div>

                  {/* Actions */}
                  <div className="package-card-actions compact-actions">
                    <button 
                      className="btn-itinerary-outline compact-btn"
                      onClick={() => onOpenItinerary(pkg)}
                    >
                      <Eye size={14} />
                      <span>Itinerary</span>
                    </button>
                    <button 
                      className="btn-book-primary compact-btn"
                      onClick={() => onOpenBooking({
                        packageId: pkg.id,
                        title: pkg.title,
                        state: pkg.state,
                        duration: pkg.duration,
                        price: pkg.pricePerPerson
                      })}
                    >
                      <span>Book Now</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
