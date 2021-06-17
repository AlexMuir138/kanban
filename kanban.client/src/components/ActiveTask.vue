<template>
  <!-- Modal -->
  <div class="modal"
       id="exampleModalCenter"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalCenterTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-success" id="exampleModalLongTitle">
            <u> {{ activeTask.name }}</u>
          </h5>
          <div class="dropdown px-5">
            <button class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    title="Move to new list"
            >
              Move to List...
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                class="dropdown-item"

                v-for="list in lists"
                :key="list.id"
                @click="changeList(list.id)"
                :title="list.name"
              >
                {{ list.name }}
              </a>
            </div>
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" title="close task">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body container">
          <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
        </div>
        <div class="modal-footer justify-content-center">
          <form @submit.prevent="createComment" :id="activeTask.id">
            <textarea name="comment body"
                      id=""
                      cols="50"
                      rows="3"
                      placeholder="add comment"
                      v-model="state.newComment.body"
                      class="form-control mb-1"
            ></textarea>
            <div class="d-flex justify-content-end p-2">
              <button class="btn btn-primary" type="submit" title="submit comment">
                submit commment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newComment: { taskId: AppState.activeTask.id },
      updatedTask: { id: AppState.activeTask.id }

    })
    return {
      state,
      activeTask: computed(() => AppState.activeTask),
      comments: computed(() => AppState.comments),
      lists: computed(() => AppState.lists),
      board: computed(() => AppState.activeBoard),
      async createComment() {
        await commentsService.createComment(state.newComment)
        state.newComment.body = ''
      },
      async changeList(newListId) {
        state.updatedTask.listId = newListId
        await tasksService.changeList(AppState.activeTask.listId, state.updatedTask)
        // eslint-disable-next-line no-undef
        $('#exampleModalCenter').hide()
        // eslint-disable-next-line no-undef
        $('.modal-backdrop').hide()

        await listsService.getLists(route.params.id)
      }

    }
  }
}
</script>

<style>

</style>
