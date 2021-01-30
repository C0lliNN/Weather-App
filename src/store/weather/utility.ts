/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data, Weather, Forecast } from './types';

export default function getTransformedData(data: any): Data {
  const rawWeatherData = data.consolidated_weather.shift();

  const currentWeather: Weather = {
    locationId: data.woeid,
    locationName: data.title,
    currentDate: data.created,
    currentTemperature: rawWeatherData.the_temp,
    airPressure: rawWeatherData.air_pressure,
    humidity: rawWeatherData.humidity,
    windSpeed: rawWeatherData.wind_speed,
    windDirectionCompass: rawWeatherData.wind_direction_compass,
    weatherStateName: rawWeatherData.weather_state_name,
  };

  const forecasts: Forecast[] = data.consolidated_weather.map(
    (consolidatedWeather: any) => ({
      date: new Date(consolidatedWeather.created),
      minTemperature: consolidatedWeather.min_temp,
      maxTemperature: consolidatedWeather.max_temp,
      weatherStateName: consolidatedWeather.weather_state_name,
    }),
  );

  const transformedData: Data = {
    weather: currentWeather,
    forecasts,
  };

  return transformedData;
}
