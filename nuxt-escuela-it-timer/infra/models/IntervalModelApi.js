import { format, toZonedTime } from 'date-fns-tz'

export class IntervalModelApi {
  constructor(interval) {
    this.start_time = interval.startTime && this.formatTime(interval.startTime)
    this.end_time = interval.endTime && this.formatTime(interval.endTime)
    this.project_id = interval.project
  }

  formatTime(time) {
    return format(toZonedTime(new Date(time), 'UTC'), 'yyyy-MM-dd HH:mm:ss')
  }
}
