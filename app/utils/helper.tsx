
import { add, addMinutes, getHours, getMinutes, isBefore, isEqual, parse, format, setHours, startOfDay } from 'date-fns'

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export function formatHourToAM(hour: number) {
  // Create a date object representing the start of today
  const today = startOfDay(new Date());

  // Set the hour to 9 (or any other hour you want to format)
  const dateWithHour = setHours(today, hour);

  // Format the date object to 'h a' (hour and AM/PM)
  return format(dateWithHour, 'h a');
}

export const weekdayIndexToName = (index: number) => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[index]
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// function to round a given date up to the nearest half hour
export const roundToNearestMinutes = (date: Date, interval: number) => {
  const minutesLeftUntilNextInterval = interval - (getMinutes(date) % interval)
  return addMinutes(date, minutesLeftUntilNextInterval)
  // Alternatively to ignore seconds (even more precise)
  // return new Date(addMinutes(date, minutesLeftUntilNextInterval).setSeconds(0))
}

/**
 *
 * @param startDate Day we want the opening hours for at midnight
 * @param dbDays Opening hours for the week
 * @returns Array of dates for every opening hour
 */
