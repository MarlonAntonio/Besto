import React from 'react';
import { ImageUploader } from './ImageUploader';
import { Profile } from '../types/Profile';
import { Plus, Trash2 } from 'lucide-react';

interface ProfileFormProps {
  onSubmit: (profile: Profile) => void;
  initialProfile?: Profile | null;
}

export function ProfileForm({ onSubmit, initialProfile }: ProfileFormProps) {
  const [formData, setFormData] = React.useState<Profile>(() => ({
    name: initialProfile?.name || '',
    avatar: initialProfile?.avatar || '',
    bio: initialProfile?.bio || '',
    socialLinks: initialProfile?.socialLinks || [],
  }));

  const handleAddSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        { platform: '', url: '', icon: 'github' },
      ],
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Picture
        </label>
        <ImageUploader
          onImageUpload={(image) =>
            setFormData({ ...formData, avatar: URL.createObjectURL(image) })
          }
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">
            Social Links
          </label>
          <button
            type="button"
            onClick={handleAddSocialLink}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </button>
        </div>

        {formData.socialLinks.map((link, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="text"
                value={link.platform}
                onChange={(e) => {
                  const newLinks = [...formData.socialLinks];
                  newLinks[index] = { ...link, platform: e.target.value };
                  setFormData({ ...formData, socialLinks: newLinks });
                }}
                placeholder="Platform name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <input
                type="url"
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...formData.socialLinks];
                  newLinks[index] = { ...link, url: e.target.value };
                  setFormData({ ...formData, socialLinks: newLinks });
                }}
                placeholder="URL"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <select
                value={link.icon}
                onChange={(e) => {
                  const newLinks = [...formData.socialLinks];
                  newLinks[index] = { ...link, icon: e.target.value };
                  setFormData({ ...formData, socialLinks: newLinks });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="github">GitHub</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveSocialLink(index)}
              className="mt-1 p-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Profile
      </button>
    </form>
  );
}