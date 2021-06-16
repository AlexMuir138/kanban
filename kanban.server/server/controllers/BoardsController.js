import BaseController from '../utils/BaseController'
import { boardsService } from '../services/BoardsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const boards = await boardsService.getAll(req.userInfo.id)
      return res.send(boards)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const board = await boardsService.getById(req.params.id)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const boardData = req.body
      boardData.creatorId = req.userInfo.id
      boardData.email = req.userInfo.email
      boardData.picture = req.userInfo.picture
      const board = await boardsService.create(boardData)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const board = await boardsService.delete(req.params.id)
      return res.send(board)
    } catch (error) {
      next(error)
    }
  }
}
