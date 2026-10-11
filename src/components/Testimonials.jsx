import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { reviews } from '../data/travelData';

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="reviews">
      <div className="container">
        <div className="text-center testimonials-header">
          <div className="section-tag">Traveler Stories</div>
          <h2 className="section-title">Loved by Travelers Across India</h2>
          <p className="section-subtitle mx-auto">
            From solo backpackers in Spiti to honeymoon couples in Manali and families at Kedarnath — read real stories from our guests.
          </p>
        </div>

        <div className="testimonials-grid">
          {reviews.map(item => (
            <div key={item.id} className="review-card">
              <div className="review-card-top">
                <div className="review-author-info">
                  <img src={item.avatar} alt={item.name} className="review-avatar" />
                  <div>
                    <h4 className="review-name">{item.name}</h4>
                    <span className="review-city">{item.city} • {item.date}</span>
                  </div>
                </div>
                <div className="review-verified-badge">
                  <CheckCircle2 size={14} />
                  <span>Verified</span>
                </div>
              </div>

              <div className="review-stars-row">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <div className="review-tour-tag">
                <span>Tour: {item.tour}</span>
              </div>

              <p className="review-comment">
                "{item.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
