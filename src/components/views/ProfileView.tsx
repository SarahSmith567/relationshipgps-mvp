import React, { useState } from 'react';
import { familyMembers, FamilyMember } from '../../data/mockData';
import BackButton from '../shared/BackButton';

interface ProfileViewProps {
  selectedMemberId?: string | null;
  onBack?: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ selectedMemberId, onBack }) => {
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const user = {
    name: 'John Raymond',
    email: 'john@example.com',
    avatar: 'J'
  };

  const handleViewMember = (memberId: string) => {
    const member = familyMembers.find(m => m.id === memberId);
    if (member) {
      setSelectedMember(member);
    }
  };

  const handleBack = () => {
    setSelectedMember(null);
  };

  if (selectedMember) {
    return (
      <div className="profile-view">
        <BackButton onClick={handleBack} label="Back to Profiles" />
        <div className="profile-detail">
          <div className="profile-detail-header">
            <button className="btn-back" onClick={handleBack}>
              ← Back
            </button>
            <h2>{selectedMember.name}'s Profile</h2>
          </div>

          <div className="profile-sections">
            <section className="profile-section">
              <div className="profile-avatar-large">{selectedMember.avatar}</div>
              <h3>{selectedMember.name}</h3>
              <p className="profile-relationship">{selectedMember.relationship}</p>
            </section>

            <section className="profile-section">
              <h4>Basic Info</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Birthday:</span>
                  <span className="info-value">
                    {new Date(selectedMember.birthday).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Age:</span>
                  <span className="info-value">{selectedMember.age}</span>
                </div>
              </div>
            </section>

            <section className="profile-section">
              <h4>Love Languages</h4>
              <div className="tags-list">
                {selectedMember.loveLanguages.map((lang, idx) => (
                  <span key={idx} className="tag love-language-tag">{lang}</span>
                ))}
              </div>
            </section>

            {selectedMember.attachmentStyle && (
              <section className="profile-section">
                <h4>Attachment Style</h4>
                <span className="tag attachment-tag">{selectedMember.attachmentStyle}</span>
              </section>
            )}

            <section className="profile-section">
              <h4>Hobbies & Interests</h4>
              <div className="tags-list">
                {selectedMember.hobbies.map((hobby, idx) => (
                  <span key={idx} className="tag hobby-tag">{hobby}</span>
                ))}
              </div>
            </section>

            {selectedMember.preferences && (
              <section className="profile-section">
                <h4>Preferences</h4>
                {selectedMember.preferences.sizes && (
                  <div className="info-item">
                    <span className="info-label">Sizes:</span>
                    <span className="info-value">
                      {Object.entries(selectedMember.preferences.sizes)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}
                    </span>
                  </div>
                )}
                {selectedMember.preferences.colors && (
                  <div className="info-item">
                    <span className="info-label">Favorite Colors:</span>
                    <div className="tags-list">
                      {selectedMember.preferences.colors.map((color, idx) => (
                        <span key={idx} className="tag color-tag">{color}</span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedMember.preferences.brands && (
                  <div className="info-item">
                    <span className="info-label">Favorite Brands:</span>
                    <div className="tags-list">
                      {selectedMember.preferences.brands.map((brand, idx) => (
                        <span key={idx} className="tag brand-tag">{brand}</span>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {selectedMember.triggers && selectedMember.triggers.length > 0 && (
              <section className="profile-section">
                <h4>Sensory Considerations</h4>
                <div className="tags-list">
                  {selectedMember.triggers.map((trigger, idx) => (
                    <span key={idx} className="tag trigger-tag">{trigger}</span>
                  ))}
                </div>
              </section>
            )}

            {selectedMember.sharedRituals && selectedMember.sharedRituals.length > 0 && (
              <section className="profile-section">
                <h4>Shared Rituals</h4>
                <ul className="rituals-list">
                  {selectedMember.sharedRituals.map((ritual, idx) => (
                    <li key={idx}>{ritual}</li>
                  ))}
                </ul>
              </section>
            )}

            <div className="profile-actions">
              <button className="btn btn-primary">Edit Profile</button>
              <button className="btn btn-secondary">Voice Update</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-view">
      {onBack && <BackButton onClick={onBack} />}
      <section className="user-profile-section">
        <div className="user-profile-card">
          <div className="user-avatar">{user.avatar}</div>
          <div className="user-info">
            <h2>{user.name}</h2>
            <p className="user-email">{user.email}</p>
          </div>
          <button className="btn btn-secondary btn-small">Edit Profile</button>
        </div>
      </section>

      <section className="family-management-section">
        <div className="section-header">
          <h3>My Family</h3>
          <span className="member-count">{familyMembers.length} members</span>
        </div>
        
        <div className="family-list">
          {familyMembers.map((member) => (
            <div 
              key={member.id} 
              className="family-list-item"
              onClick={() => handleViewMember(member.id)}
            >
              <div className="member-avatar-small">{member.avatar}</div>
              <div className="member-info-compact">
                <h4>{member.name}</h4>
                <p>{member.relationship}</p>
              </div>
              <button className="btn-icon">→</button>
            </div>
          ))}
        </div>

        <button className="btn btn-secondary btn-large">
          + Add Family Member
        </button>
      </section>

      <section className="settings-section">
        <h3>Settings</h3>
        <div className="settings-list">
          <button className="setting-item">
            <span>🔔 Notifications</span>
            <span className="setting-arrow">→</span>
          </button>
          <button className="setting-item">
            <span>📱 SMS Settings</span>
            <span className="setting-arrow">→</span>
          </button>
          <button className="setting-item">
            <span>🔒 Privacy</span>
            <span className="setting-arrow">→</span>
          </button>
          <button className="setting-item">
            <span>❓ Help & Support</span>
            <span className="setting-arrow">→</span>
          </button>
          <button className="setting-item logout">
            <span>🚪 Logout</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileView;
