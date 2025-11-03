const STORAGE_KEY = 'rhythm_data';

/**
 * Load all data from localStorage
 * @returns {Object} Object with dates as keys (YYYY-MM-DD) and {energy, clarity, mood} as values
 */
export function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading data:', error);
    return {};
  }
}

/**
 * Save data for a specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {Object} values - {energy, clarity, mood} values (1-10)
 */
export function saveData(date, values) {
  try {
    const allData = loadData();
    allData[date] = {
      energy: values.energy,
      clarity: values.clarity,
      mood: values.mood,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
}

/**
 * Get data for a specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Object|null} {energy, clarity, mood} or null if no data
 */
export function getDataForDate(date) {
  const allData = loadData();
  return allData[date] || null;
}

/**
 * Clear all data (with confirmation)
 */
export function clearAllData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
}

/**
 * Calculate average score for a date
 * @param {Object} data - {energy, clarity, mood}
 * @returns {number} Average score (1-10)
 */
export function calculateAverage(data) {
  if (!data) return 0;
  return (data.energy + data.clarity + data.mood) / 3;
}