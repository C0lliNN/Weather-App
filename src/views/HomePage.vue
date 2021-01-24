<template>
  <main>
    <current-weather-bar
      @onSearch.stop="handleShowSearchBar"
    ></current-weather-bar>
    <search-weather-bar :show="showSearchBar" @onClose.stop="handleCloseSearchBar"></search-weather-bar>
    <div>Addvanced Weather Info</div>
  </main>
</template>

<script lang="ts">
import CurrentWeatherBar from '@/components/CurrentWeatherBar.vue';
import SearchWeatherBar from '@/components/SearchWeatherBar.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: { CurrentWeatherBar, SearchWeatherBar },
})
export default class HomePage extends Vue {
  showSearchBar = false;

  handleShowSearchBar() {
    this.showSearchBar = true;
  }

  handleCloseSearchBar() {
    this.showSearchBar = false;
  }
}
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
    grid-template-columns: var(--leftbar-side) 69%;
    height: 100vh;
    overflow: hidden;
  }
}
</style>
