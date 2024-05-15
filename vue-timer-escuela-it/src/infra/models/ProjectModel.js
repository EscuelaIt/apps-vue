import { format } from 'date-fns'

export class ProjectModel {
  constructor(project) {
    this.id = project.id
    this.name = project.name
    this.description = project.description
    this.createdAt = format(new Date(project.created_at), 'dd/MM/yyyy HH:mm')
    this.createdAtApi = project.created_at
  }
}
