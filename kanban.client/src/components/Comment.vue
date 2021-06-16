<template>
  <div class="row">
    <div class="col-12">
      <div class="commentBody border-0 rounded p-3 bg-success">
        {{ comment.body }}
        <i @click="deleteComment">X</i>
      </div>
      <div class="d-flex justify-content-end p-2">
        <img height="40" class="rounded-pill" :src="comment.picture" :alt="comment.email ">
        <p class="pt-2 px-2">
          {{ comment.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { commentsService } from '../services/CommentsService'
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
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
