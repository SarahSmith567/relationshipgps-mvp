import React, { useState } from 'react';
import { User, Settings, Menu, X, Heart, Users, MessageCircle, Gift } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  tenantName?: string;
  logoUrl?: string;
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  tenantName = 'RelationshipGPS',
  logoUrl,
  currentUser,
  onNavigate
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Family', path: '/family', icon: Users },
    { name: 'Chat', path: '/chat', icon: MessageCircle },
    { name: 'Gifts', path: '/gifts', icon: Gift },
  ];

  return (
    <header className="bg-surface border-b border-secondary-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {logoUrl ? (
                <img className="h-8 w-auto" src={logoUrl} alt={tenantName} />
              ) : (
                <Heart className="h-8 w-8 text-primary-600" />
              )}
              <span className="ml-2 text-xl font-bold text-text-primary font-heading">
                {tenantName}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.path)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-brand transition-colors"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {currentUser?.avatar ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
                <span className="ml-2 text-text-primary font-medium">
                  {currentUser?.name || 'User'}
                </span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-brand shadow-lg border border-secondary-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-secondary-200">
                      <p className="text-sm font-medium text-text-primary">
                        {currentUser?.name}
                      </p>
                      <p className="text-sm text-text-muted">
                        {currentUser?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onNavigate('/settings');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        // Handle logout
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-text-secondary hover:bg-secondary-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-brand text-text-secondary hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-surface border-t border-secondary-200">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-brand"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
            <div className="border-t border-secondary-200 pt-4 pb-3">
              <div className="flex items-center px-3">
                {currentUser?.avatar ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={currentUser.avatar}
                    alt={currentUser.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-text-primary">
                    {currentUser?.name || 'User'}
                  </div>
                  <div className="text-sm text-text-muted">
                    {currentUser?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => {
                    onNavigate('/settings');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-brand"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
