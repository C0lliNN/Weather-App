import { Unit } from '@/store/unit/types';
import { Options, Vue } from 'vue-class-component';
import { mapGetters } from 'vuex';

@Options({
  computed: {
    ...mapGetters(['unit']),
  },
})
export default class extends Vue {
  unit!: Unit;

  calculateTemperature(temperatureInFahrenheit: number): number {
    if (this.unit === 'F') {
      return temperatureInFahrenheit;
    }

    return (temperatureInFahrenheit - 32) * (5 / 9);
  }
}
