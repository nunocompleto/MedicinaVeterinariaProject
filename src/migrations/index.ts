import * as migration_20260507_145924 from './20260507_145924';
import * as migration_20260507_151950 from './20260507_151950';
import * as migration_20260512_112832 from './20260512_112832';
import * as migration_20260610_093252 from './20260610_093252';

export const migrations = [
  {
    up: migration_20260507_145924.up,
    down: migration_20260507_145924.down,
    name: '20260507_145924',
  },
  {
    up: migration_20260507_151950.up,
    down: migration_20260507_151950.down,
    name: '20260507_151950',
  },
  {
    up: migration_20260512_112832.up,
    down: migration_20260512_112832.down,
    name: '20260512_112832',
  },
  {
    up: migration_20260610_093252.up,
    down: migration_20260610_093252.down,
    name: '20260610_093252'
  },
];
