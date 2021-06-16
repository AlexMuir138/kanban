<template>
  <div class="row">
    <div class="col-12">
      <div class="commentBody border-0 rounded p-3 bg-success">
        {{ comment.body }}
        <i @click="deleteComment" v-if="comment.creatorId === account.id">X</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { commentsService } from '../services/CommentsService'
import { AppState } from '../AppState'
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),

      async deleteComment() {
        await commentsService.deleteComment(props.comment)
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
</style>
