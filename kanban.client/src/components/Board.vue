<template>
  <div class="card col-3 text-center rounded m-3">
    <router-link :to="{name: 'Board', params: {id: board.id}}" @click="setActiveBoard" class="p-3 m-2 border shadow-lg">
      <h2>{{ board.name }}</h2>
    </router-link>
    <p class="p-2">
      {{ board.email }}
      <img :src="board.picture" :alt="board.email" class="rounded-pill" height="40" />
    </p>
    <div class="d-flex align-items-column justify-content-center text-danger shadow-lg m-3">
      <p>Delete</p>
      <i @click="deleteBoard" v-if="board.creatorId === account.id" class="mdi mdi-trash-can-outline"></i>
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

</style>
