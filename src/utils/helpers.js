import { formatDistance, parseISO } from 'date-fns';
import { differenceInDays, isDate } from 'date-fns';

// ✅ Calculates difference in days between two dates (strings or Date objects)
export const subtractDates = (dateStr1, dateStr2) => {
  try {
    const d1 = typeof dateStr1 === 'string' ? parseISO(dateStr1) : dateStr1;
    const d2 = typeof dateStr2 === 'string' ? parseISO(dateStr2) : dateStr2;

    if (!isDate(d1) || !isDate(d2) || isNaN(d1) || isNaN(d2)) {
      throw new Error('Invalid date');
    }

    return differenceInDays(d1, d2);
  } catch (err) {
    console.error('❌ Error in subtractDates:', err.message);
    return NaN;
  }
};

// ✅ Formats distance from a date to now (e.g., "2 days ago", "In 3 days")
export const formatDistanceFromNow = (dateStr) => {
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;

    if (!isDate(date) || isNaN(date)) {
      throw new Error('Invalid date');
    }

    return formatDistance(date, new Date(), { addSuffix: true })
      .replace('about ', '')
      .replace(/^in/, 'In');
  } catch (err) {
    console.error('❌ Invalid date string in formatDistanceFromNow:', dateStr, err.message);
    return 'Invalid date';
  }
};

// ✅ Returns ISO string for today's date, either at start or end of day
export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end)
    today.setUTCHours(23, 59, 59, 999); // End of day
  else
    today.setUTCHours(0, 0, 0, 0); // Start of day

  return today.toISOString();
};

// ✅ Formats number as currency (USD)
export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
