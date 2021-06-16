<template>
  <div class="row">
    <div class="col-12">
      <img :src="comment.picture" :alt="comment.email">
      <p>{{ comment.email }}</p>
      <p>
        {{ comment.body }}
        <i @click="deleteComment">X</i>
      </p>
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

</style>
