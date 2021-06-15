<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <p>
          {{ task.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { task: { type: Object, required: true } },
  setup() {

  }
}
</script>

<style>

</style>
