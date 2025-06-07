export type UserRole = "gifter" | 'receiver' | "vendor";

export interface User {
  name: string ;
  email: string ;
  password: string ;
  role?: UserRole ;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  isVerified: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}