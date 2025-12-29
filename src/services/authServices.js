import { Alert } from 'react-native';
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

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }

    // Generate a simple token (in production, use JWT)
    const token = `token_${user.id}_${Date.now()}`;

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    console.error('Login error:', error);
    Alert.alert('Login Failed', error.message);
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

    // TODO: Hash password before storing (use bcrypt)
    // For now, storing plain text (NOT SECURE - just for demo)
    await db.insert(users).values({
      name,
      email,
      password, // Should be hashed!
    });

    // Return the created user
    const result = await db.select().from(users).where(eq(users.email, email));
    const user = result[0];

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    Alert.alert('Registration Failed', error.message);
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
