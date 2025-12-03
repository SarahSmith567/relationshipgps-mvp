import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../../data/mockData';
import { loadFamilyMembers, calculateUpcomingEvents, dailyNudge } from '../../data/realData';

interface HomeViewProps {
  onNavigate: (view: 'gifts' | 'dates' | 'coach') => void;
  onSelectMember: (memberId: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectMember }) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const members = await loadFamilyMembers();
      setFamilyMembers(members);
      
      const events = calculateUpcomingEvents(members);
      setUpcomingEvents(events);
      
      setLoading(false);
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="home-view">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading your family data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-view">
      {/* Daily Nudge */}
      <section className="daily-nudge-section">
        <div className="nudge-card">
          <div className="nudge-header">
            <span className="nudge-icon">✨</span>
            <h3>Today's Nudge</h3>
          </div>
          <p className="nudge-text">{dailyNudge.text}</p>
          <div className="nudge-meta">
            <span className="love-language-tag">{dailyNudge.loveLanguage}</span>
            <button className="btn-text">Mark Done</button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <div className="quick-actions-grid">
          <button 
            className="quick-action-card"
            onClick={() => onNavigate('gifts')}
          >
            <span className="action-icon">💝</span>
            <span className="action-label">Get Gift Ideas</span>
          </button>
          <button 
            className="quick-action-card"
            onClick={() => onNavigate('dates')}
          >
            <span className="action-icon">💕</span>
            <span className="action-label">Plan a Date</span>
          </button>
          <button 
            className="quick-action-card"
            onClick={() => onNavigate('coach')}
          >
            <span className="action-icon">💬</span>
            <span className="action-label">Talk to Coach</span>
          </button>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="upcoming-events-section">
          <div className="section-header">
            <h2>Upcoming</h2>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <span className="event-icon">
                  {event.type === 'birthday' ? '🎂' : '💑'}
                </span>
                <div className="event-info">
                  <p className="event-name">{event.name}</p>
                  <p className="event-date">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })} • {event.daysUntil} days
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Family Section */}
      <section className="family-section">
        <div className="section-header">
          <h2>My Family</h2>
          <span className="member-count">{familyMembers.length} members</span>
        </div>
        <div className="family-grid">
          {familyMembers.map((member) => (
            <div 
              key={member.id} 
              className="family-member-card"
              onClick={() => onSelectMember(member.id)}
            >
              <div className="member-avatar">{member.avatar}</div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-relationship">{member.relationship}</p>
                {member.age > 0 && <p className="member-age">Age {member.age}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
