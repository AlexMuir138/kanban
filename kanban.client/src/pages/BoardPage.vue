<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-12">
        <ActiveTask v-if="activeTask" />
      </div>
    </div>
    <div class="row m-5">
      <div class="col-12 d-flex justify-content-center">
        <form @submit.prevent="createList" class="board-form border-0 card p-3 mx-3 bg-light shadow-lg">
          <label for="List Name">
            <input type="text" class="form" v-model="state.newList.name" placeholder="New List Name">
          </label>
          <button type="submit" class="btn btn-primary m-1" title="Create List">
            Create New List
          </button>
        </form>
      </div>
    </div>
    <div class="row d-flex justify-content-between">
      <List v-for="list in lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { listsService } from '../services/ListService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newList: { boardId: route.params.id }
    })
    onMounted(async() => {
      try {
        listsService.getLists(route.params.id)
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      state,
      lists: computed(() => AppState.lists),
      activeTask: computed(() => AppState.activeTask),
      async createList() {
        await listsService.createList(state.newList)
        state.newList.name = ''
      }
    }
  }

}
</script>

<style>
form {
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter:         drop-shadow(5px 5px 5px #222);
}
.board-form{
  background-image: url('../assets/img/rainbow-wallpaper.jpeg');
  background-size: 50vh;
}

</style>
