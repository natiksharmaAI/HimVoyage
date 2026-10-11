import React from 'react';

export default function PillStatement() {
  return (
    <section className="pill-statement-section">
      <div className="container">
        <div className="statement-inner">
          <h2 className="statement-heading">
            <span className="statement-line statement-line-1">
              Take the step and explore{' '}
              <span className="inline-media-pill pill-one">
                <img 
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=80" 
                  alt="Snow peaks" 
                  className="pill-img"
                  loading="eager"
                />
              </span>{' '}
              Himachal
            </span>
            <span className="statement-line statement-line-2">
              & Uttarakhand{' '}
              <span className="inline-media-pill pill-two">
                <img 
                  src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80" 
                  alt="Spiti Valley" 
                  className="pill-img"
                  loading="eager"
                />
              </span>{' '}
              waiting for you.
            </span>
          </h2>
          <p className="statement-subtext">
            Traveling changes you. You see timeless pine valleys, meet warm mountain villagers, and return home with a renewed soul.
          </p>
        </div>
      </div>
    </section>
  );
}
