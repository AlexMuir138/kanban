import { dbContext } from '../db/DbContext'

class TasksService {
  async getAllTasks(id) {
    return await dbContext.Task.find({ listId: id })
  }

  async getTaskById(id) {
    return await dbContext.Task.findById(id)
  }

  async createTask(task) {
    return await dbContext.Task.create(task)
  }

  async deleteTask(id) {
    return await dbContext.Task.findByIdAndDelete(id)
  }
}
export const tasksService = new TasksService()
