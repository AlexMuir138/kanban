import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  boards: [],
  activeBoard: null,
  lists: [],
  tasks: {},
  comments: {},
  activeTask: null
})
