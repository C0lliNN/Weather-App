<template>
  <main>
    <current-weather-bar></current-weather-bar>
    <div>Addvanced Weather Info</div>
  </main>
</template>

<script lang="ts">
import CurrentWeatherBar from '@/components/CurrentWeatherBar.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { CurrentWeatherBar },
})
export default class HomePage extends Vue {}
</script>

<style scoped>
main {
  height: auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  overflow: auto;
}

@media (min-width: 768px) {
  main {
    grid-template-columns: 31% 69%;
    height: 100vh;
    overflow: hidden;
  }
}
</style>
