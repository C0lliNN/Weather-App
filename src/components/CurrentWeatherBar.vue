<template>
  <aside>
    <div class="container">
      <div class="header">
        <button class="btn search" @click="handleSearch">
          {{ searchText }}
        </button>
        <button class="btn icon">
          <img
            src="../assets/icons/gps_fixed-24px.svg"
            alt="User Current location"
          />
        </button>
      </div>
      <div class="weather-symbol">
        <img src="../assets/images/Shower.png" alt="" />
      </div>
      <div class="temperature">
        <h3>
          <span>15</span>
          <span class="unit">°C</span>
        </h3>
      </div>
      <h4 class="type">Shower</h4>
      <div class="footer">
        <div class="date">
          <span>Today</span>
          <span class="separator">-</span>
          <span>Fri, 5 Jun</span>
        </div>
        <div class="location">
          <img src="../assets/icons/location_on-white-24dp.svg" alt="" />
          <span>Helsink</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { IntlShape } from '@formatjs/intl';
import { Options, Vue } from 'vue-class-component';

@Options({
  inject: ['intl'],
  emits: ['on-search'],
})
export default class extends Vue {
  intl!: IntlShape<string>;

  get searchText(): string {
    return this.intl.formatMessage({
      id: 'Search Places',
      defaultMessage: 'Search Places',
    });
  }

  handleSearch(e: Event) {
    this.$emit('on-search', e);
  }
}
</script>

<style scoped>
aside {
  height: 100vh;
  background-color: var(--primary);
}

.container {
  height: 100%;
  box-sizing: border-box;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

.header {
  display: flex;
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: #6e707a;
  color: #e7e7eb;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background-color: #606269;
}

.btn:focus {
  box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.2);
}

.search {
  padding: 0 18px;
  font-size: 16px;
}

.icon {
  width: 40px;
  border-radius: 100%;
}

.weather-symbol {
  position: relative;
  width: 120%;
  padding: 60px 0;
  box-sizing: border-box;
}

.weather-symbol:before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.1;
  background: url('../assets/images/Cloud-background.png') no-repeat;
  background-position: center;
  background-size: cover;
}

.weather-symbol img {
  display: block;
  width: 170px;
  margin: auto;
}

.temperature h3 {
  text-align: center;
  color: var(--secondary);
  font-size: 96px;
  font-weight: 500;
}

.temperature .unit {
  color: var(--gray);
  font-size: 48px;
}

.type {
  color: var(--gray);
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}

.footer {
  padding-bottom: 20px;
  box-sizing: border-box;
}

.footer .date {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray);
  font-size: 18px;
  font-weight: 500;
}

.footer .separator {
  margin: 0 15px;
}

.footer .location {
  color: var(--gray);
  font-size: 18px;
  font-weight: 500;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location img {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

@media (min-width: 768px) {
  aside {
    height: 100%;
  }
}

@media (min-height: 768px) {
  .header {
    padding: 30px 40px 0px 40px;
  }
  .temperature h3 {
    font-size: 120px;
  }

  .weather-symbol img {
    width: 212px;
  }

  .footer {
    padding-bottom: 40px;
  }
}
</style>
