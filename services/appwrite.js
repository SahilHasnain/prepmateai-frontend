import { Client, Account, ID } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "../config/env";

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

// Initialize Account service
const account = new Account(client);

/**
 * Create new user account
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User full name
 * @returns {Object} { success, data, error }
 */
export const signup = async (email, password, name) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    return { success: true, data: user, error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

/**
 * Login existing user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} { success, data, error }
 */
export const login = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true, data: session, error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

/**
 * Logout current user and delete session
 * @returns {Object} { success, data, error }
 */
export const logout = async () => {
  try {
    await account.deleteSession("current");
    return { success: true, data: null, error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

/**
 * Get current logged-in user details
 * @returns {Object} { success, data, error }
 */
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return { success: true, data: user, error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};
