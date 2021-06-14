import { dbContext } from '../db/DbContext'

class ListsService {
  async getAllLists(id) {
    return await dbContext.List.find({ boardId: id })
  }

  async getListById(id) {
    return await dbContext.List.findById(id)
  }

  async createList(list) {
    return await dbContext.List.create(list)
  }

  async deleteList(id) {
    return await dbContext.List.findByIdAndDelete(id)
  }
}
export const listsService = new ListsService()
