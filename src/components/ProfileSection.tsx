import React from 'react';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Profile } from '../types/Profile';

const iconMap: { [key: string]: React.ComponentType } = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function ProfileSection({ profile }: { profile: Profile }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col items-center">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h2>
        <p className="text-gray-600 text-center mb-6">{profile.bio}</p>
        
        <div className="flex gap-4">
          {profile.socialLinks.map((link) => {
            const Icon = iconMap[link.icon.toLowerCase()];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {Icon && <Icon className="w-6 h-6" />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}