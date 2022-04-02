import moment from 'moment';

/**
 * This function return
 * @param from
 * @param to
 * @returns
 */
export function getNumDaysInChart(_from: Date | undefined) {
  if (_from !== undefined) {
    const from = moment(_from);
    const to = moment(_from).add(3, 'months');
    return to.diff(from, 'days');
  }

  const now = moment();
  const future = moment(now).add(3, 'months');
  return future.diff(now, 'days');
}

/**
 * This function returns the number of day between month depending on diff params.
 * @param diff Difference in number of month between today.
 * @returns number of date from today.
 */
export function getNumberOfDaysBetweenMonth(diff: number): number {
  if (diff < 0) throw Error('Input cannot be less than zero!');

  const now = moment();
  const to = moment().add(diff, 'months');
  return moment.duration(to.diff(now)).asDays();
}
