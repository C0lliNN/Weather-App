<template>
  <transition
    enter-active-class="bar-enter-active"
    leave-active-class="bar-leave-active"
  >
    <div v-show="show" class="search-container">
      <div class="container">
        <div class="close-bar">
          <button @click="handleClose">
            <img src="../assets/icons/close-white-18dp.svg" alt="Close" />
          </button>
        </div>
        <form class="search-bar" @submit.prevent="getLocations">
          <div :class="{ focused: isInputFocused }">
            <span>
              <img src="../assets/icons/search-black-18dp.svg" alt="" />
            </span>
            <input
              type="text"
              placeholder="Enter a Location"
              v-model="searchQuery"
              @focus="handleInputFocus"
              @blur="handleInputBlur"
            />
          </div>
          <button type="submit">Search</button>
        </form>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul class="locations" v-else-if="locations.length">
          <li
            v-for="location in locations"
            :key="location.woeid"
            role="button"
            @click="getNewData(location.woeid, $event)"
          >
            <span>{{ location.name }}</span>
            <img
              src="../assets/icons/keyboard_arrow_right-black-18dp.svg"
              alt=""
            />
          </li>
        </ul>
        <p v-else class="empty-message">No Locations founded</p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import api from '@/services/api';
import Swal from 'sweetalert2';
import { Options, Vue } from 'vue-class-component';
import { mapActions } from 'vuex';
import BaseSpinner from './UI/BaseSpinner.vue';

interface Location {
  woeid: number;
  name: string;
}

@Options({
  components: { BaseSpinner },
  props: ['show'],
  emits: ['on-close'],
  methods: {
    ...mapActions(['getWeatherFromWoeid']),
  },
})
export default class extends Vue {
  show!: boolean;

  getWeatherFromWoeid!: (woeid: number) => void;

  isInputFocused = false;

  searchQuery = '';

  locations: Location[] = [];

  isLoading = false;

  handleClose(e: Event) {
    this.$emit('on-close', e);
  }

  handleInputFocus() {
    this.isInputFocused = true;
  }

  handleInputBlur() {
    this.isInputFocused = false;
  }

  async getLocations() {
    if (this.searchQuery) {
      this.isLoading = true;
      try {
        const { data } = await api.get('/location/search', {
          params: {
            query: this.searchQuery,
          },
        });

        this.locations = data.slice(0, 5).map((location: any) => ({
          woeid: location.woeid,
          name: location.title,
        }));
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: `Error while searching locations: ${error.message}`,
        });
      } finally {
        this.isLoading = false;
      }
    }
  }

  getNewData(woeid: number, event: Event) {
    this.getWeatherFromWoeid(woeid);
    this.handleClose(event);
  }
}
</script>

<style scoped>
.search-container {
  background-color: var(--primary);
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100%;
}

.container {
  position: relative;
  width: 90%;
  margin: auto;
}

.bar-enter-active {
  animation: slide-in 0.3s ease-in-out forwards;
}

.bar-leave-active {
  animation: slide-out 0.3s ease-in-out forwards;
}

.close-bar {
  text-align: right;
  padding: 10px 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.close-bar button {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  transition: all 0.3s ease-in-out;
}

.close-bar button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.search-bar {
  width: 100%;
  display: flex;
}

.search-bar div {
  width: 75%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border: 1px solid var(--secondary);
  transition: all 0.3s ease-in-out;
}

.search-bar div.focused {
  box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.2);
}

.search-bar span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  min-width: 35px;
}

.search-bar input {
  box-sizing: border-box;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 12px 0;
  font-size: 1em;
  color: var(--secondary);
  flex-shrink: 1;
}

.search-bar button {
  border: none;
  outline: none;
  font-size: 1em;
  background: #3c47e9;
  border: 1px solid #3c47e9;
  color: #fff;
  cursor: pointer;
  padding: 12px 0;
  width: 23%;
  margin-left: 2%;
  transition: all 0.3s ease-in-out;
}

.search-bar button:hover {
  background: #3640d1;
  border: 1px solid #3640d1;
}

.search-bar button:focus {
  box-shadow: 0px 0px 1px 3px #3c48e954;
}

.search-bar input::placeholder {
  color: #616475;
}

.locations {
  list-style: none;
  margin-top: 35px;
}

.locations li {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  color: var(--secondary);
  border: 1px solid transparent;
  cursor: pointer;
}

.locations img {
  display: none;
}

.locations li:hover {
  border: 1px solid #616475;
}

.locations li:hover img {
  display: block;
}

.empty-message {
  color: var(--secondary);
  margin-top: 35px;
}

@keyframes slide-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translate(0);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
  }
  to {
    transform: translate(-100%);
  }
}

@media (min-width: 768px) {
  .search-container {
    width: var(--leftbar-side);
    position: fixed;
  }
  .close-bar {
    text-align: right;
    padding: 15px 20px;
  }
}

@media (min-height: 768px) {
  .close-bar {
    padding: 15px 20px;
  }
}
</style>
