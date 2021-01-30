import { GetterTree } from 'vuex';
import { Forecast, State, Weather } from './types';

const getters: GetterTree<State, {}> = {
  getCurrentLocationId(store: State): number {
    return store.data.weather.locationId;
  },
  currentWeather(store: State): Weather {
    return store.data.weather;
  },
  forecasts(store: State): Forecast[] {
    return store.data.forecasts;
  },
  isLoading(store: State): boolean {
    return store.isLoading;
  },
};

export default getters;
