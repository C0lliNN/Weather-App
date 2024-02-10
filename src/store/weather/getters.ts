import { GetterTree } from 'vuex';
import { Forecast, Place, State, Weather } from './types';

const getters: GetterTree<State, {}> = {
  getCurrentPlace(store: State): Place {
    return store.data.weather.place;
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
