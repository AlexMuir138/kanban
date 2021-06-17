import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TasksService {
  async getAllTasks(id) {
    return await dbContext.Task.find({ listId: id })
  }

  async getTaskById(id, userId) {
    const task = await dbContext.Task.findOne({ _id: id, creatorId: userId })
    if (!task) {
      throw new BadRequest('You do not have acces to this task')
    }
    return task
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
