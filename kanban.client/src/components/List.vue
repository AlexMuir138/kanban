<template>
  <div class="col-3 m-3 p-3">
    <div class="card">
      <div class="card-header text-center text-light bg-dark">
        <h3> {{ list.name }}</h3>
      </div>
      <div class="card-body">
        <Task v-for="task in state.tasks" :key="task.id" :task="task" />
      </div>
      <div class="card-footer bg-dark">
        <form @submit.prevent="createTask" :id="list.id" class="d-flex justify-content-center flex-column">
          <label for="Task Name">
            <input type="text" name="Task Name" placeholder="Create a Task" v-model="state.newTask.name">
          </label>
          <button type="submit" class="btn btn-primary">
            Create Task
          </button>
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
      async createTask() {
        await tasksService.createTask(state.newTask)
        document.getElementById(props.list.id).reset()
      }
    }
  }
}
</script>

<style>

</style>
