import React, { useState } from 'react';
import { Send, CheckCircle2, Phone, Calendar, MapPin, Sparkles } from 'lucide-react';
import { createInquiry } from '../lib/supabase';

export default function CustomTripBanner() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: 'Himachal Pradesh (Manali / Spiti)',
    duration: '5 to 7 Days',
    budget: 'Standard (₹12k - ₹20k / person)'
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }
    setIsSubmitting(true);
    
    // Save directly to Supabase backend!
    await createInquiry({
      name: formData.name,
      phone: formData.phone,
      destination: formData.destination,
      duration: formData.duration,
      budget: formData.budget,
      status: 'new'
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section className="custom-banner-section" id="contact">
      <div className="container">
        <div className="custom-banner-card">
          <div className="banner-bg-graphics">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
          </div>

          <div className="banner-content-grid">
            <div className="banner-text-side">
              <div className="banner-badge">
                <Sparkles size={14} /> Custom Itinerary Planner
              </div>
              <h2 className="banner-heading">
                Want a personalized trip tailored just for you?
              </h2>
              <p className="banner-desc">
                Tell us your travel dates, group size, and interests. Our native Himalayan travel architects will craft a custom day-by-day plan with transparent quotes within 30 minutes.
              </p>

              <div className="banner-perks">
                <div className="perk-item">
                  <CheckCircle2 size={16} /> 100% Free Customization
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={16} /> Direct Native Drivers (No Middlemen)
                </div>
                <div className="perk-item">
                  <CheckCircle2 size={16} /> Hand-picked Chalets & Treehouses
                </div>
              </div>
            </div>

            <div className="banner-form-side">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="custom-quick-form">
                  <h3 className="quick-form-title">Request Free Custom Quote</h3>

                  <div className="form-field-unit">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Vikramaditya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-field-unit">
                    <label>WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-fields-dual">
                    <div className="form-field-unit">
                      <label>Preferred State</label>
                      <select 
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      >
                        <option value="Himachal Pradesh">🌲 Himachal (Manali/Spiti/Kasol)</option>
                        <option value="Uttarakhand">🕉️ Uttarakhand (Kedarnath/Rishikesh/Auli)</option>
                        <option value="Both Combined">Combined Himachal + Uttarakhand</option>
                      </select>
                    </div>

                    <div className="form-field-unit">
                      <label>Duration</label>
                      <select 
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      >
                        <option value="3 to 4 Days">3 – 4 Days (Weekend)</option>
                        <option value="5 to 7 Days">5 – 7 Days (Popular)</option>
                        <option value="8 to 10 Days">8 – 10 Days (Complete)</option>
                        <option value="10+ Days">10+ Days (Grand Expedition)</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="custom-submit-btn" disabled={isSubmitting}>
                    <span>{isSubmitting ? 'Saving to Database...' : 'Send on WhatsApp & Email'}</span>
                    <Send size={16} />
                  </button>
                </form>
              ) : (
                <div className="quick-form-success">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={38} />
                  </div>
                  <h4>Thank You, {formData.name}!</h4>
                  <p>Your custom trip inquiry has been <strong>safely saved to our database</strong> and dispatched to our Manali travel desk. We will WhatsApp the tailored plan for {formData.destination} to <strong>{formData.phone}</strong> shortly.</p>
                  <button 
                    className="btn-again"
                    onClick={() => setIsSuccess(false)}
                  >
                    Submit Another Query
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
