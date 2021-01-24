<template>
  <home-page></home-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomePage from '@/views/HomePage.vue'; // @ is an alias to /src

@Options({
  components: {
    HomePage,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
}

:root {
  --primary: #1e213a;
  --secondary: #e7e7eb;
  --dark: #100e1d;
  --gray: #a09fb1;
  --leftbar-side: 31%;
}
</style>
