import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'

export class ListsController extends BaseController {
  constructor() {
    super('api/boards/:id/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllLists)
      .get('/:listId', this.getListById)
      .post('', this.createList)
      .delete('/:listId', this.deleteList)
  }

  async getAllLists(req, res, next) {
    try {
      const lists = await listsService.getAllLists(req.params.id)
      return res.send(lists)
    } catch (error) {
      next(error)
    }
  }

  async getListById(req, res, next) {
    try {
      const list = await listsService.getListById(req.params.listId)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      const listData = req.body
      listData.creatorId = req.userInfo.id
      const list = await listsService.createList(listData)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const list = await listsService.deleteList(req.params.listId)
      return res.send(list)
    } catch (error) {
      next(error)
    }
  }
}
