// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_powerful_red_skull.sql';
import m0001 from './0001_warm_marvel_boy.sql';
import m0002 from './0002_silly_white_tiger.sql';
import m0003 from './0003_certain_marauders.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003
    }
  }
  