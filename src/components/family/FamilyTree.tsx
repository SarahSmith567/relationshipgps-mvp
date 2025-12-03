import React, { useState } from 'react';
import { User, Relationship, FamilyTree as FamilyTreeType } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Heart, Users, Calendar, Phone, Mail } from 'lucide-react';

interface FamilyTreeProps {
  familyData: FamilyTreeType;
  onMemberSelect: (member: User) => void;
  onAddMember: () => void;
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({
  familyData,
  onMemberSelect,
  onAddMember
}) => {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const getRelationshipType = (userId: string, targetUserId: string): string => {
    const relationship = familyData.relationships.find(
      rel => 
        (rel.userAId === userId && rel.userBId === targetUserId) ||
        (rel.userBId === userId && rel.userAId === targetUserId)
    );
    return relationship?.relationshipType || 'family';
  };

  const getRelationshipStrength = (userId: string, targetUserId: string): number => {
    const relationship = familyData.relationships.find(
      rel => 
        (rel.userAId === userId && rel.userBId === targetUserId) ||
        (rel.userBId === userId && rel.userAId === targetUserId)
    );
    return relationship?.strength || 5;
  };

  const getProfile = (userId: string) => {
    return familyData.profiles.find(profile => profile.userId === userId);
  };

  const formatRelationshipType = (type: string): string => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getAgeFromBirthday = (birthday?: string): string => {
    if (!birthday) return '';
    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return `${age - 1}`;
    }
    return `${age}`;
  };

  const renderMemberCard = (member: User, isMainUser: boolean = false) => {
    const profile = getProfile(member.id);
    const age = getAgeFromBirthday(member.birthday);
    
    return (
      <Card
        key={member.id}
        hover
        className={`transition-all ${
          selectedMemberId === member.id 
            ? 'ring-2 ring-primary-500 border-primary-300' 
            : ''
        } ${isMainUser ? 'border-primary-400 bg-primary-50' : ''}`}
        onClick={() => {
          setSelectedMemberId(member.id);
          onMemberSelect(member);
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.preferredName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isMainUser ? 'bg-primary-600' : 'bg-secondary-400'
                }`}>
                  <Users className="h-6 w-6 text-white" />
                </div>
              )}
            </div>

            {/* Member Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-text-primary truncate">
                  {member.preferredName}
                </h3>
                {isMainUser && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    You
                  </span>
                )}
              </div>
              
              {member.fullName !== member.preferredName && (
                <p className="text-sm text-text-muted">{member.fullName}</p>
              )}
              
              <div className="mt-2 space-y-1">
                {age && (
                  <div className="flex items-center text-sm text-text-secondary">
                    <Calendar className="h-4 w-4 mr-1" />
                    {age} years old
                  </div>
                )}
                
                {member.email && (
                  <div className="flex items-center text-sm text-text-secondary">
                    <Mail className="h-4 w-4 mr-1" />
                    {member.email}
                  </div>
                )}
                
                {member.phone && (
                  <div className="flex items-center text-sm text-text-secondary">
                    <Phone className="h-4 w-4 mr-1" />
                    {member.phone}
                  </div>
                )}
              </div>

              {/* Love Languages */}
              {profile?.loveLanguages && profile.loveLanguages.length > 0 && (
                <div className="mt-3">
                  <div className="flex items-center space-x-1 mb-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span className="text-xs font-medium text-text-secondary">Love Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {profile.loveLanguages.slice(0, 2).map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                      >
                        {formatRelationshipType(lang)}
                      </span>
                    ))}
                    {profile.loveLanguages.length > 2 && (
                      <span className="text-xs text-text-muted">
                        +{profile.loveLanguages.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Organize family members by relationship type
  const mainUser = familyData.members[0]; // Assume first member is the main user
  const spouse = familyData.members.find(member => 
    member.id !== mainUser?.id && 
    ['spouse', 'partner'].includes(getRelationshipType(mainUser?.id || '', member.id))
  );
  
  const children = familyData.members.filter(member =>
    member.id !== mainUser?.id && 
    member.id !== spouse?.id &&
    ['child', 'step_child'].includes(getRelationshipType(mainUser?.id || '', member.id))
  );
  
  const grandchildren = familyData.members.filter(member =>
    ['grandchild'].includes(getRelationshipType(mainUser?.id || '', member.id))
  );
  
  const others = familyData.members.filter(member =>
    member.id !== mainUser?.id && 
    member.id !== spouse?.id &&
    !children.includes(member) &&
    !grandchildren.includes(member)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary font-heading">Family Tree</h1>
          <p className="text-text-secondary mt-1">
            Manage your family relationships and connections
          </p>
        </div>
        <Button onClick={onAddMember} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Family Member
        </Button>
      </div>

      {/* Family Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-primary-600" />
              <div className="ml-3">
                <p className="text-2xl font-semibold text-text-primary">
                  {familyData.members.length}
                </p>
                <p className="text-sm text-text-secondary">Family Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500" />
              <div className="ml-3">
                <p className="text-2xl font-semibold text-text-primary">
                  {familyData.relationships.length}
                </p>
                <p className="text-sm text-text-secondary">Relationships</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-accent" />
              <div className="ml-3">
                <p className="text-2xl font-semibold text-text-primary">
                  {familyData.members.filter(m => m.birthday).length}
                </p>
                <p className="text-sm text-text-secondary">Birthdays Tracked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main User & Spouse */}
      {mainUser && (
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
            Core Family
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderMemberCard(mainUser, true)}
            {spouse && renderMemberCard(spouse)}
          </div>
        </div>
      )}

      {/* Children */}
      {children.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
            Children
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {children.map(child => renderMemberCard(child))}
          </div>
        </div>
      )}

      {/* Grandchildren */}
      {grandchildren.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
            Grandchildren
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grandchildren.map(grandchild => renderMemberCard(grandchild))}
          </div>
        </div>
      )}

      {/* Extended Family */}
      {others.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4 font-heading">
            Extended Family
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.map(member => renderMemberCard(member))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {familyData.members.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No family members yet
            </h3>
            <p className="text-text-muted mb-4">
              Start building your family tree by adding your first family member.
            </p>
            <Button onClick={onAddMember}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Family Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
