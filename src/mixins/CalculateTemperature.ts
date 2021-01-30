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

  calculateTemperature(temperatureInCelsius: number): number {
    if (this.unit === 'C') {
      return temperatureInCelsius;
    }
    return (temperatureInCelsius * 9) / 5 + 32;
  }
}
