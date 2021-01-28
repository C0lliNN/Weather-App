<template>
  <main>
    <current-weather-bar
      @onSearch.stop="handleShowSearchBar"
    ></current-weather-bar>
    <search-weather-bar
      :show="showSearchBar"
      @onClose.stop="handleCloseSearchBar"
    ></search-weather-bar>
    <advanced-weather-details></advanced-weather-details>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';
import CurrentWeatherBar from '@/components/CurrentWeatherBar.vue';
import SearchWeatherBar from '@/components/SearchWeatherBar.vue';
import AdvancedWeatherDetails from '@/components/AdvancedWeatherDetails.vue';

@Options({
  components: { CurrentWeatherBar, SearchWeatherBar, AdvancedWeatherDetails },
  methods: { ...mapActions(['getData']) },
  computed: { ...mapGetters(['getCurrentLocationId']) },
})
export default class HomePage extends Vue {
  showSearchBar = false;

  getData!: (locationId: number) => void;

  getCurrentLocationId!: number;

  handleShowSearchBar() {
    this.showSearchBar = true;
  }

  handleCloseSearchBar() {
    this.showSearchBar = false;
  }

  mounted() {
    this.getData(this.getCurrentLocationId);
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
    min-height: 100vh;
    overflow: hidden;
  }
}
</style>
