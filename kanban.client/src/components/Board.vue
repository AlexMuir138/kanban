<template>
  <div class="card col-3 text-center">
    <i @click="deleteBoard" v-if="board.creatorId === account.id">X</i>
    <router-link :to="{name: 'Board', params: {id: board.id}}" @click="setActiveBoard">
      {{ board.name }}
    </router-link>
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
