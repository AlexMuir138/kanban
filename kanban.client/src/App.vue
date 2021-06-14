<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <button @click="getBoards">
      Get
    </button>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import { boardsService } from './services/BoardsService'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState),
      getBoards() {
        boardsService.getBoards()
      }
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
