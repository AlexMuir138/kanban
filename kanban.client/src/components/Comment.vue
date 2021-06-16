<template>
  <div class="row">
    <div class="col-12">
      <img :src="comment.picture" :alt="comment.email">
      <p>{{ comment.email }}</p>
      <p>
        {{ comment.body }}
        <i @click="deleteComment" v-if="comment.creatorId === account.id">X</i>
      </p>
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

</style>
