import { http } from '../http'
import { ProjectModel } from '../models/ProjectModel'

export const listProjects = async () => {
  const { data } = await http().get('/projects')
  return data.data.map((project) => new ProjectModel(project))
}

export const createProject = async (payload) => {
  const { data } = await http().post('/projects', payload)
  return new ProjectModel(data.data)
}

export const updateProject = async (payload) => {
  const { data } = await http().put(`/projects/${payload.id}`, payload)
  return new ProjectModel(data.data)
}

export const removeProject = async (id) => {
  return http().delete(`/projects/${id}`)
}
