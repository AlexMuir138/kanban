<template>
  <div class="card col-3 text-center rounded p-3 m-4">
    <router-link :to="{name: 'Board', params: {id: board.id}}" @click="setActiveBoard">
      <h4>
        <u>{{ board.name }}</u>
      </h4>
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
      }
    }
  }
}
</script>

<style>

</style>
