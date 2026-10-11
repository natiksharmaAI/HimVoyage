import React from 'react';
import { Shield, Users, Compass, Headphones, Sparkles, Check } from 'lucide-react';

export default function ValueProps() {
  const values = [
    {
      icon: <Compass size={28} className="val-icon" />,
      title: 'Ease of travel',
      desc: 'Hassle-free holiday with complete transport, sanitized 4x4 vehicles, hill permits, and smooth transfers from Delhi or Chandigarh.'
    },
    {
      icon: <Users size={28} className="val-icon" />,
      title: 'Local Staff Help',
      desc: 'Professional native local guides who grew up in these valleys will show you hidden paradise places untouched by regular tourism.'
    },
    {
      icon: <Shield size={28} className="val-icon" />,
      title: 'Safe and reliable',
      desc: 'Experience our professional team with 10+ years of high-altitude expertise. Your safety and comfort are 100% guaranteed.'
    },
    {
      icon: <Headphones size={28} className="val-icon" />,
      title: '24/7 Ground Desk',
      desc: 'Real-time road and weather tracking across Atal Tunnel, Rohtang, and Kedarnath with instant assistance on the go.'
    }
  ];

  return (
    <section className="value-props-section">
      <div className="container">
        <div className="value-props-header text-center">
          <div className="section-tag">Why HimVoyage</div>
          <h2 className="section-title">Get a good travel experience</h2>
          <p className="section-subtitle mx-auto">
            A good travel experience is not just about the places visited, but also the stories, friendships, and warm hospitality brought back home.
          </p>
        </div>

        <div className="value-props-grid">
          {values.map((item, idx) => (
            <div key={idx} className="value-card">
              <div className="value-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="value-card-title">{item.title}</h3>
              <p className="value-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
