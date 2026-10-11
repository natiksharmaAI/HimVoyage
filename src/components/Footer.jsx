import React, { useState } from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Heart, ArrowUp, Send, Check } from 'lucide-react';
import { subscribeNewsletter } from '../lib/supabase';

export default function Footer({ onSelectFilter }) {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterClick = (stateName) => {
    onSelectFilter(stateName);
    const el = document.getElementById('destinations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterInput) return;
    setNewsletterSubmitting(true);
    await subscribeNewsletter(newsletterInput);
    setNewsletterSubmitting(false);
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="footer-main">
      <div className="container">
        {/* Top Footer Grid */}
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand-logo">
              <div className="brand-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 19H21L12 2Z" fill="white" />
                  <path d="M12 7L7 17H17L12 7Z" fill="#0c141c" />
                  <path d="M12 11L9.5 16H14.5L12 11Z" fill="#10b981" />
                </svg>
              </div>
              <span className="brand-name">himvoyage</span>
            </div>
            
            <p className="footer-tagline">
              Your trusted native travel partner in Himachal Pradesh and Uttarakhand. Crafting authentic Himalayan vacations, 4x4 passes, and sacred pilgrimages.
            </p>

            {/* Newsletter Subscription */}
            <div style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.35rem' }}>
                ❄️ Snow Alerts & Festive Discounts
              </div>
              {!newsletterSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: '0.4rem' }}>
                  <input 
                    type="text" 
                    placeholder="Enter email or WhatsApp..."
                    value={newsletterInput}
                    onChange={(e) => setNewsletterInput(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      outline: 'none'
                    }}
                  />
                  <button 
                    type="submit"
                    disabled={newsletterSubmitting}
                    style={{
                      background: '#10b981',
                      border: 'none',
                      color: '#ffffff',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: '700'
                    }}
                  >
                    {newsletterSubmitting ? '...' : 'Join'}
                  </button>
                </form>
              ) : (
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600' }}>
                  ✓ Subscribed! You will receive snow updates.
                </div>
              )}
            </div>

            <div className="accreditation-badges">
              <span className="acc-badge">🏔️ HP Tourism Certified</span>
              <span className="acc-badge">🇮🇳 Incredible India Partner</span>
            </div>
          </div>

          {/* Himachal Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Himachal Pradesh</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleFilterClick('Himachal Pradesh')}>Manali & Solang Valley</button></li>
              <li><button onClick={() => handleFilterClick('Himachal Pradesh')}>Spiti Valley 4x4 Expedition</button></li>
              <li><button onClick={() => handleFilterClick('Himachal Pradesh')}>Kasol & Parvati Valley</button></li>
              <li><button onClick={() => handleFilterClick('Himachal Pradesh')}>Dharamshala & Bir Billing</button></li>
              <li><button onClick={() => handleFilterClick('Himachal Pradesh')}>Shimla, Kufri & Chail</button></li>
              <li><button onClick={() => handleFilterClick('Himachal Pradesh')}>Jibhi & Tirthan Valley</button></li>
              <li><button onClick={() => handleFilterClick('Himachal Pradesh')}>Kinnaur & Chitkul Village</button></li>
            </ul>
          </div>

          {/* Uttarakhand Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Uttarakhand</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleFilterClick('Uttarakhand')}>Kedarnath & Badrinath Yatra</button></li>
              <li><button onClick={() => handleFilterClick('Uttarakhand')}>Rishikesh Rafting & Camping</button></li>
              <li><button onClick={() => handleFilterClick('Uttarakhand')}>Auli Ski Slopes & Joshimath</button></li>
              <li><button onClick={() => handleFilterClick('Uttarakhand')}>Nainital Lakes & Corbett Safari</button></li>
              <li><button onClick={() => handleFilterClick('Uttarakhand')}>Mussoorie & George Everest</button></li>
              <li><button onClick={() => handleFilterClick('Uttarakhand')}>Chopta Tungnath Shiva Trek</button></li>
              <li><button onClick={() => handleFilterClick('Uttarakhand')}>Valley of Flowers National Park</button></li>
            </ul>
          </div>

          {/* Office Contact Details */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Headquarters & Hubs</h4>
            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <div>
                <strong>Manali HQ (Himachal Pradesh):</strong>
                <p>Near Circuit House, The Mall Road, Manali, Distt. Kullu, H.P. - 175131</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <MapPin size={18} className="contact-icon" />
              <div>
                <strong>Dehradun Hub (Uttarakhand):</strong>
                <p>Rajpur Road, Near Clock Tower, Dehradun, Uttarakhand - 248001</p>
              </div>
            </div>

            <div className="footer-contact-item">
              <Phone size={18} className="contact-icon" />
              <div>
                <a href="tel:+919816045678">+91 98160 45678</a>
                <span className="contact-sub"> / +91 94180 89234</span>
              </div>
            </div>

            <div className="footer-contact-item">
              <Mail size={18} className="contact-icon" />
              <div>
                <a href="mailto:hello@himvoyage.com">hello@himvoyage.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="footer-bottom-strip">
          <div className="footer-copyright">
            © {new Date().getFullYear()} HimVoyage Travel Services (OPC) Pvt. Ltd. All rights reserved. Made with love for the Himalayas.
          </div>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Booking</a>
            <span>•</span>
            <a href="#">Cancellation & Refund Policy</a>
          </div>

          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Scroll back to top">
            <ArrowUp size={16} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
