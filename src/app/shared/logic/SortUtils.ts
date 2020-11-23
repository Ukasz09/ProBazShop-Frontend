export class SortUtils {
  /**
   * Compares two Date objects and returns a number value that represents the result:
   * 0 if the two dates are equal.
   * 1 if the first date is greater than second.
   * -1 if the first date is less than second.
   * @param date1 First date object to compare.
   * @param date2 Second date object to compare.
   */
  public static compareDate(date1: Date, date2: Date): number {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;
    if (d1 > d2) return 1;
    if (d1 < d2) return -1;
  }
}
