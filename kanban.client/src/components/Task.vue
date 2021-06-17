<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="d-flex align-items-column justify-content-between p-3 text-success">
          <p @click="setActiveTask" data-toggle="modal" data-target="#exampleModalCenter">
            <u>{{ task.name }}</u>
          </p>
          <i @click="deleteTask" v-if="task.creatorId === account.id" class=" Trash-2 mdi mdi-trash-can-outline text-danger rounded-pill"></i>
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
p{
  cursor: pointer;
}
i{
  cursor: pointer;
}
.Trash-2:hover{
  font-size: 150%;
  background-color: yellow;
}

</style>
