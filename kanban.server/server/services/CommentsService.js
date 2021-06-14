import { dbContext } from '../db/DbContext'

class CommentsService {
  async getAllComments(id) {
    return await dbContext.Comment.find({ taskId: id })
  }

  async getCommentById(id) {
    return await dbContext.Comment.findById(id)
  }

  async createComment(comment) {
    return await dbContext.Comment.create(comment)
  }

  async deleteComment(id) {
    return await dbContext.Comment.findByIdAndDelete(id)
  }
}
export const commentsService = new CommentsService()
