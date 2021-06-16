<template>
  <div class="card col-3 text-center">
    <i @click="deleteBoard">X</i>
    <router-link :to="{name: 'Board', params: {id: board.id}}" @click="setActiveBoard">
      {{ board.name }}
    </router-link>
  </div>
</template>

<script>
import { boardsService } from '../services/BoardsService'
export default {
  props: { board: { type: Object, required: true } },
  setup(props) {
    return {
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
