import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async getAllLists(id) {
    return await dbContext.List.find({ boardId: id })
  }

  async getListById(id, userId) {
    const list = await dbContext.List.findOne({ _id: id, creatorId: userId })
    if (!list) {
      throw new BadRequest('You do not have access to this list')
    }
    return list
  }

  async createList(list) {
    return await dbContext.List.create(list)
  }

  async deleteList(id) {
    return await dbContext.List.findByIdAndDelete(id)
  }
}
export const listsService = new ListsService()
