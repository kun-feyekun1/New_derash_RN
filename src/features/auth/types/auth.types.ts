export type User = {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  preferredLanguage: 'en' | 'am';
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthSession = {
  user: User;
  tokens: AuthTokens;
};
