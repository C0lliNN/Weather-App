import { State } from './types';

const LONDRES_ID = 44418;

const state: State = {
  isLoading: false,
  error: null,
  data: {
    forecasts: [],
    weather: {
      locationId: LONDRES_ID,
      locationName: 'Londres',
      currentDate: new Date(),
      currentTemperature: 0,
      airPressure: 0,
      humidity: 0,
      windSpeed: 0,
      windDirectionCompass: 'N',
      weatherStateName: 'Clear',
    },
  },
};

export default state;
