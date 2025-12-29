import { Alert } from 'react-native';
import { db } from '../db/client';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

/**
 * Centralized error handler for database operations
 * @param {Error} error - The error object
 */
const handleError = (error) => {
  Alert.alert('Error', error.message || 'An unexpected error occurred');
  throw error;
};

/**
 * Get all records from a table
 * @param {Object} table - Drizzle table schema
 * @returns {Promise<Array>} Array of records
 */
export const get = async (table) => {
  try {
    const result = await db.select().from(table);
    return result;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Get a single record by ID
 * @param {Object} table - Drizzle table schema
 * @param {number} id - Record ID
 * @returns {Promise<Object>} Single record
 */
export const getById = async (table, id) => {
  try {
    const result = await db.select().from(table).where(eq(table.id, id));
    return result[0] || null;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Create a new record
 * @param {Object} table - Drizzle table schema
 * @param {Object} data - Data to insert
 * @returns {Promise<Object>} Created record
 */
export const post = async (table, data) => {
  try {
    await db.insert(table).values(data);
    // Return the created record (SQLite doesn't return it automatically)
    const result = await db.select().from(table).where(eq(table.email, data.email));
    return result[0];
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Update a record by ID
 * @param {Object} table - Drizzle table schema
 * @param {number} id - Record ID
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} Updated record
 */
export const put = async (table, id, data) => {
  try {
    await db.update(table).set(data).where(eq(table.id, id));
    const result = await db.select().from(table).where(eq(table.id, id));
    return result[0];
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Delete a record by ID
 * @param {Object} table - Drizzle table schema
 * @param {number} id - Record ID
 * @returns {Promise<boolean>} Success status
 */
export const del = async (table, id) => {
  try {
    await db.delete(table).where(eq(table.id, id));
    return true;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Custom query executor
 * @param {Function} queryFn - Custom Drizzle query function
 * @returns {Promise<any>} Query result
 */
export const query = async (queryFn) => {
  try {
    return await queryFn(db);
  } catch (error) {
    return handleError(error);
  }
};
