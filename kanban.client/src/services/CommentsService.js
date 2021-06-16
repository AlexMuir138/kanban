import { AppState } from '../AppState'
import { api } from './AxiosService'
import { Comment } from '../models/Comment'
import { logger } from '../utils/Logger'

class CommentsService {
  async getComments(id) {
    const res = await api.get('/api/tasks/' + id + '/comments')
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async createComment(commentData) {
    const res = await api.post('/api/tasks/' + commentData.taskId + '/comments', commentData)
    logger.log(res.data)
    AppState.comments.push(new Comment(res.data))
  }

  async deleteComment(commentData) {
    await api.delete('/api/tasks/' + commentData.taskId + '/comments/' + commentData.id)
    AppState.comments = AppState.comments.filter(c => c.id !== commentData.id)
  }
}

export const commentsService = new CommentsService()
