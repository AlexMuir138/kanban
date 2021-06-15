import { AppState } from '../AppState'
import { Task } from '../models/Task'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async getAllTasks(id) {
    const res = await api.get('api/lists/' + id + '/tasks')
    AppState.tasks[id] = res.data
    logger.log(AppState.tasks)
  }

  async createTask(taskData) {
    logger.log(taskData)
    const res = await api.post('/api/lists/' + taskData.listId + '/tasks', taskData)
    logger.log(res.data)
    if (AppState.tasks[taskData.listId]) {
      AppState.tasks[taskData.listId].push(new Task(res.data))
    } else {
      AppState.tasks[taskData.listId] = [new Task(res.data)]
    }
    logger.log(AppState.tasks)
  }
}
export const tasksService = new TasksService()
