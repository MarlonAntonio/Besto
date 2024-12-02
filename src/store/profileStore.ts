import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '../types/Profile';

interface ProfileState {
  profile: Profile | null;
  updateProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      updateProfile: (profile) => set({ profile }),
    }),
    {
      name: 'profile-storage',
    }
  )
);