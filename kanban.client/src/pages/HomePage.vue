<template>
  <div class="home d-flex align-items-center justify-content-center">
    <div class="row m-3">
      <div class="card bg-info p-3 shadow-lg">
        <form class="form" @submit.prevent="createBoard">
          <label for="board-name">
            <input type="text" class="form-control mb-3" placeholder="New Board Name" name="board-name" v-model="state.newBoard.name">
          </label>
          <button type="submit" class="btn btn-primary mb-2" title="Create Board">
            Create Board
          </button>
        </form>
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <Board v-for="board in boards" :key="board.id" :board="board" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import Notification from '../utils/Notification'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      newBoard: {}
    })
    onMounted(async() => {
      try {
        await boardsService.getBoards()
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      state,
      boards: computed(() => AppState.boards),
      createBoard() {
        boardsService.createBoard(state.newBoard)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}

</style>
