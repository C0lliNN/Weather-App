import { Unit } from '@/store/unit/types';

export default function calculateTemperature(
  temperatureInCelsius: number,
  unit: Unit,
): number {
  if (unit === 'C') {
    return temperatureInCelsius;
  }
  return (temperatureInCelsius * 9) / 5 + 32;
}
