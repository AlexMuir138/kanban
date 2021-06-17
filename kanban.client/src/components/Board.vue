<template>
  <div class="board-card card col-3 text-center rounded m-3 bg-info d-flex justify-content-between border-0">
    <router-link :to="{name: 'Board', params: {id: board.id}}" @click="setActiveBoard" class="p-3 m-3 border shadow-lg bg-light rounded" :title="board.name">
      <h2 class="m-2">
        {{ board.name }}
      </h2>
    </router-link>
    <p class="email bg-danger rounded text-warning">
      {{ board.email }}
      <img :src="board.picture" :alt="board.email" class="rounded-pill" height="40" />
    </p>
    <div class="container-fluid">
      <p>
        <i @click="deleteBoard" v-if="board.creatorId === account.id" class="Board-trash mdi mdi-trash-can-outline rounded" title="Delete Board"></i>
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { boardsService } from '../services/BoardsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
export default {
  props: { board: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      setActiveBoard() {
        try {
          boardsService.setActiveBoard(props.board.id)
        } catch (error) {
          Notification.toast(error.message, 'error')
        }
      },
      async deleteBoard() {
        if (await Notification.confirmAction()) {
          await boardsService.deleteBoard(props.board.id)
        }
      }
    }
  }
}
</script>

<style>
.Board-trash:hover{
  color: yellow;
}
.email {
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter:         drop-shadow(5px 5px 5px #222);
}
.board-card{
  background-image: url('../assets/img/Sammy.jpeg');
  background-size: 50vh;
}

</style>
