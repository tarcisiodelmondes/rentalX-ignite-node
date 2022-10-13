import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

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
}
