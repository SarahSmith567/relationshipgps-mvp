import React, { useState } from 'react';
import { familyMembers, sampleGiftSuggestions } from '../../data/mockData';
import VoiceInputButton from '../shared/VoiceInputButton';
import BackButton from '../shared/BackButton';
import { generateGiftSuggestions } from '../../services/openai';

interface GiftsViewProps {
  onBack?: () => void;
}

const GiftsView: React.FC<GiftsViewProps> = ({ onBack }) => {
  const [selectedMember, setSelectedMember] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('50_100');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string>('');
  const [error, setError] = useState<string>('');

  const occasions = ['Birthday', 'Anniversary', 'Just Because', 'Holiday', 'Special Event'];
  const budgetOptions = [
    { value: 'under_25', label: 'Under $25' },
    { value: '25_50', label: '$25 - $50' },
    { value: '50_100', label: '$50 - $100' },
    { value: '100_250', label: '$100 - $250' },
    { value: '250_plus', label: '$250+' }
  ];

  const handleGetSuggestions = async () => {
    // Use defaults if not selected
    const memberId = selectedMember || 'laurie';
    const occ = occasion || 'birthday';
    
    setIsLoading(true);
    setError('');
    
    try {
      const member = familyMembers.find(m => m.id === memberId);
      const budgetLabel = budgetOptions.find(b => b.value === budget)?.label || '$50-$100';
      
      const suggestions = await generateGiftSuggestions({
        recipientName: member?.name || 'family member',
        occasion: occ,
        budget: budgetLabel,
        recipientProfile: member ? `Age: ${member.age}, Relationship: ${member.relationship}` : ''
      });
      
      setAiSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (err) {
      setError('Sorry, I had trouble generating gift ideas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = (text: string) => {
    console.log('Voice input:', text);
    // TODO: Parse voice input and fill form
  };

  const handleBack = () => {
    setShowSuggestions(false);
    if (onBack) onBack();
  };

  return (
    <div className="gifts-view">
      <BackButton onClick={handleBack} />
      {!showSuggestions ? (
        <div className="gift-request-form">
          <h2>Gift Suggestions</h2>
          <p className="form-description">
            Tell me who you're shopping for and I'll suggest personalized gifts
          </p>

          <div className="form-group">
            <label>Who is this gift for?</label>
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
            <label>What's the occasion?</label>
            <select 
              value={occasion} 
              onChange={(e) => setOccasion(e.target.value)}
              className="form-select"
            >
              <option value="">Select an occasion</option>
              {occasions.map((occ) => (
                <option key={occ} value={occ}>{occ}</option>
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
              onClick={handleGetSuggestions}
              disabled={isLoading}
            >
              {isLoading ? 'Getting suggestions...' : 'Get Gift Ideas'}
            </button>
            
            <div className="voice-input-container">
              <VoiceInputButton onTranscription={handleVoiceInput} size="large" />
              <span className="voice-hint">Or use voice</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="gift-suggestions">
          <div className="suggestions-header">
            <button 
              className="btn-back"
              onClick={() => setShowSuggestions(false)}
            >
              ← Back
            </button>
            <h2>Gift Ideas for {familyMembers.find(m => m.id === selectedMember)?.name}</h2>
            <p className="suggestions-meta">{occasion} • Budget: {budgetOptions.find(b => b.value === budget)?.label}</p>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button className="btn btn-secondary" onClick={() => setShowSuggestions(false)}>Try Again</button>
            </div>
          )}

          {aiSuggestions && (
            <div className="ai-suggestions-text">
              <div className="suggestions-content">
                {aiSuggestions.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          )}

          {!aiSuggestions && !error && (
            <div className="suggestions-grid">
              {sampleGiftSuggestions.map((gift) => (
              <div key={gift.id} className="gift-card">
                <div className="gift-image-placeholder">
                  <span className="gift-category-icon">
                    {gift.category.includes('Books') ? '📚' : 
                     gift.category.includes('Outdoor') ? '⛵' :
                     gift.category.includes('Experience') ? '🎁' :
                     gift.category.includes('Fashion') ? '👕' : '💝'}
                  </span>
                </div>
                <div className="gift-content">
                  <h3 className="gift-name">{gift.name}</h3>
                  <div className="gift-meta">
                    <span className="gift-price">{gift.price}</span>
                    <span className="gift-retailer">{gift.retailer}</span>
                  </div>
                  <p className="gift-why-fit">{gift.whyFit}</p>
                  <button className="btn btn-secondary btn-small">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GiftsView;
