import React from 'react';

interface MobileHeaderProps {
  title?: string;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ title = 'RelationshipGPS' }) => {
  return (
    <header className="mobile-header">
      <div className="header-content">
        <h1 className="app-title">{title}</h1>
        <button className="notification-button" aria-label="Notifications">
          <span className="notification-icon">🔔</span>
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
