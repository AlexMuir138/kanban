import { AppState } from '../AppState'
import { Board } from '../models/Board'
import { logger } from '../utils/Logger'

const { api } = require('./AxiosService')

class BoardsService {
  async getBoards() {
    const res = await api.get('/api/boards')
    logger.log(res)
    AppState.boards = res.data.map(b => new Board(b))
  }

  async createBoard(boardData) {
    const res = await api.post('/api/boards', boardData)
    AppState.boards = AppState.boards.push(res.data)
  }

  async deleteBoard(id) {
    await api.delete('api/boards/' + id)
    AppState.boards = AppState.boards.filter(b => b.id !== id)
  }

  setActiveBoard(id) {
    const board = AppState.boards.find(b => b.id === id)
    AppState.activeBoard = board
    logger.log(AppState.activeBoard)
  }
}
export const boardsService = new BoardsService()
