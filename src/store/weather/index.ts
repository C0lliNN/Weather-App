/* eslint-disable no-param-reassign */
import api from '@/services/api';
import { Module } from 'vuex';

type WeatherState =
  | 'Snow'
  | 'Sleet'
  | 'Hail'
  | 'Thunderstorm'
  | 'Heavy Rain'
  | 'Light Rain'
  | 'Showers'
  | 'Heavy Cloud'
  | 'Light Cloud'
  | 'Clear';

type CompassPoint =
  | 'N'
  | 'E'
  | 'S'
  | 'W'
  | 'NE'
  | 'SE'
  | 'SW'
  | 'NW'
  | 'NNE'
  | 'ENE'
  | 'ESE'
  | 'SSE'
  | 'SSW'
  | 'WSW'
  | 'WNW'
  | 'NNW';

interface Forecast {
  airPressure: number;
  humidity: number;
  minTemperature: number;
  maxTemperature: number;
  weatherStateName: WeatherState;
  windSpeed: number;
  windDirectionCompass: CompassPoint;
  date: Date;
}

interface Weather {
  forecasts: Forecast[];
  locationName: string;
  currentDate: Date;
  locationId: number;
}

interface State {
  isLoading: boolean;
  error: string | null;
  weather: Weather;
}

const LONDRES_ID = 44418;

const weatherModule: Module<State, {}> = {
  state: {
    isLoading: false,
    error: null,
    weather: {
      forecasts: [],
      locationName: 'Londres',
      locationId: LONDRES_ID,
      currentDate: new Date(),
    },
  },
  mutations: {
    startLoading(store) {
      store.isLoading = true;
    },
    setError(store, errorMessage: string) {
      store.error = errorMessage;
    },
    setWeather(store, weather: Weather) {
      store.weather = weather;
    },
    stopLoading(store) {
      store.isLoading = false;
    },
  },
  actions: {
    async getWeatherInformation(context, locationId: number) {
      context.commit('startLoading');
      try {
        const { data } = await api.get(`/location/${locationId}`);

        const weather: Weather = {
          locationName: data.title,
          locationId: data.woeid,
          currentDate: new Date(data.time),
          forecasts: data.consolidated_weather.map(
            (consolidatedWeather: any) => ({
              airPressure: consolidatedWeather.air_pressure,
              date: new Date(consolidatedWeather.created),
              humidity: consolidatedWeather.humidity,
              minTemperature: consolidatedWeather.min_temp,
              maxTemperature: consolidatedWeather.max_temp,
              weatherStateName: consolidatedWeather.weather_state_name,
              windSpeed: consolidatedWeather.wind_speed,
              windDirectionCompass: consolidatedWeather.wind_direction_compass,
            }),
          ),
        };

        context.commit('setWeather', weather);
      } catch (error) {
        context.commit('setError', error.message);
      }
    },
  },
  getters: {
    getCurrentLocationId(store): number {
      return store.weather.locationId;
    },
  },
};

export default weatherModule;
