
import { add, addMinutes, getHours, getMinutes, isBefore, isEqual, parse } from 'date-fns'

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

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
