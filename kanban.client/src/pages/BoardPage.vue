<template>
  <div class="container">
    <div class="row m-3">
      <div class="col-12 d-flex justify-content-center">
        <form @submit.prevent="createList" class="card p-3 mx-3 bg-light shadow-lg">
          <label for="List Name">
            <input type="text" class="form" v-model="state.newList.name" placeholder="New List Name">
          </label>
          <button type="submit" class="btn btn-primary m-1">
            Create New List
          </button>
        </form>
      </div>
    </div>
    <div class="row">
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
      createList() {
        listsService.createList(state.newList)
      }
    }
  }

}
</script>

<style>

</style>
