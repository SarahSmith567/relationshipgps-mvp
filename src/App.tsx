import React, { useState } from 'react';
import './App.css';
import MobileHeader from './components/layout/MobileHeader';
import BottomNavigation from './components/layout/BottomNavigation';
import HomeView from './components/views/HomeView';
import GiftsView from './components/views/GiftsView';
import DatesView from './components/views/DatesView';
import CoachView from './components/views/CoachView';
import ProfileView from './components/views/ProfileView';

type ViewType = 'home' | 'gifts' | 'dates' | 'coach' | 'profile';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const handleNavigate = (view: ViewType) => {
    setActiveView(view);
    setSelectedMemberId(null);
  };

  const handleSelectMember = (memberId: string) => {
    setSelectedMemberId(memberId);
    setActiveView('profile');
  };

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} onSelectMember={handleSelectMember} />;
      case 'gifts':
        return <GiftsView />;
      case 'dates':
        return <DatesView />;
      case 'coach':
        return <CoachView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView onNavigate={handleNavigate} onSelectMember={handleSelectMember} />;
    }
  };

  return (
    <div className="app">
      <MobileHeader />
      
      <main className="main-content">
        {renderView()}
      </main>

      <BottomNavigation activeView={activeView} onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
