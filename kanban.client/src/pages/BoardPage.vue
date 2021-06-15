<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="createList" class="card">
          <label for="List Name">
            <input type="text" class="form" v-model="state.newList.name" placeholder="New List Name">
          </label>
          <button type="submit">
            Create List
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
