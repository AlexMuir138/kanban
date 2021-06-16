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

  async changeList(taskId, updatedTask) {
    return await dbContext.Task.findByIdAndUpdate(taskId, updatedTask, { new: true })
  }
}
export const tasksService = new TasksService()
