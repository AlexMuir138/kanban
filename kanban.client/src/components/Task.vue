<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <i @click="deleteTask">X</i>
        <p @click="setActiveTask" data-toggle="modal" data-target="#exampleModalCenter">
          {{ task.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
export default {
  props: { task: { type: Object, required: true } },
  setup(props) {
    return {
      async deleteTask() {
        await tasksService.deleteTask(props.task)
      },
      setActiveTask() {
        tasksService.setActiveTask(props.task)
        commentsService.getComments(props.task.id)
      }
    }
  }
}
</script>

<style>

</style>
