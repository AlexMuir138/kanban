import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'

export class TasksController extends BaseController {
  constructor() {
    super('api/lists/:id/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo, this.isTaskOwner)
      .get('', this.getAllTasks)
      .get('/:taskId', this.getTaskById)
      .post('', this.createTask)
      .put('/:taskId', this.changeList)
      .delete('/:taskId', this.deleteTask)
  }

  async isTaskOwner(req, res, next) {
    try {
      await tasksService.getTaskById(req.params.taskId, req.userInfo.id)
    } catch (error) {
      next(error)
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const tasks = await tasksService.getAllTasks(req.params.id)
      return res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getTaskById(req, res, next) {
    try {
      const list = await tasksService.getTaskById(req.params.taskId, req.userInfo.id)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      const taskData = req.body
      taskData.creatorId = req.userInfo.id
      taskData.email = req.userInfo.email
      taskData.picture = req.userInfo.picture
      const task = await tasksService.createTask(taskData)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next) {
    try {
      const task = await tasksService.deleteTask(req.params.taskId)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async changeList(req, res, next) {
    try {
      const task = await tasksService.changeList(req.params.taskId, req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }
}
