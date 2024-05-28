import useHttp from '../../composables/useHttp'
import { ProjectModel } from '../models/ProjectModel'

export const listProjects = async () => {
  const { data } = await useHttp('/projects', { method: 'GET' })
  return data.data.map((project) => new ProjectModel(project))
}

export const createProject = async (payload) => {
  const { data } = await useHttp('/projects', {
    method: 'POST',
    body: { payload },
  })
  return new ProjectModel(data.data)
}

export const updateProject = async (payload) => {
  const { data } = await useHttp(`/projects/${payload.id}`, {
    method: 'PUT',
    body: { payload },
  })
  return new ProjectModel(data.data)
}

export const removeProject = (id) => {
  return useHttp(`/projects/${id}`, { method: 'DELETE' })
}
