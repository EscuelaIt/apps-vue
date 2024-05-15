import { http } from '../http'
import { ProjectModel } from '../models/ProjectModel'

export const listProjects = async () => {
  const { data } = await http().get('/projects')
  return data.data.map((project) => new ProjectModel(project))
}
