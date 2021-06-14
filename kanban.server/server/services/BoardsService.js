import { dbContext } from '../db/DbContext'

class BoardsService {
  async getAll(id) {
    return await dbContext.Board.find({ creatorId: id })
  }

  async getById(id) {
    return await dbContext.Board.findById(id)
  }

  async create(board) {
    return await dbContext.Board.create(board)
  }

  async delete(id) {
    return await dbContext.Board.findByIdAndDelete(id)
  }
}
export const boardsService = new BoardsService()
