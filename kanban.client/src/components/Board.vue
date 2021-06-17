<template>
  <div class="card col-3 text-center rounded m-3 bg-info">
    <router-link :to="{name: 'Board', params: {id: board.id}}" @click="setActiveBoard" class="p-3 m-2 border shadow-lg bg-light rounded">
      <h2>{{ board.name }}</h2>
    </router-link>
    <p>
      {{ board.email }}
      <img :src="board.picture" :alt="board.email" class="rounded-pill" height="40" />
    </p>
    <div class="container-fluid">
      <p>
        <u class="d-flex justify-content-between p-3 m-2">Delete Board -->
          <i @click="deleteBoard" v-if="board.creatorId === account.id" class="Board-trash mdi mdi-trash-can-outline rounded"></i>
        </u>
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
export default {
  props: { board: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      setActiveBoard() {
        boardsService.setActiveBoard(props.board.id)
      },
      async deleteBoard() {
        await boardsService.deleteBoard(props.board.id)
      }
    }
  }
}
</script>

<style>
.Board-trash:hover{
  color: yellow;
  font-size: 125%;
}

</style>
