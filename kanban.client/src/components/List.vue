<template class="pb-3">
  <div class="task-card border-1 col-3 m-3 p-3 shadow-lg bg-info rounded">
    <div class="card border-0">
      <div class="card-header text-center text-light bg-info">
        <h3><u> {{ list.name }}</u></h3>
      </div>
      <div class="card-body bg-primary ">
        <Task v-for="task in state.tasks" :key="task.id" :task="task">
        </task>
      </div>
      <div class="card-footer bg-info">
        <form @submit.prevent="createTask" :id="list.id">
          <label for="Task Name" class="d-flex justify-content-center">
            <input type="text" name="Task Name" placeholder="Create a Task" v-model="state.newTask.name">
          </label>
          <div class="d-flex justify-content-center p-3 ">
            <button type="submit" class="btn btn-primary" title="Create Task">
              Create Task
            </button>
          </div>
          <div>
            <h5 class="d-flex justify-content-center text-warning">
              <h3><i @click="deleteList" class="Trash-1 mdi mdi-trash-can-outline text-danger rounded" title="Delete List"></i></h3>
            </h5>
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
import Notification from '../utils/Notification'

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
        if (await Notification.confirmAction()) {
          await listsService.deleteList(props.list)
        }
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
.Trash-1:hover{
  background-color: yellow;
  font-size: 101%;
}
.task-card{
  background-image: url('../assets/img/rainbow-wallpaper.jpeg');
  background-size: 50vh;
}

</style>
