/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data, Weather, Forecast } from './types';

export default function getTransformedData(data: any): Data {
  const rawWeatherData = data.consolidated_weather.shift();

  const currentWeather: Weather = {
    locationId: data.woeid,
    locationName: data.title,
    currentDate: new Date(`${rawWeatherData.applicable_date} 00:00:00`),
    currentTemperature: rawWeatherData.the_temp,
    airPressure: rawWeatherData.air_pressure,
    humidity: rawWeatherData.humidity,
    windSpeed: rawWeatherData.wind_speed,
    windDirectionCompass: rawWeatherData.wind_direction_compass,
    weatherStateName: rawWeatherData.weather_state_name,
    visibility: rawWeatherData.visibility,
  };

  const forecasts: Forecast[] = data.consolidated_weather.map(
    (consolidatedWeather: any) => ({
      date: new Date(`${consolidatedWeather.applicable_date} 00:00:00`),
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
