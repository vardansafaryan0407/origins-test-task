import * as moment from 'moment';

export class GeneralHelper {
  public static getCurrentDate(): string {
    return moment().format('DD-MM-YYYY');
  }
}
