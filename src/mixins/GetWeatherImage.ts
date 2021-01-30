/* eslint-disable global-require */
import { WeatherState } from '@/store/weather/types';
import { Vue } from 'vue-class-component';

type Map = {
  [state in WeatherState]: string;
};

export default class extends Vue {
  map: Map = {
    Clear: require('../assets/images/Clear.png'),
    Hail: require('../assets/images/Hail.png'),
    'Heavy Cloud': require('../assets/images/HeavyCloud.png'),
    'Heavy Rain': require('../assets/images/HeavyRain.png'),
    'Light Cloud': require('../assets/images/LightCloud.png'),
    'Light Rain': require('../assets/images/LightRain.png'),
    Showers: require('../assets/images/Shower.png'),
    Sleet: require('../assets/images/Sleet.png'),
    Snow: require('../assets/images/Snow.png'),
    Thunderstorm: require('../assets/images/Thunderstorm.png'),
  };

  getWeatherImage(weatherState: WeatherState): string {
    return this.map[weatherState];
  }
}
