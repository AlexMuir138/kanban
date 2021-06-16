import { AppState } from '../AppState'
import { List } from '../models/List'
import { api } from './AxiosService'

class ListsService {
  async getLists(id) {
    const res = await api.get('api/boards/' + id + '/lists')
    AppState.lists = res.data.map(l => new List(l))
  }

  async createList(listData) {
    const res = await api.post('api/boards/' + listData.boardId + '/lists', listData)
    AppState.lists = AppState.lists.push(new List(res.data))
  }

  async deleteList(id) {
    await api.delete('api/boards/' + id)
    AppState.lists = AppState.lists.filter(l => l.id !== id)
  }
}

export const listsService = new ListsService()
