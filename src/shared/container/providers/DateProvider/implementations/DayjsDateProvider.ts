import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { injectable } from "tsyringe";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date) {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date) {
    const endDateDateFormat = this.convertToUTC(end_date);
    const startDateFormat = this.convertToUTC(start_date);
    const result = dayjs(endDateDateFormat).diff(startDateFormat, "hours");

    return result;
  }

  dateNow() {
    return dayjs().toDate();
  }

  compareInDays(start_date: Date, end_date: Date) {
    const endDateDateFormat = this.convertToUTC(end_date);
    const startDateFormat = this.convertToUTC(start_date);
    const result = dayjs(endDateDateFormat).diff(startDateFormat, "day");

    return result;
  }

  addDays(days: number) {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number) {
    return dayjs().add(hours, "hour").toDate();
  }

  compareIfBefore(start_date: Date, end_date: Date) {
    return dayjs(start_date).isBefore(end_date);
  }
}
