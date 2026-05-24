import { Bus, CarFront, Footprints, TrainFront, Van } from 'lucide-react-native';

export const transportModes = {
  bus: { label: 'City bus', icon: Bus },
  minibus: { label: 'Minibus', icon: Van },
  taxi: { label: 'Taxi', icon: CarFront },
  walking: { label: 'Walk', icon: Footprints },
  rail: { label: 'Rail ready', icon: TrainFront }
} as const;
