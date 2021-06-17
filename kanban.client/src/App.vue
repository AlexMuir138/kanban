<template>
  <header>
    <Navbar />
  </header>
  <main class="main-image">
    <router-view />
  </main>
  <footer>
    <div class="bg-primary text-light text-center p-4">
      Made with 💖 by Us
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
.main-image{
  background-image: url('./assets/img/unsploosh.jpg');
  background-size:cover;
  background-repeat: no-repeat;
}

</style>
