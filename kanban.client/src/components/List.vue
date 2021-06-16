<template class="pb-3">
  <div class="border-1 col-3 m-3 p-3 shadow-lg bg-info rounded">
    <div class="card border-0">
      <div class="card-header text-center text-light bg-info">
        <i @click="deleteList" v-if="list.creatorId === account.id">X</i>
        <h3><u> {{ list.name }}</u></h3>
        <h3><i @click="deleteList" class="mdi mdi-trash-can-outline d-flex justify-content-end"></i></h3>
      </div>
      <div class="card-body">
        <Task v-for="task in state.tasks" :key="task.id" :task="task" />
      </div>
      <div class="card-footer bg-info">
        <form @submit.prevent="createTask" :id="list.id">
          <label for="Task Name" class="d-flex justify-content-center">
            <input type="text" name="Task Name" placeholder="Create a Task" v-model="state.newTask.name">
          </label>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { tasksService } from '../services/TasksService'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { listsService } from '../services/ListService'
export default {
  props: { list: { type: Object, required: true } },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks[props.list.id]),
      newTask: {
        listId: props.list.id,
        creatorId: props.list.creatorId
      }
    })
    onMounted(async() => {
      try {
        tasksService.getAllTasks(props.list.id)
      } catch (error) {
        Notification.toast(error)
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      async createTask() {
        await tasksService.createTask(state.newTask)
        state.newTask.name = ''
      },
      async deleteList() {
        await listsService.deleteList(props.list)
      }
    }
  }
}
</script>

<style>
.border-1 {
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter:         drop-shadow(5px 5px 5px #222);
}

</style>
