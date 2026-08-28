export type StoreStatus = "OPEN" | "CLOSED";

export interface StoreSettings {
  id: string;

  // Step 1 - Basic
  name: string;
  description: string | null;
  logo: string | null;
  logoPublicId: string | null;

  // Step 2 - Contact
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  website: string | null;

  // Step 3 - Configuration
  currency: string;
  timezone: string;
  storeStatus: StoreStatus;
  maintenanceMessage: string | null;

  // Store state
  isActive: boolean;

  // Database timestamps
  createdAt: string;
  updatedAt: string;
}

export interface GetStoreSettingsResponse {
  store: StoreSettings;
}

export interface UpdateStoreSettingsPayload {
  name: string;
  description?: string;

  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  website?: string;

  currency: string;
  timezone: string;
  storeStatus: "OPEN" | "CLOSED";
  maintenanceMessage?: string;

  isActive: boolean;

  // FileUploadInput returns File[]
  file?: File[];
}

export interface UpdateStoreSettingsResponse {
  message: string;
  storeId: string;
  store: StoreSettings;
}

export interface UploadStoreLogoResponse {
  success: boolean;
  message: string;
  storeId: string;
  logo: string | null;
  logoPublicId: string | null;
}