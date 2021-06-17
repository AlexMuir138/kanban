import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getAll(id) {
    return await dbContext.Board.find({ creatorId: id })
  }

  async getById(id, userId) {
    // FIXME dont allow unless the current user owns this
    const board = await dbContext.Board.findOne({ _id: id, creatorId: userId })
    if (!board) {
      throw new BadRequest('You do not have access to this board')
    }
    return board
  }

  async create(board) {
    return await dbContext.Board.create(board)
  }

  async delete(id) {
    return await dbContext.Board.findByIdAndDelete(id)
  }
}
export const boardsService = new BoardsService()
