/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data, Weather, Forecast, WeatherState } from './types';

function mapIdToWeatherStateName(id: number): WeatherState {
  switch (id) {
    case 2: return 'Clear'
    case 3: return 'Light Cloud'
    case 4: return 'Light Cloud'
    case 5: return 'Light Cloud'
    case 6: return 'Light Cloud'
    case 7: return 'Heavy Cloud'
    case 8: return 'Heavy Cloud'
    case 9: return 'Heavy Cloud'
    case 10: return 'Light Rain'
    case 11: return 'Heavy Rain'
    case 12: return 'Light Rain'
    case 13: return 'Light Rain'
    case 14: return 'Thunderstorm'
    case 15: return 'Thunderstorm'
    case 16: return 'Snow'
    case 17: return 'Snow'
    case 18: return 'Snow'
    case 19: return 'Snow'
    case 20: return 'Hail'
    case 21: return 'Hail'
    case 22: return 'Hail'
    case 23: return 'Hail'
    case 24: return 'Hail'
    case 25: return 'Showers'
    case 26: return 'Clear'
    case 27: return 'Light Cloud'
    case 28: return 'Light Cloud'
    case 29: return 'Light Cloud'
    case 30: return 'Light Cloud'
    case 31: return 'Light Cloud'
    case 32: return 'Light Rain'
    case 33: return 'Heavy Rain'
    case 34: return 'Light Rain'
    case 35: return 'Light Rain'
    case 36: return 'Light Rain'
    default: return 'Clear'
  }
}

export default function getTransformedData(data: any): Data {
  const rawCurrentDate = data.daily.data.shift();

  const currentWeather: Weather = {
    place: data.place,
    currentDate: new Date(rawCurrentDate.day),
    currentTemperature: rawCurrentDate.temperature,
    airPressure: rawCurrentDate.pressure,
    humidity: rawCurrentDate.humidity,
    windSpeed: rawCurrentDate.wind.speed,
    windDirectionCompass: rawCurrentDate.wind.dir,
    weatherStateName: mapIdToWeatherStateName(rawCurrentDate.icon),
    visibility: rawCurrentDate.visibility,
  };

  const forecasts: Forecast[] = data.daily.data.slice(0, 5).map((forecast: any) => ({
    date: new Date(forecast.day),
    minTemperature: forecast.temperature_min,
    maxTemperature: forecast.temperature_max,
    weatherStateName: mapIdToWeatherStateName(rawCurrentDate.icon),
  }));

  const transformedData: Data = {
    weather: currentWeather,
    forecasts,
  };

  return transformedData;
}
