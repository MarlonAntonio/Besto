import React from 'react';
import { Github, Instagram, Linkedin, Twitter, User } from 'lucide-react';
import { Profile } from '../types/Profile';

const iconMap: { [key: string]: React.ComponentType } = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function ProfilePreview({ profile }: { profile: Profile | null }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-sm mx-auto">
      <div className="flex flex-col items-center">
        {profile?.avatar ? (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {profile?.name || 'Your Name'}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {profile?.bio || 'Your bio will appear here'}
        </p>
        
        <div className="flex gap-4">
          {(profile?.socialLinks || [
            { platform: 'GitHub', icon: 'github', url: '#' },
            { platform: 'Twitter', icon: 'twitter', url: '#' },
            { platform: 'LinkedIn', icon: 'linkedin', url: '#' },
          ]).map((link) => {
            const Icon = iconMap[link.icon.toLowerCase()];
            return (
              <span
                key={link.platform}
                className="text-gray-400"
              >
                {Icon && <Icon className="w-6 h-6" />}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}