import { ProjectModel } from './ProjectModel'

export class IntervalModel {
  constructor(interval) {
    this.id = interval.id
    this.startTime = interval.start_time
    this.endTime = interval.end_time
    this.projectId = interval.project_id
    this.project = interval.project && new ProjectModel(interval.project)
    this.secondsOpened = interval.seconds_opened
  }
}
