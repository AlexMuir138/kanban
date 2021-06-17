import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentsService {
  async getAllComments(id) {
    return await dbContext.Comment.find({ taskId: id })
  }

  async getCommentById(id, userId) {
    const comment = await dbContext.Comment.findOne({ _id: id, creatorId: userId })
    if (!comment) {
      throw new BadRequest('You do not have acces to this comment')
    }
    return comment
  }

  async createComment(comment) {
    return await dbContext.Comment.create(comment)
  }

  async deleteComment(id) {
    return await dbContext.Comment.findByIdAndDelete(id)
  }
}
export const commentsService = new CommentsService()
