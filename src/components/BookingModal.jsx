import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Users, MapPin, CheckCircle, ShieldCheck, 
  Sparkles, Download, Phone, Mail, User, CreditCard, ArrowRight, Printer
} from 'lucide-react';
import { tourPackages, destinations } from '../data/travelData';

import { createBooking } from '../lib/supabase';

export default function BookingModal({ initialData, onClose }) {
  // Pre-fill or default
  const defaultPackage = initialData?.title 
    ? initialData.title 
    : (tourPackages.find(p => p.id === initialData?.packageId)?.title || 'The Ultimate Himachal Odyssey');

  const [selectedPackageTitle, setSelectedPackageTitle] = useState(defaultPackage);
  const [pickupCity, setPickupCity] = useState('Delhi (Airport / ISBT)');
  const [travelDate, setTravelDate] = useState(initialData?.checkIn || '2026-10-20');
  const [adults, setAdults] = useState(initialData?.adults || 2);
  const [children, setChildren] = useState(initialData?.children || 0);
  const [hotelTier, setHotelTier] = useState('premium'); // comfort, premium, luxury
  
  // Optional add-ons
  const [addons, setAddons] = useState({
    paragliding: false,
    rafting: false,
    candlelight: false,
    fourByFour: false
  });

  // Traveler contact
  const [travelerName, setTravelerName] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  
  // Coupon
  const [couponCode, setCouponCode] = useState('HIMALAYA1000');
  const [isCouponApplied, setIsCouponApplied] = useState(true);

  // Confirmation state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [dbRecordId, setDbRecordId] = useState(null);

  // Find active package data
  const currentPkg = tourPackages.find(p => p.title === selectedPackageTitle) || tourPackages[0];
  const basePricePerPerson = currentPkg ? currentPkg.pricePerPerson : 14999;

  // Hotel tier multiplier
  const hotelMultiplier = hotelTier === 'luxury' ? 1.25 : hotelTier === 'comfort' ? 0.9 : 1.0;

  // Addons total
  let addonsTotal = 0;
  if (addons.paragliding) addonsTotal += 2500 * adults;
  if (addons.rafting) addonsTotal += 1200 * adults;
  if (addons.candlelight) addonsTotal += 1800;
  if (addons.fourByFour) addonsTotal += 2200;

  // Calculate pricing
  const guestsCost = (adults * basePricePerPerson * hotelMultiplier) + (children * basePricePerPerson * 0.5 * hotelMultiplier);
  const subTotal = guestsCost + addonsTotal;
  const discount = isCouponApplied ? 1000 : 0;
  const taxableAmount = Math.max(0, subTotal - discount);
  const gst = Math.round(taxableAmount * 0.05);
  const grandTotal = Math.round(taxableAmount + gst);
  const tokenAdvance = Math.round(grandTotal * 0.20);

  const toggleAddon = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!travelerName || !travelerPhone) {
      alert('Please enter your Name and WhatsApp phone number to receive your booking voucher.');
      return;
    }
    setIsSubmitting(true);
    const refCode = 'HIM-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);

    // Save directly to Supabase backend!
    const bookingPayload = {
      booking_ref: refCode,
      package_title: selectedPackageTitle,
      destination: currentPkg?.name || selectedPackageTitle,
      state: currentPkg?.state || 'Himachal Pradesh',
      travel_date: travelDate,
      pickup_city: pickupCity,
      adults: Number(adults),
      children: Number(children),
      hotel_tier: hotelTier,
      addons: addons,
      traveler_name: travelerName,
      traveler_phone: travelerPhone,
      traveler_email: travelerEmail || null,
      special_notes: specialNotes || null,
      subtotal: subTotal,
      discount: discount,
      gst: gst,
      total_amount: grandTotal,
      token_advance: tokenAdvance,
      status: 'confirmed'
    };

    const result = await createBooking(bookingPayload);
    if (result.success && result.data) {
      setDbRecordId(result.data.id);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog-booking" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="booking-modal-header">
          <div>
            <span className="booking-header-tag">Instant Himalayan Reservation</span>
            <h2 className="booking-modal-title">
              {isSubmitted ? 'Booking Confirmed!' : 'Reserve Your Mountain Holiday'}
            </h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close booking modal">
            <X size={20} />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleBookingSubmit} className="booking-form-grid">
            {/* Left Column: Trip Configuration */}
            <div className="booking-config-col">
              {/* Package Select */}
              <div className="booking-field-group">
                <label className="booking-label">Selected Tour Package / Destination</label>
                <select 
                  className="booking-select"
                  value={selectedPackageTitle}
                  onChange={(e) => setSelectedPackageTitle(e.target.value)}
                  id="booking-package-select"
                >
                  <optgroup label="🌲 Himachal Pradesh Packages">
                    {tourPackages.filter(p => p.state === 'Himachal Pradesh').map(p => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.duration}) • ₹{p.pricePerPerson.toLocaleString('en-IN')}/pax
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🕉️ Uttarakhand Packages">
                    {tourPackages.filter(p => p.state === 'Uttarakhand').map(p => (
                      <option key={p.id} value={p.title}>
                        {p.title} ({p.duration}) • ₹{p.pricePerPerson.toLocaleString('en-IN')}/pax
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Pickup Point & Date Row */}
              <div className="booking-form-row">
                <div className="booking-field-group">
                  <label className="booking-label">Arrival / Pickup Hub</label>
                  <select 
                    className="booking-select"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    id="booking-pickup-select"
                  >
                    <option value="Delhi (Airport / ISBT)">Delhi (Airport / ISBT Kashmiri Gate)</option>
                    <option value="Chandigarh (Airport / Station)">Chandigarh (Airport / Railway)</option>
                    <option value="Dehradun (Jolly Grant / Station)">Dehradun (Jolly Grant Airport)</option>
                    <option value="Haridwar (Railway Station)">Haridwar (Railway Station)</option>
                    <option value="Shimla (Local Pickup)">Shimla (Local Pickup)</option>
                    <option value="Manali (Local Pickup)">Manali (Local Pickup)</option>
                  </select>
                </div>

                <div className="booking-field-group">
                  <label className="booking-label">Start Date</label>
                  <input 
                    type="date"
                    className="booking-input"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                    id="booking-travel-date"
                  />
                </div>
              </div>

              {/* Guest Counts */}
              <div className="booking-form-row">
                <div className="booking-field-group">
                  <label className="booking-label">Adults (12+ Yrs)</label>
                  <div className="stepper-inline">
                    <button 
                      type="button" 
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                    >-</button>
                    <span>{adults}</span>
                    <button 
                      type="button" 
                      onClick={() => setAdults(adults + 1)}
                    >+</button>
                  </div>
                </div>

                <div className="booking-field-group">
                  <label className="booking-label">Children (2–11 Yrs)</label>
                  <div className="stepper-inline">
                    <button 
                      type="button" 
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >-</button>
                    <span>{children}</span>
                    <button 
                      type="button" 
                      onClick={() => setChildren(children + 1)}
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Hotel Tier Selection */}
              <div className="booking-field-group">
                <label className="booking-label">Accommodation Standard</label>
                <div className="tier-pills-row">
                  <button
                    type="button"
                    className={`tier-pill ${hotelTier === 'comfort' ? 'active' : ''}`}
                    onClick={() => setHotelTier('comfort')}
                  >
                    <div className="tier-name">Comfort (3-Star)</div>
                    <div className="tier-desc">Clean cozy mountain stays</div>
                  </button>
                  <button
                    type="button"
                    className={`tier-pill ${hotelTier === 'premium' ? 'active' : ''}`}
                    onClick={() => setHotelTier('premium')}
                  >
                    <div className="tier-name">Premium (4-Star) ⭐</div>
                    <div className="tier-desc">River chalets & views</div>
                  </button>
                  <button
                    type="button"
                    className={`tier-pill ${hotelTier === 'luxury' ? 'active' : ''}`}
                    onClick={() => setHotelTier('luxury')}
                  >
                    <div className="tier-name">Luxury Heritage</div>
                    <div className="tier-desc">Treehouses & glass domes</div>
                  </button>
                </div>
              </div>

              {/* Himalayan Adventure Add-Ons */}
              <div className="booking-field-group">
                <label className="booking-label">Experience Add-Ons (Optional)</label>
                <div className="addons-grid">
                  <label className={`addon-chip ${addons.paragliding ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addons.paragliding}
                      onChange={() => toggleAddon('paragliding')}
                    />
                    <div>
                      <div className="addon-title">🪂 Tandem Paragliding</div>
                      <div className="addon-price">+₹2,500 / pax</div>
                    </div>
                  </label>

                  <label className={`addon-chip ${addons.rafting ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addons.rafting}
                      onChange={() => toggleAddon('rafting')}
                    />
                    <div>
                      <div className="addon-title">🚣 16km River Rafting</div>
                      <div className="addon-price">+₹1,200 / pax</div>
                    </div>
                  </label>

                  <label className={`addon-chip ${addons.candlelight ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addons.candlelight}
                      onChange={() => toggleAddon('candlelight')}
                    />
                    <div>
                      <div className="addon-title">🕯️ Candlelight Chalet Dinner</div>
                      <div className="addon-price">+₹1,800 / couple</div>
                    </div>
                  </label>

                  <label className={`addon-chip ${addons.fourByFour ? 'selected' : ''}`}>
                    <input 
                      type="checkbox" 
                      checked={addons.fourByFour}
                      onChange={() => toggleAddon('fourByFour')}
                    />
                    <div>
                      <div className="addon-title">🚙 4x4 Snow Pass Dedicated</div>
                      <div className="addon-price">+₹2,200 / vehicle</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Traveler Information Form */}
              <div className="booking-field-group traveler-info-box">
                <div className="traveler-box-title">Traveler & WhatsApp Details</div>
                <div className="booking-form-row">
                  <div className="input-with-label">
                    <label>Lead Traveler Full Name *</label>
                    <div className="input-icon-wrap">
                      <User size={16} />
                      <input 
                        type="text" 
                        placeholder="e.g. Rohan Mehta"
                        value={travelerName}
                        onChange={(e) => setTravelerName(e.target.value)}
                        required
                        className="booking-text-input"
                        id="booking-traveler-name"
                      />
                    </div>
                  </div>

                  <div className="input-with-label">
                    <label>WhatsApp Phone Number *</label>
                    <div className="input-icon-wrap">
                      <Phone size={16} />
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210"
                        value={travelerPhone}
                        onChange={(e) => setTravelerPhone(e.target.value)}
                        required
                        className="booking-text-input"
                        id="booking-traveler-phone"
                      />
                    </div>
                  </div>
                </div>

                <div className="input-with-label" style={{ marginTop: '0.8rem' }}>
                  <label>Email Address (For PDF Voucher)</label>
                  <div className="input-icon-wrap">
                    <Mail size={16} />
                    <input 
                      type="email" 
                      placeholder="rohan@example.com"
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      className="booking-text-input"
                      id="booking-traveler-email"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Fare Summary & Reservation */}
            <div className="booking-summary-col">
              <div className="fare-summary-card">
                <h3 className="fare-card-title">Fare Summary</h3>
                <div className="fare-pkg-name">{currentPkg.title}</div>
                <div className="fare-route">{currentPkg.subtitle}</div>

                <div className="fare-breakdown-list">
                  <div className="fare-row">
                    <span>Base Package ({adults} Adults × ₹{Math.round(basePricePerPerson * hotelMultiplier).toLocaleString('en-IN')})</span>
                    <span>₹{Math.round(adults * basePricePerPerson * hotelMultiplier).toLocaleString('en-IN')}</span>
                  </div>

                  {children > 0 && (
                    <div className="fare-row">
                      <span>Children Fare ({children} Kids @ 50%)</span>
                      <span>₹{Math.round(children * basePricePerPerson * 0.5 * hotelMultiplier).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {addonsTotal > 0 && (
                    <div className="fare-row">
                      <span>Experience Add-Ons</span>
                      <span>₹{addonsTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {isCouponApplied && (
                    <div className="fare-row coupon-row">
                      <span className="coupon-label">
                        <Sparkles size={14} /> Coupon Applied ({couponCode})
                      </span>
                      <span className="coupon-discount">-₹1,000</span>
                    </div>
                  )}

                  <div className="fare-row">
                    <span>GST (5% Mountain Tourism)</span>
                    <span>₹{gst.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="fare-divider"></div>

                  <div className="fare-total-row">
                    <span>Total Package Cost</span>
                    <span className="grand-total-amount">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="token-callout-box">
                    <div className="token-label">Pay Only 20% Token Today to Lock Price</div>
                    <div className="token-val">₹{tokenAdvance.toLocaleString('en-IN')}</div>
                    <div className="token-sub">Remaining ₹{(grandTotal - tokenAdvance).toLocaleString('en-IN')} payable on arrival in {pickupCity.split(' ')[0]}</div>
                  </div>
                </div>

                <div className="booking-security-badges">
                  <div className="sec-badge">
                    <ShieldCheck size={16} /> 100% Refundable up to 7 Days
                  </div>
                  <div className="sec-badge">
                    <CheckCircle size={16} /> Verified Native Drivers & Stays
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="confirm-booking-btn"
                  id="submit-booking-btn"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Saving to Database...' : 'Confirm Reservation Voucher'}</span>
                  <ArrowRight size={18} />
                </button>

                <p className="instant-notice">
                  No immediate payment deducted. You will receive an instant digital booking confirmation voucher and our Manali travel desk will message you on WhatsApp within 10 minutes.
                </p>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Screen / Digital Boarding Pass Voucher */
          <div className="booking-confirmation-view">
            <div className="confirmation-banner">
              <div className="conf-icon-circle">
                <CheckCircle size={42} />
              </div>
              <h3 className="conf-heading">Your Himalayan Trip is Reserved!</h3>
              <p className="conf-sub">
                A digital reservation copy has been generated. Our mountain travel lead has dispatched this to <strong>{travelerPhone || '+91-WhatsApp'}</strong>.
              </p>
            </div>

            {/* Travel Voucher Card */}
            <div className="travel-voucher-card" id="printable-voucher">
              <div className="voucher-header">
                <div>
                  <div className="voucher-logo">🏔️ himvoyage • Travel Voucher</div>
                  <div className="voucher-agency">Himalayan Horizons Tourism Pvt Ltd, The Mall, Manali (H.P.)</div>
                </div>
                <div className="voucher-ref-box">
                  <div className="ref-label">Booking Reference</div>
                  <div className="ref-code">{bookingRef}</div>
                </div>
              </div>

              <div className="voucher-grid">
                <div className="voucher-item">
                  <span className="v-label">Tour Package</span>
                  <span className="v-val">{selectedPackageTitle}</span>
                </div>
                <div className="voucher-item">
                  <span className="v-label">Travel Date</span>
                  <span className="v-val">{travelDate}</span>
                </div>
                <div className="voucher-item">
                  <span className="v-label">Lead Traveler</span>
                  <span className="v-val">{travelerName}</span>
                </div>
                <div className="voucher-item">
                  <span className="v-label">Guests Count</span>
                  <span className="v-val">{adults} Adults{children > 0 ? `, ${children} Children` : ''}</span>
                </div>
                <div className="voucher-item">
                  <span className="v-label">Pickup Location</span>
                  <span className="v-val">{pickupCity}</span>
                </div>
                <div className="voucher-item">
                  <span className="v-label">Hotel Category</span>
                  <span className="v-val">{hotelTier.toUpperCase()} Deluxe</span>
                </div>
              </div>

              <div className="voucher-pricing-strip">
                <div>
                  <span className="v-strip-label">Total Fare</span>
                  <span className="v-strip-num">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="v-strip-label">Token Advance (20%)</span>
                  <span className="v-strip-num green">₹{tokenAdvance.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="v-strip-label">Status</span>
                  <span className="v-badge-confirmed">CONFIRMED RESERVATION</span>
                </div>
              </div>

              <div className="voucher-footer-notes">
                <span>Emergency Mountain Operations Desk: +91 98160 45678 • Registered HP Tourism License: HP/TO/2024-9182</span>
                <span style={{ display: 'block', marginTop: '6px', color: '#059669', fontWeight: '700' }}>
                  ✓ Record Synced with Cloud Database {dbRecordId ? `(ID: ${dbRecordId.slice(0, 8)}...)` : ''}
                </span>
              </div>
            </div>

            {/* Voucher Actions */}
            <div className="voucher-actions-row">
              <button className="voucher-btn secondary" onClick={handlePrint}>
                <Printer size={16} />
                <span>Print / Save Voucher</span>
              </button>
              <button 
                className="voucher-btn primary"
                onClick={() => {
                  const msg = encodeURIComponent(`Hi HimVoyage! I have reserved ${selectedPackageTitle} with Ref: ${bookingRef} for ${travelerName}. Please send the complete itinerary.`);
                  window.open(`https://wa.me/919816045678?text=${msg}`, '_blank');
                }}
              >
                <Phone size={16} />
                <span>Chat on WhatsApp</span>
              </button>
              <button className="voucher-btn text-only" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
