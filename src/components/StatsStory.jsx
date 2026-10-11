import React from 'react';
import { Award, Compass, Users, CheckCircle2 } from 'lucide-react';
import { trustStats } from '../data/travelData';

export default function StatsStory({ onOpenBooking }) {
  return (
    <section className="stats-story-section" id="about">
      <div className="container">
        <div className="stats-story-grid">
          {/* Left Column: Striking Vertical Mountain Photo (Matching reference tall alpine lake photo) */}
          <div className="story-media-col">
            <div className="tall-image-card">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80" 
                alt="Turquoise Himalayan Lake and pine mountains" 
                className="tall-img"
              />
              <div className="image-floating-badge">
                <div className="badge-icon-pin">
                  <Compass size={20} />
                </div>
                <div>
                  <div className="badge-place">Parashar & Chandra Taal</div>
                  <div className="badge-alt">Himachal Pradesh • 14,100 Ft</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & High-Impact Stats */}
          <div className="story-content-col">
            <div className="section-tag">Born in the Himalayas</div>
            
            <h2 className="story-title">
              Traveling brings you closer to new places, people, and memories
            </h2>

            <p className="story-desc">
              Based natively in Manali with satellite hubs across Shimla and Dehradun, we don't just sell tour packages — we craft intimate journeys into the heart of the Himalayas. 
            </p>

            <p className="story-desc-secondary">
              Whether you are an adventurous couple discovering the snow corridors of Rohtang, a family boating on emerald Naini Lake, or pilgrims chanting at Kedarnath Dham, our certified native drivers and 24/7 mountain desk ensure safe and seamless travel.
            </p>

            {/* Stats Row/Grid (Matching reference layout) */}
            <div className="stats-metrics-grid">
              <div className="metric-box">
                <div className="metric-number">98%</div>
                <div className="metric-label">Customer Satisfaction</div>
                <div className="metric-sub">Rated 4.9/5 by 4,200+ guests</div>
              </div>

              <div className="metric-box">
                <div className="metric-number">50+</div>
                <div className="metric-label">Popular Destinations</div>
                <div className="metric-sub">Himachal & Uttarakhand</div>
              </div>

              <div className="metric-box">
                <div className="metric-number">180+</div>
                <div className="metric-label">Experienced Mountain Guides</div>
                <div className="metric-sub">Certified hill-certified pilots</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-points-list">
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-icon" />
                <span>Zero Hidden Costs • All Permits & Taxes Included</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-icon" />
                <span>Reserve with Just 20% Token Amount</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-icon" />
                <span>100% Customized Itineraries for Couples & Families</span>
              </div>
            </div>

            <div className="story-action-row">
              <button className="story-cta-btn" onClick={() => onOpenBooking(null)}>
                Customize My Himalayan Itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
