export interface StoreSettings {
  id: string;

  // Step 1 - Basic
  name: string;
  description: string | null;

  // Step 2 - Contact
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  website: string | null;

  // Step 3 - Configuration
  currency: string;
  timezone: string;
  storeStatus: "OPEN" | "CLOSED";
  maintenanceMessage: string | null;

  // Store state
  isActive: boolean;
}

export interface GetStoreSettingsResponse {
  store: StoreSettings;
}

export interface UpdateStoreSettingsPayload {
  // Step 1 - Basic
  name: string;
  description?: string;

  // Step 2 - Contact
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  website?: string;

  // Step 3 - Configuration
  currency: string;
  timezone: string;
  storeStatus: "OPEN" | "CLOSED";
  maintenanceMessage?: string;

  // Store state
  isActive: boolean;
}

export interface UpdateStoreSettingsResponse {
  message: string;
  store: StoreSettings;
}