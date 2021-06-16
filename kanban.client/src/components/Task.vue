<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="d-flex align-items-column justify-content-between p-3">
          <p @click="setActiveTask" data-toggle="modal" data-target="#exampleModalCenter">
            {{ task.name }}
          </p>
          <i @click="deleteTask" v-if="task.creatorId === account.id" class="mdi mdi-trash-can-outline"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tasksService } from '../services/TasksService'
import { commentsService } from '../services/CommentsService'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: { task: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
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
