export type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type UserRole = "ADMIN"| "SUPERADMIN" | "CLIENT"

export interface User {
  id: string;
  uid: string;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
}