// User-related types and interfaces
// ----------------------------------

export interface User {
  id: string;
  name: string;
  email: string;
  // Add more user fields as needed
}

export interface UserProfile {
  userId: string;
  bio?: string;
  avatarUrl?: string;
  // Add more profile fields as needed
}

// Payload for creating an individual client
export interface CreateIndividualPayload {
  firstname: string;
  lastname: string;
  middlename?: string;
  phoneNumber: string;
  address: string;
  bvn?: string | number;
  gender?: 'male' | 'female' | string;
  dateOfBirth?: string;
  metadata?: Record<string, any>;
}
