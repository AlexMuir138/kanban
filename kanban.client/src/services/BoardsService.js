import { logger } from '../utils/Logger'

const { api } = require('./AxiosService')

class BoardsService {
  async getBoards() {
    const res = await api.get('/api/boards')
    logger.log(res)
  }
}
export const boardsService = new BoardsService()
