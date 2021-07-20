import { Sequelize } from 'sequelize';

import config from './common/config';
import ExitCode from './constants/exit-code';

const sequelize = new Sequelize(config.DB, config.DB_USER, config.DB_PASS, {
  host: config.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

(async (): Promise<void> => {
  try {
    await sequelize.authenticate();

    process.stdout.write('+ Database connection successful\n');
  } catch (error) {
    process.stderr.write('- Database connection failed\n');
    process.stderr.write(error);
    process.exit(ExitCode.UNCAUGHT_FATAL_EXCEPTION);
  }
})();

export default sequelize;
