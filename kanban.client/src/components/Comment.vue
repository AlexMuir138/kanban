<template>
  <div class="row">
    <div class="col-12">
      <div class="commentBody border-0 rounded p-3 bg-success d-flex justify-content-between text-dark">
        {{ comment.body }}
        <i @click="deleteComment" v-if="comment.creatorId === account.id" class="mdi mdi-trash-can-outline rounded" title="Delete Comment"></i>
      </div>
      <div class="d-flex justify-content-center p-3">
        <img :src="comment.picture" :alt="comment.email" class="rounded-pill" height="40" />
        <p class="p-2 text-light bg-primary rounded-pill">
          {{ comment.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'

export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),

      async deleteComment() {
        if (await Notification.confirmAction()) {
          await commentsService.deleteComment(props.comment)
        }
      }
    }
  }
}
</script>

<style>
.commentBody {
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter:         drop-shadow(5px 5px 5px #222);
}
img {
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter:         drop-shadow(5px 5px 5px #222);
}
i:hover{
  background-color: var(--warning);
  font-size: 90%;
}
.mdi-trash-can-outline{
  color:#114e29;
}

</style>
