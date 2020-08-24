import * as moment from 'moment';

export class DateHelper {
  public static wsStringToDate(wsDate: string): Date {
    return moment(wsDate).toDate();
  }

  public static getDateToStringISO(date: Date): string {
    return moment(date).toISOString();
  }

  public static getCurrentDate(): Date {
    return moment().toDate();
  }
}
