import React, { useState } from 'react';
import { 
  X, Check, AlertCircle, Clock, MapPin, Car, Hotel, Calendar, 
  ArrowRight, ShieldCheck, Heart 
} from 'lucide-react';

export default function PackageModal({ pkg, onClose, onProceedToBooking }) {
  const [activeDay, setActiveDay] = useState(1);

  if (!pkg) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog-large" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header Bar */}
        <div className="modal-top-bar">
          <div className="modal-state-tags">
            <span className="modal-badge-flag">{pkg.badge}</span>
            <span className="modal-badge-state">{pkg.state}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Hero Banner */}
        <div className="modal-hero-cover">
          <img src={pkg.image} alt={pkg.title} className="modal-cover-img" />
          <div className="modal-cover-gradient"></div>
          <div className="modal-cover-content">
            <h2 className="modal-title">{pkg.title}</h2>
            <p className="modal-subtitle">{pkg.subtitle}</p>
            <div className="modal-meta-pills">
              <span><Clock size={14} /> {pkg.duration}</span>
              <span><Car size={14} /> {pkg.transportType || 'Private Dedicated Hill Cab'}</span>
              <span><Hotel size={14} /> {pkg.hotelCategory || '4-Star Boutique Stays'}</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scrollable">
          {/* Overview Section */}
          <div className="modal-section">
            <h3 className="modal-section-title">Tour Overview</h3>
            <p className="modal-section-text">{pkg.description}</p>
          </div>

          {/* Day-by-Day Detailed Itinerary */}
          <div className="modal-section">
            <div className="itinerary-header-row">
              <h3 className="modal-section-title">Day-Wise Detailed Itinerary</h3>
              <span className="itinerary-counter">{pkg.itinerary ? pkg.itinerary.length : 5} Days Breakdown</span>
            </div>

            <div className="timeline-container">
              {pkg.itinerary && pkg.itinerary.map((dayItem) => (
                <div key={dayItem.day} className="timeline-card">
                  <div className="timeline-day-badge">Day 0{dayItem.day}</div>
                  <div className="timeline-card-content">
                    <h4 className="timeline-day-title">{dayItem.title}</h4>
                    <p className="timeline-day-desc">{dayItem.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions Two Columns */}
          <div className="modal-section inclusions-exclusions-grid">
            <div className="inclusions-col">
              <h4 className="inc-col-title green">
                <Check size={18} /> Inclusions (Everything Covered)
              </h4>
              <ul className="inc-list">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i}>
                    <Check size={14} className="inc-icon-yes" />
                    <span>{inc}</span>
                  </li>
                ))}
                <li>
                  <Check size={14} className="inc-icon-yes" />
                  <span>All Tolls, Parking, Green Tax & Fuel Charges</span>
                </li>
                <li>
                  <Check size={14} className="inc-icon-yes" />
                  <span>Dedicated Mountain Chauffeur with 8+ Yrs Experience</span>
                </li>
              </ul>
            </div>

            <div className="exclusions-col">
              <h4 className="inc-col-title red">
                <AlertCircle size={18} /> Exclusions (Self-Pay)
              </h4>
              <ul className="inc-list">
                <li>Personal expenses like laundry, alcoholic beverages, camera fees</li>
                <li>Optional adventure rides (Rohtang snow scooter, pony/horse rides)</li>
                <li>Airfare / Train tickets to arrival hub (available on request)</li>
                <li>Any travel insurance or medical emergencies beyond initial first-aid</li>
              </ul>
            </div>
          </div>

          {/* Stays & Fleet Info */}
          <div className="modal-section fleet-info-box">
            <div className="fleet-box-item">
              <Hotel size={22} className="fleet-icon" />
              <div>
                <div className="fleet-title">Accommodations Provided</div>
                <div className="fleet-desc">{pkg.hotelCategory || 'Boutique River Chalets, Luxury Alpine Camps & 4-Star Mountain Resorts'}</div>
              </div>
            </div>
            <div className="fleet-box-item">
              <ShieldCheck size={22} className="fleet-icon" />
              <div>
                <div className="fleet-title">Safety & Sanitization</div>
                <div className="fleet-desc">GPS tracked vehicles, certified native hill drivers, complimentary first aid & oxygen kit on high altitude routes.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="modal-bottom-footer">
          <div className="modal-price-lockup">
            <div className="price-tagline">Special Discounted Fare</div>
            <div className="price-number">
              ₹{(pkg.pricePerPerson || pkg.price).toLocaleString('en-IN')}
              <span className="per-person"> / person</span>
            </div>
          </div>

          <div className="modal-actions-right">
            <button className="modal-cancel-btn" onClick={onClose}>
              Close
            </button>
            <button 
              className="modal-book-btn"
              onClick={() => {
                onClose();
                onProceedToBooking({
                  packageId: pkg.id,
                  title: pkg.title || pkg.name,
                  state: pkg.state,
                  duration: pkg.duration,
                  price: pkg.pricePerPerson || pkg.price
                });
              }}
            >
              <span>Proceed to Reserve</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
