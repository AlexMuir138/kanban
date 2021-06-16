<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <i @click="deleteTask">X</i>
        <p>
          {{ task.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
export default {
  props: { task: { type: Object, required: true } },
  setup(props) {
    return {
      async deleteTask() {
        await tasksService.deleteTask(props.task)
      }
    }
  }
}
</script>

<style>

</style>
