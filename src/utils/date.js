/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string}
 */
export function getTodayString() {
  const today = new Date();
  return formatDate(today);
}

/**
 * Format a Date object to YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse YYYY-MM-DD string to Date object
 * @param {string} dateString
 * @returns {Date}
 */
export function parseDate(dateString) {
  return new Date(dateString + 'T00:00:00');
}

/**
 * Get all dates in a year
 * @param {number} year
 * @returns {Array<string>} Array of date strings in YYYY-MM-DD format
 */
export function getDatesInYear(year) {
  const dates = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(formatDate(new Date(d)));
  }
  
  return dates;
}

/**
 * Get month name from date string
 * @param {string} dateString - YYYY-MM-DD
 * @returns {string}
 */
export function getMonthName(dateString) {
  const date = parseDate(dateString);
  return date.toLocaleDateString('en-US', { month: 'short' });
}

/**
 * Get day of week from date string
 * @param {string} dateString - YYYY-MM-DD
 * @returns {number} 0 = Sunday, 6 = Saturday
 */
export function getDayOfWeek(dateString) {
  return parseDate(dateString).getDay();
}

/**
 * Format date for display
 * @param {string} dateString - YYYY-MM-DD
 * @returns {string} e.g., "Monday, January 1, 2024"
 */
export function formatDateLong(dateString) {
  const date = parseDate(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Get current year
 * @returns {number}
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Group dates by month
 * @param {Array<string>} dates - Array of YYYY-MM-DD strings
 * @returns {Object} Object with month numbers as keys
 */
export function groupDatesByMonth(dates) {
  const grouped = {};
  
  dates.forEach(dateString => {
    const date = parseDate(dateString);
    const month = date.getMonth(); // 0-11
    
    if (!grouped[month]) {
      grouped[month] = [];
    }
    grouped[month].push(dateString);
  });
  
  return grouped;
}