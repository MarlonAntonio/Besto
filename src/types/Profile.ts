export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  avatar: string;
  bio: string;
  socialLinks: SocialLink[];
}