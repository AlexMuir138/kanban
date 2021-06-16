import { AppState } from '../AppState'
import { Task } from '../models/Task'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TasksService {
  async getAllTasks(id) {
    const res = await api.get('api/lists/' + id + '/tasks')
    logger.log(res.data)
    AppState.tasks[id] = res.data.map(t => new Task(t))
  }

  async createTask(taskData) {
    const res = await api.post('/api/lists/' + taskData.listId + '/tasks', taskData)
    if (AppState.tasks[taskData.listId]) {
      AppState.tasks[taskData.listId].push(new Task(res.data))
    } else {
      AppState.tasks[taskData.listId] = [new Task(res.data)]
    }
  }

  async deleteTask(taskData) {
    await api.delete('/api/lists/' + taskData.listId + '/tasks/' + taskData.id)
    AppState.tasks[taskData.listId] = AppState.tasks[taskData.listId].filter(t => t.id !== taskData.id)
  }

  setActiveTask(taskData) {
    AppState.activeTask = AppState.tasks[taskData.listId].find(t => t.id === taskData.id)
    logger.log(AppState.activeTask)
  }

  async changeList(listId, updatedTask) {
    const res = await api.put('api/lists/' + listId + '/tasks/' + updatedTask.id, updatedTask)
    AppState.tasks[listId] = AppState.tasks[listId].filter(t => t.id !== res.data.id)
    AppState.tasks[res.data.listId].push(res.data)
  }
}
export const tasksService = new TasksService()
