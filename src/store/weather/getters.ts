import { GetterTree } from 'vuex';
import { Forecast, State, Weather } from './types';

const getters: GetterTree<State, {}> = {
  getCurrentLocationId(store: State): number {
    return store.data.weather.locationId;
  },
  getCurrentWeather(store: State): Weather {
    return store.data.weather;
  },
  getForecasts(store: State): Forecast[] {
    return store.data.forecasts;
  },
};

export default getters;
