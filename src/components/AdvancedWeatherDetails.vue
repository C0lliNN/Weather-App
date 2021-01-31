<template>
  <section>
    <div class="spinner-container" v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <div class="container" v-else>
      <div class="temperature-unit">
        <button @click="changeUnit('C')" :class="{ active: unit === 'C' }">
          °C
        </button>
        <button @click="changeUnit('F')" :class="{ active: unit === 'F' }">
          °F
        </button>
      </div>
      <div class="weather-forecast">
        <div
          :key="forecast.date"
          v-for="forecast in transformedForecasts"
          class="weather"
        >
          <h5>{{ forecast.date }}</h5>
          <img :src="forecast.weatherStateImage" alt="" />
          <div class="temperatures">
            <span class="max"
              >{{ forecast.maxTemperature }} {{ formattedUnit }}</span
            >
            <span class="min"
              >{{ forecast.minTemperature }} {{ formattedUnit }}</span
            >
          </div>
        </div>
      </div>
      <div>
        <h3>Today's Highlights</h3>
        <div class="highlights">
          <div>
            <h5>Wind Status</h5>
            <p>
              <span>{{ windSpeed }}</span>
              <span class="unit">mph</span>
            </p>
            <div class="wind">
              <button>
                <img
                  src="../assets/icons/navigation-24px.svg"
                  alt=""
                  width="18"
                  :style="windCompassStyle"
                />
              </button>
              <span>{{ windDirection }}</span>
            </div>
          </div>
          <div>
            <h5>Humidity</h5>
            <p>
              <span>{{ humidity }}</span>
              <span class="unit">%</span>
            </p>
            <div class="progress">
              <div class="indicators">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
              <div class="bar">
                <div :style="{ width: `${humidity}%` }"></div>
              </div>
              <div class="unit">
                <span>%</span>
              </div>
            </div>
          </div>

          <div>
            <h5>Visibility</h5>
            <p>
              <span>{{ visibility }}</span>
              <span class="unit">Miles</span>
            </p>
          </div>
          <div>
            <h5>Air Pressure</h5>
            <p>
              <span>{{ airPressure }}</span>
              <span class="unit">mb</span>
            </p>
          </div>
        </div>
      </div>
      <footer>
        <h4>Raphael Collin @ DevChallenges.io</h4>
      </footer>
    </div>
  </section>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
import CalculateTemperature from '@/mixins/CalculateTemperature';
import GetWeatherImage from '@/mixins/GetWeatherImage';
import { Unit } from '@/store/unit/types';
import { CompassPoint, Forecast, Weather } from '@/store/weather/types';
import { Options, mixins } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';
import BaseSpinner from './UI/BaseSpinner.vue';

interface TransformedForecasts {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  weatherStateImage: string;
}

@Options({
  methods: {
    ...mapActions(['changeUnit']),
  },
  computed: {
    ...mapGetters(['unit', 'isLoading', 'forecasts', 'currentWeather']),
  },
  components: {
    BaseSpinner,
  },
})
export default class App extends mixins(CalculateTemperature, GetWeatherImage) {
  changeUnit!: (unit: Unit) => void;

  unit!: Unit;

  isLoading!: boolean;

  forecasts!: Forecast[];

  currentWeather!: Weather;

  get transformedForecasts(): TransformedForecasts[] {
    console.log(this.forecasts);
    return this.forecasts.map((forecast) => ({
      date: this.formatDate(forecast.date),
      minTemperature: this.round(
        this.calculateTemperature(forecast.minTemperature),
      ),
      maxTemperature: this.round(
        this.calculateTemperature(forecast.maxTemperature),
      ),
      weatherStateImage: this.getWeatherImage(forecast.weatherStateName),
    }));
  }

  formatDate(date: Date): string {
    if (date.getDay() === new Date().getDay() + 1) {
      return 'Tomorrow';
    }
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      weekday: 'short',
    }).format(date);
  }

  round(value: number) {
    return Math.round(value);
  }

  get formattedUnit(): string {
    return `°${this.unit}`;
  }

  get windSpeed(): number {
    return this.round(this.currentWeather.windSpeed);
  }

  get windDirection(): CompassPoint {
    return this.currentWeather.windDirectionCompass;
  }

  get windCompassStyle(): object {
    type Map = {
      [point in CompassPoint]: number;
    };
    const map: Map = {
      N: 0,
      NNE: 22,
      NE: 45,
      ENE: 67,
      E: 90,
      ESE: 112,
      SE: 135,
      SSE: 158,
      S: 180,
      SSW: 202,
      SW: 225,
      WSW: 247,
      W: 270,
      WNW: 293,
      NW: 315,
      NNW: 337,
    };
    return {
      transform: `rotate(${map[this.windDirection]}deg)`,
    };
  }

  get humidity(): number {
    return this.round(this.currentWeather.humidity);
  }

  get airPressure(): number {
    return this.round(this.currentWeather.airPressure);
  }

  get visibility(): number {
    return this.round(this.currentWeather.visibility);
  }
}
</script>

<style scoped>
section {
  background: #100e1d;
  height: 100%;
  z-index: 10;
}

.spinner-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 80%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 40px 0;
}

.temperature-unit {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.temperature-unit button {
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 18px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: #585676;
  color: #fff;
  transition: 0.3s all ease-in-out;
}

.temperature-unit button:first-child {
  margin-right: 12px;
}

.temperature-unit button:hover {
  background-color: #514f6d;
}

.temperature-unit button:focus {
  box-shadow: 0px 0px 1px 3px #58567681;
}

.temperature-unit button.active:focus {
  box-shadow: 0px 0px 1px 3px #e7e7eb7a;
}

.temperature-unit button.active {
  background-color: #e7e7eb;
  color: #110e3c;
  cursor: default;
}

.weather-forecast {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
}

.weather {
  background: #1e213a;
  padding: 15px;
  width: 120px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  font-weight: 500;
  font-size: 1em;
  color: #e7e7eb;
  margin-bottom: 20px;
}

.weather h5 {
  text-align: center;
}

.weather img {
  width: 58px;
  margin: 20px auto;
}

.weather .temperatures {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.weather .min {
  color: #a09fb1;
}

h3 {
  font-size: 18px;
  color: #e7e7eb;
  margin-bottom: 32px;
  margin-top: 12px;
  font-weight: 700;
}

.highlights {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 48px;
  color: #e7e7eb;
}

.highlights > div {
  background: #1e213a;
  padding: 20px;
  box-sizing: border-box;
}

.highlights h5 {
  text-align: center;
}

.highlights p {
  text-align: center;
  font-size: 48px;
  margin: 10px 0;
}

.highlights .unit {
  font-size: 32px;
}

.highlights .wind {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.highlights .wind button {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.highlights .wind span {
  font-size: 14px;
  font-weight: 500;
}

.highlights .progress {
  width: 100%;
}

.progress .indicators {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a09fb1;
}

.progress .bar {
  height: 8px;
  width: 100%;
  margin-top: 2px;
  background-color: #e7e7eb;
  border-radius: 100px;
  position: relative;
}

.progress .bar div {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #ffec65;
  border-radius: 100px;
}

.progress .unit {
  text-align: right;
  margin-top: 4px;
  color: #a09fb1;
  font-size: 12px;
}

footer {
  font-family: 'Montserrat', sans-serif;
  color: #616475;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
}

@media (min-width: 768px) {
  .temperature-unit {
    justify-content: flex-end;
  }

  .highlights {
    grid-template-columns: 1fr 1fr;
    column-gap: 48px;
  }
}

@media (min-height: 768px) {
  h3 {
    font-size: 20px;
  }
  .highlights p {
    font-size: 64px;
  }
}
</style>
