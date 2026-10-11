import React, { useState } from 'react';
import { MapPin, Star, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { destinations } from '../data/travelData';

export default function DestinationsShowcase({ 
  onSelectDestination, 
  activeFilter, 
  setActiveFilter 
}) {
  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'Himachal Pradesh', label: '🌲 Himachal Pradesh' },
    { id: 'Uttarakhand', label: '🕉️ Uttarakhand' },
    { id: 'adventure', label: '⛷️ Adventure & Treks' },
    { id: 'spiritual', label: '🙏 Spiritual Yatras' },
    { id: 'honeymoon', label: '💍 Honeymoon & Stays' },
  ];

  const filteredDestinations = destinations.filter(dest => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Himachal Pradesh' || activeFilter === 'Uttarakhand') {
      return dest.state === activeFilter;
    }
    return dest.category === activeFilter;
  });

  return (
    <section className="destinations-section" id="destinations">
      <div className="container">
        {/* Section Header */}
        <div className="destinations-header-row">
          <div>
            <div className="section-tag">Curated Landscapes</div>
            <h2 className="section-title">Experience Our Destination</h2>
            <p className="section-subtitle">
              From snow-capped passes in Spiti to sacred confluences in Garhwal, explore the most iconic destinations across Himachal Pradesh and Uttarakhand.
            </p>
          </div>
          
          <div className="dest-count-pill">
            <Sparkles size={16} />
            <span>{destinations.length}+ Handpicked Valleys</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="destination-filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`dest-filter-tab ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Destinations Grid (Matching Tourex destination cards style) */}
        <div className="destinations-grid">
          {filteredDestinations.map(dest => (
            <div 
              key={dest.id} 
              className="destination-card"
              onClick={() => onSelectDestination(dest)}
            >
              <div className="dest-card-media">
                <img 
                  src={dest.image} 
                  alt={dest.alt || dest.name} 
                  className="dest-card-img"
                  loading="lazy"
                />
                <div className="dest-card-gradient"></div>

                {/* Top Badges */}
                <div className="dest-top-badges">
                  <span className={`dest-state-badge ${dest.state.includes('Himachal') ? 'himachal' : 'uttarakhand'}`}>
                    {dest.state}
                  </span>
                  <span className="dest-rating-badge">
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span>{dest.rating}</span>
                  </span>
                </div>

                {/* Card Content Overlay (Matches Tourex Mountain Bromo card) */}
                <div className="dest-overlay-content">
                  <div className="dest-title-row">
                    <h3 className="dest-name">{dest.name}</h3>
                    <div className="dest-arrow-btn">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  <div className="dest-location-sub">
                    <MapPin size={13} className="pin-icon" />
                    <span>{dest.tagline}</span>
                  </div>

                  <div className="dest-footer-row">
                    <div className="dest-price-box">
                      <span className="price-prefix">Starts from</span>
                      <span className="price-val">₹{dest.price.toLocaleString('en-IN')}</span>
                      <span className="price-per">/ person</span>
                    </div>
                    <span className="dest-duration-pill">{dest.duration}</span>
                  </div>
                </div>
              </div>

              {/* Highlights Chips */}
              <div className="dest-highlights-row">
                {dest.highlights.slice(0, 2).map((hl, idx) => (
                  <span key={idx} className="highlight-chip">
                    • {hl}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
