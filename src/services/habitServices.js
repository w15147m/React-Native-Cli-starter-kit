import { db } from '../db/client';
import { habits, habitSchedules, habitLogs, habitStreaks } from '../db/schema';
import { eq, and, desc } from 'drizzle-orm';

/**
 * Get all habits for a user
 * @param {number} userId - User ID
 * @returns {Promise<Array>} List of habits
 */
export const getUserHabits = async (userId) => {
  try {
    const result = await db
      .select()
      .from(habits)
      .where(and(
        eq(habits.user_id, userId),
        eq(habits.is_active, true)
      ));
    
    return result;
  } catch (error) {
    console.error('Get user habits error:', error);
    throw error;
  }
};

/**
 * Create a new habit
 * @param {Object} habitData - Habit data
 * @returns {Promise<Object>} Created habit
 */
export const createHabit = async (habitData) => {
  try {
    const { user_id, title, description, icon, habit_type = 'boolean', target_value } = habitData;

    await db.insert(habits).values({
      user_id,
      title,
      description,
      icon,
      habit_type,
      target_value,
      is_active: true,
    });

    // Return the created habit
    const result = await db
      .select()
      .from(habits)
      .where(and(
        eq(habits.user_id, user_id),
        eq(habits.title, title)
      ))
      .orderBy(habits.created_at)
      .limit(1);

    return result[0];
  } catch (error) {
    console.error('Create habit error:', error);
    throw error;
  }
};

/**
 * Update a habit
 * @param {number} habitId - Habit ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated habit
 */
export const updateHabit = async (habitId, updates) => {
  try {
    await db
      .update(habits)
      .set({
        ...updates,
        updated_at: new Date(),
      })
      .where(eq(habits.id, habitId));

    const result = await db.select().from(habits).where(eq(habits.id, habitId));
    return result[0];
  } catch (error) {
    console.error('Update habit error:', error);
    throw error;
  }
};

/**
 * Delete a habit (soft delete by setting is_active to false)
 * @param {number} habitId - Habit ID
 * @returns {Promise<boolean>} Success status
 */
export const deleteHabit = async (habitId) => {
  try {
    await db
      .update(habits)
      .set({ is_active: false })
      .where(eq(habits.id, habitId));

    return true;
  } catch (error) {
    console.error('Delete habit error:', error);
    throw error;
  }
};

// ==========================================
// SCHEDULES
// ==========================================

export const getHabitSchedules = async (habitId) => {
  try {
    return await db
      .select()
      .from(habitSchedules)
      .where(eq(habitSchedules.habit_id, habitId));
  } catch (error) {
    console.error('Get schedules error:', error);
    throw error;
  }
};

export const createHabitSchedule = async (data) => {
  try {
    await db.insert(habitSchedules).values({
      habit_id: data.habit_id,
      frequency: data.frequency,
      days: data.days,
      start_date: data.start_date,
    });
    return true;
  } catch (error) {
    console.error('Create schedule error:', error);
    throw error;
  }
};

export const deleteHabitSchedule = async (id) => {
  try {
    await db.delete(habitSchedules).where(eq(habitSchedules.id, id));
    return true;
  } catch (error) {
    console.error('Delete schedule error:', error);
    throw error;
  }
};

// ==========================================
// LOGS
// ==========================================

export const getHabitLogs = async (habitId) => {
  try {
    return await db
      .select()
      .from(habitLogs)
      .where(eq(habitLogs.habit_id, habitId))
      .orderBy(desc(habitLogs.log_date));
  } catch (error) {
    console.error('Get logs error:', error);
    throw error;
  }
};

export const createHabitLog = async (data) => {
  try {
    await db.insert(habitLogs).values({
      habit_id: data.habit_id,
      log_date: data.log_date,
      is_completed: data.is_completed,
      value: data.value,
    });
    return true;
  } catch (error) {
    console.error('Create log error:', error);
    throw error;
  }
};

export const deleteHabitLog = async (id) => {
  try {
    await db.delete(habitLogs).where(eq(habitLogs.id, id));
    return true;
  } catch (error) {
    console.error('Delete log error:', error);
    throw error;
  }
};

// ==========================================
// STREAKS
// ==========================================

export const getHabitStreak = async (habitId) => {
  try {
    const result = await db
      .select()
      .from(habitStreaks)
      .where(eq(habitStreaks.habit_id, habitId));
    return result[0];
  } catch (error) {
    console.error('Get streak error:', error);
    throw error;
  }
};

export const updateHabitStreak = async (habitId, data) => {
  try {
    const existing = await getHabitStreak(habitId);
    
    if (existing) {
      await db
        .update(habitStreaks)
        .set({
          ...data,
          updated_at: new Date(),
        })
        .where(eq(habitStreaks.habit_id, habitId));
    } else {
      await db.insert(habitStreaks).values({
        habit_id: habitId,
        ...data,
      });
    }
    return true;
  } catch (error) {
    console.error('Update streak error:', error);
    throw error;
  }
};
