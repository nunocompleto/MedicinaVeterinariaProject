import * as migration_20260507_145924 from './20260507_145924';
import * as migration_20260507_151950 from './20260507_151950';

export const migrations = [
  {
    up: migration_20260507_145924.up,
    down: migration_20260507_145924.down,
    name: '20260507_145924',
  },
  {
    up: migration_20260507_151950.up,
    down: migration_20260507_151950.down,
    name: '20260507_151950'
  },
];
