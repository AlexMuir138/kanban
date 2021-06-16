<template>
  <!-- Modal -->
  <div class="modal fade"
       id="exampleModalCenter"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalCenterTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            {{ activeTask.name }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
            <button class="btn btn-primary" type="submit">
              submit commment
            </button>
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
export default {
  setup() {
    const state = reactive({
      newComment: { taskId: AppState.activeTask.id }
    })
    return {
      state,
      activeTask: computed(() => AppState.activeTask),
      comments: computed(() => AppState.comments),
      async createComment() {
        await commentsService.createComment(state.newComment)
        state.newComment.body = ''
      }

    }
  }
}
</script>

<style>

</style>
