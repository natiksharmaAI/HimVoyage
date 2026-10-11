import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PillStatement from './components/PillStatement';
import StatsStory from './components/StatsStory';
import DestinationsShowcase from './components/DestinationsShowcase';
import TourPackages from './components/TourPackages';
import ValueProps from './components/ValueProps';
import Testimonials from './components/Testimonials';
import CustomTripBanner from './components/CustomTripBanner';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import PackageModal from './components/PackageModal';
import BookingModal from './components/BookingModal';
import { tourPackages, destinations } from './data/travelData';
import './App.css';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [viewingPackage, setViewingPackage] = useState(null);

  const handleOpenBooking = (data = null) => {
    setBookingData(data);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setBookingData(null);
  };

  const handleOpenItinerary = (pkg) => {
    setViewingPackage(pkg);
  };

  const handleCloseItinerary = () => {
    setViewingPackage(null);
  };

  const handleSelectDestination = (dest) => {
    // Look for matching package or open itinerary/booking
    const matchedPkg = tourPackages.find(p => p.id.includes(dest.id) || p.title.toLowerCase().includes(dest.name.toLowerCase()));
    if (matchedPkg) {
      setViewingPackage(matchedPkg);
    } else {
      // Find suitable package or open booking directly with this destination
      handleOpenBooking({
        destination: dest.name,
        state: dest.state,
        price: dest.price,
        title: `${dest.name} Tour Package`
      });
    }
  };

  return (
    <div className="himvoyage-app">
      {/* Navigation Bar */}
      <Navbar 
        onOpenBooking={handleOpenBooking}
        onSelectFilter={(state) => setActiveFilter(state)}
      />

      {/* Hero Section with Tourex aesthetic */}
      <HeroSection 
        onOpenBooking={handleOpenBooking}
        onSelectDestination={handleSelectDestination}
      />

      {/* Signature Inline Pill Statement */}
      <PillStatement />

      {/* Split Section: Tall Mountain Lake Photo & Stats */}
      <StatsStory onOpenBooking={handleOpenBooking} />

      {/* "Experience Our Destination" Showcase */}
      <DestinationsShowcase 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onSelectDestination={handleSelectDestination}
      />

      {/* Curated Tour Packages with Itineraries */}
      <TourPackages 
        onOpenItinerary={handleOpenItinerary}
        onOpenBooking={handleOpenBooking}
      />

      {/* "Ease of travel", "Local Staff Help", "Safe and reliable" */}
      <ValueProps />

      {/* Traveler Reviews & Ratings */}
      <Testimonials />

      {/* Interactive Custom Itinerary Request */}
      <CustomTripBanner />

      {/* Mountain Travel FAQs */}
      <FaqSection />

      {/* Footer */}
      <Footer onSelectFilter={(state) => setActiveFilter(state)} />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenBooking={handleOpenBooking} />

      {/* Detailed Itinerary Modal */}
      {viewingPackage && (
        <PackageModal 
          pkg={viewingPackage}
          onClose={handleCloseItinerary}
          onProceedToBooking={(pkgData) => {
            handleCloseItinerary();
            handleOpenBooking(pkgData);
          }}
        />
      )}

      {/* Interactive Booking & Voucher Modal */}
      {isBookingOpen && (
        <BookingModal 
          initialData={bookingData}
          onClose={handleCloseBooking}
        />
      )}
    </div>
  );
}
