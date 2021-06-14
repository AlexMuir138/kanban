import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/boards/:id/lists/:listId/tasks/:taskId/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllComments)
      .get('/:commentId', this.getCommentById)
      .post('', this.createComment)
      .delete('/:commentId', this.deleteComment)
  }

  async getAllComments(req, res, next) {
    try {
      const comments = await commentsService.getAllComments(req.params.taskId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getCommentById(req, res, next) {
    try {
      const task = await commentsService.getCommentById(req.params.commentId)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(commentData)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commentId)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
}
