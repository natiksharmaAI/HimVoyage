# HimVoyage - Himalayan Tours & Travel Platform

> Handcrafted Himalayan Journeys across **Himachal Pradesh** & **Uttarakhand** with native mountain guides, luxury stays, and a Supabase-powered backend.

![HimVoyage Banner](https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Features

- **Tourex-Inspired Luxury Aesthetics:** Cinematic chalet hero backdrop, modern dark/light hybrid palette, and responsive layout across desktop, tablet, and mobile.
- **Floating Hero Booking Card:** Interactive destination selector, date pickers, and guest counter popover.
- **Curated Destinations Showcase:** Filterable circuits across Himachal (Manali, Spiti Valley, Kasol, Dharamshala, Jibhi) and Uttarakhand (Kedarnath, Rishikesh, Auli, Nainital).
- **Tour Packages & Day-Wise Itineraries:** Detailed day-by-day itineraries, inclusions/exclusions, and transparent pricing in INR.
- **Interactive Booking & Reservation Wizard:** Live fare calculation, hotel tiers (Comfort, Premium, Luxury), adventure add-ons (paragliding, rafting, 4x4), and digital printable travel voucher generation.
- **Supabase Cloud Backend:**
  - `bookings` table: Real-time storage of confirmed reservations.
  - `inquiries` table: Custom itinerary quote requests.
  - `newsletter_subscribers` table: Seasonal snow alerts and deals.
  - Row Level Security (RLS) enabled on all tables.
- **Floating Actions:** Direct WhatsApp chat dispatch and quick-reserve button.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 8, Lucide React Icons
- **Styling:** Custom Vanilla CSS Design System (`Plus Jakarta Sans` & `Outfit` typography)
- **Backend & Database:** Supabase (PostgreSQL 17) via `@supabase/supabase-js`

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/natiksharmaAI/HimVoyage.git
cd HimVoyage
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://fsqqiqkvbquiqietwlje.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:5173/` in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📄 License
MIT © HimVoyage Travel Services
