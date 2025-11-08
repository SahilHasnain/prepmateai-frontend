// Environment configuration - Sensitive data isolated from UI logic
export const APPWRITE_PROJECT_ID =
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "<PROJECT_ID>";

export const APPWRITE_PROJECT_NAME =
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_NAME || "PrepMate AI";

export const APPWRITE_ENDPOINT =
  process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT ||
  "https://cloud.appwrite.io/v1";

export const APPWRITE_DATABASE_ID =
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "<DATABASE_ID>";

export const APPWRITE_BUCKET_ID =
  process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID || "<BUCKET_ID>";

export const APPWRITE_SECRET_KEY = process.env.APPWRITE_SECRET_KEY || "";

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

export const NODE_API_BASE_URL = process.env.NODE_API_BASE_URL || "";
