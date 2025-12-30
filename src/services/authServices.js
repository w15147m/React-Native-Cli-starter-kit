import { Alert, Image } from 'react-native';
import { db } from '../db/client';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getItem } from '../utils/storage';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data with token
 */
export const login = async (email, password) => {
  try {
    // Query user by email
    const result = await db.select().from(users).where(eq(users.email, email));
    
    const user = result[0];

    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Generate a simple token (in production, use JWT)
    const token = `token_${user.id}_${Date.now()}`;

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image,
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} Created user data
 */
export const register = async (userData) => {
  try {
    const { name, email, password } = userData;

    // Check if user already exists
    const existing = await db.select().from(users).where(eq(users.email, email));
    if (existing.length > 0) {
      throw new Error('Email already registered');
    }

    // Default Profile Image
    const defaultImage = Image.resolveAssetSource(require('../assets/3D-icons-with-bg/color - 2025-12-30T184226.750.webp')).uri;

    // TODO: Hash password before storing (use bcrypt)
    // For now, storing plain text (NOT SECURE - just for demo)
    await db.insert(users).values({
      name,
      email,
      password, // Should be hashed!
      profile_image: defaultImage,
    });

    // Return the created user
    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result[0];

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image,
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

/**
 * Verify if user is authenticated
 * @returns {Promise<boolean>} Authentication status
 */
export const isAuthenticated = async () => {
  try {
    const authInfo = await getItem('authInfo');
    return authInfo !== null && authInfo.token !== undefined;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} Success status
 */
export const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    // 1. Verify old password
    const result = await db.select().from(users).where(eq(users.id, userId));
    const user = result[0];

    if (!user || user.password !== oldPassword) {
      throw new Error('Incorrect old password');
    }

    // 2. Update to new password (should be hashed in production)
    await db.update(users)
      .set({ password: newPassword })
      .where(eq(users.id, userId));

    return true;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};
