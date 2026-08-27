export interface UpdateProfilePayload {
  name: string;
  photoURL?: string | null;
}

export interface UpdateProfileResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    photoURL?: string | null;
  };
}
