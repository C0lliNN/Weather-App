import { State } from './types';

const state: State = {
  isLoading: false,
  error: null,
  data: {
    forecasts: [],
    weather: {
      place: {
        placeId: 'london',
        name: 'London',
      },
      currentDate: new Date(),
      currentTemperature: 0,
      airPressure: 0,
      humidity: 0,
      windSpeed: 0,
      visibility: 0,
      windDirectionCompass: 'N',
      weatherStateName: 'Clear',
    },
  },
};

export default state;
