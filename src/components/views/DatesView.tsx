import React, { useState } from 'react';
import { familyMembers, sampleDatePlan } from '../../data/mockData';
import VoiceInputButton from '../shared/VoiceInputButton';
import BackButton from '../shared/BackButton';
import { generateDatePlan } from '../../services/openai';

interface DatesViewProps {
  onBack?: () => void;
}

const DatesView: React.FC<DatesViewProps> = ({ onBack }) => {
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('evening');
  const [budget, setBudget] = useState('50_100');
  const [showPlan, setShowPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiDatePlan, setAiDatePlan] = useState<string>('');
  const [error, setError] = useState<string>('');

  const budgetOptions = [
    { value: 'under_25', label: 'Under $25' },
    { value: '25_50', label: '$25 - $50' },
    { value: '50_100', label: '$50 - $100' },
    { value: '100_250', label: '$100 - $250' },
    { value: '250_plus', label: '$250+' }
  ];

  const dayOptions = [
    { value: 'this_weekend', label: 'This Weekend' },
    { value: 'next_friday', label: 'Next Friday' },
    { value: 'next_saturday', label: 'Next Saturday' },
    { value: 'next_week', label: 'Sometime Next Week' },
    { value: 'two_weeks', label: 'In Two Weeks' }
  ];

  const timeOptions = [
    { value: 'morning', label: 'Morning (10:00 AM)' },
    { value: 'lunch', label: 'Lunch Time (12:00 PM)' },
    { value: 'afternoon', label: 'Afternoon (2:00 PM)' },
    { value: 'evening', label: 'Evening (7:00 PM)' },
    { value: 'night', label: 'Night (9:00 PM)' }
  ];

  const handlePlanDate = async () => {
    console.log('handlePlanDate called', { selectedMember, selectedDay, selectedTime, budget });
    
    // Use defaults if not selected
    const memberId = selectedMember || 'laurie';
    const day = selectedDay || 'this_weekend';
    
    setIsLoading(true);
    setError('');
    
    try {
      const member = familyMembers.find(m => m.id === memberId);
      const budgetLabel = budgetOptions.find(b => b.value === budget)?.label || '$50-$100';
      
      const dayLabel = dayOptions.find(d => d.value === day)?.label || 'soon';
      const timeLabel = timeOptions.find(t => t.value === selectedTime)?.label || 'evening';
      const dateTimeStr = `${dayLabel} at ${timeLabel}`;
      
      const datePlan = await generateDatePlan({
        partnerName: member?.name || 'your partner',
        dateTime: dateTimeStr,
        budget: budgetLabel,
        preferences: member ? `They enjoy quality time and meaningful experiences` : ''
      });
      
      setAiDatePlan(datePlan);
      setShowPlan(true);
    } catch (err) {
      setError('Sorry, I had trouble creating a date plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    console.log('Voice input:', text);
    // TODO: Parse voice input and fill form
  };

  const handleBack = () => {
    setShowPlan(false);
    if (onBack) onBack();
  };

  return (
    <div className="dates-view">
      <BackButton onClick={handleBack} />
      {!showPlan ? (
        <div className="date-request-form">
          <h2>Plan a Date</h2>
          <p className="form-description">
            I'll create a complete date plan with activity, dining, and a sweet gesture
          </p>

          <div className="form-group">
            <label>Who is this date with?</label>
            <select 
              value={selectedMember} 
              onChange={(e) => setSelectedMember(e.target.value)}
              className="form-select"
            >
              <option value="">Select a family member</option>
              {familyMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.relationship})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>What day?</label>
            <select 
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="form-select"
            >
              <option value="">Select a day</option>
              {dayOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>What time?</label>
            <select 
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="form-select"
            >
              {timeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>What's your budget?</label>
            <select 
              value={budget} 
              onChange={(e) => setBudget(e.target.value)}
              className="form-select"
            >
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button 
              className="btn btn-primary btn-large"
              onClick={handlePlanDate}
              disabled={isLoading}
            >
              {isLoading ? 'Planning your date...' : 'Plan My Date'}
            </button>
            
            <div className="voice-input-container">
              <VoiceInputButton onTranscription={handleVoiceInput} size="large" />
              <span className="voice-hint">Or use voice</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="date-plan">
          <div className="plan-header">
            <button 
              className="btn-back"
              onClick={() => setShowPlan(false)}
            >
              ← Back
            </button>
            <h2>Date Plan for {familyMembers.find(m => m.id === selectedMember)?.name || 'Laurie'}</h2>
            <p className="plan-meta">
              {dayOptions.find(d => d.value === selectedDay)?.label || 'This Weekend'} at {timeOptions.find(t => t.value === selectedTime)?.label || 'Evening'}
            </p>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button className="btn btn-secondary" onClick={() => setShowPlan(false)}>Try Again</button>
            </div>
          )}

          <>
          {aiDatePlan && (
            <div className="ai-date-plan-text">
              <div className="date-plan-content">
                {aiDatePlan.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}

          {!aiDatePlan && !error && (
            <>
            <div className="date-plan-sections">
              {/* Activity Section */}
              <div className="plan-section activity-section">
              <div className="section-icon">🎵</div>
              <div className="section-content">
                <h3>Activity</h3>
                <h4 className="section-title">{sampleDatePlan.activity.name}</h4>
                <div className="section-details">
                  <p><strong>Time:</strong> {sampleDatePlan.activity.time}</p>
                  <p><strong>Location:</strong> {sampleDatePlan.activity.location}</p>
                  <p><strong>Cost:</strong> {sampleDatePlan.activity.price}</p>
                </div>
                <p className="why-fit">
                  <strong>Why this fits:</strong> {sampleDatePlan.activity.whyFit}
                </p>
                <button className="btn btn-secondary btn-small">
                  Get Tickets
                </button>
              </div>
            </div>

            {/* Dining Section */}
            <div className="plan-section dining-section">
              <div className="section-icon">🍽️</div>
              <div className="section-content">
                <h3>Dining</h3>
                <h4 className="section-title">{sampleDatePlan.dining.name}</h4>
                <div className="section-details">
                  <p><strong>Cuisine:</strong> {sampleDatePlan.dining.cuisine}</p>
                  <p><strong>Price Level:</strong> {sampleDatePlan.dining.priceLevel}</p>
                  <p><strong>Address:</strong> {sampleDatePlan.dining.address}</p>
                  <p><strong>Est. Cost:</strong> {sampleDatePlan.dining.estimatedCost}</p>
                </div>
                <p className="why-fit">
                  <strong>Why this fits:</strong> {sampleDatePlan.dining.whyFit}
                </p>
                <button className="btn btn-secondary btn-small">
                  Make Reservation
                </button>
              </div>
            </div>

            {/* Gesture Section */}
            <div className="plan-section gesture-section">
              <div className="section-icon">💝</div>
              <div className="section-content">
                <h3>Sweet Gesture</h3>
                <p className="gesture-suggestion">{sampleDatePlan.gesture.suggestion}</p>
                <p className="why-fit">
                  <strong>Why this fits:</strong> {sampleDatePlan.gesture.whyFit}
                </p>
                <p className="gesture-cost">
                  <strong>Est. Cost:</strong> {sampleDatePlan.gesture.estimatedCost}
                </p>
              </div>
            </div>
          </div>

          <div className="plan-actions">
            <button className="btn btn-primary">
              Save This Plan
            </button>
            <button className="btn btn-secondary">
              Share Plan
            </button>
          </div>
          </>
          )}
          </>
        </div>
      )}
    </div>
  );
};

export default DatesView;
