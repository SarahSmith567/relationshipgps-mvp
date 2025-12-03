import React from 'react';

interface BottomNavigationProps {
  activeView: 'home' | 'gifts' | 'dates' | 'coach' | 'profile';
  onNavigate: (view: 'home' | 'gifts' | 'dates' | 'coach' | 'profile') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'gifts', label: 'Gifts', icon: '💝' },
    { id: 'dates', label: 'Dates', icon: '💕' },
    { id: 'coach', label: 'Coach', icon: '💬' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ] as const;

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${activeView === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
          aria-label={item.label}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
