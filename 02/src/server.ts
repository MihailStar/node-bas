import config from './common/config';
import createApp from './app';

const { PORT } = config;

const app = createApp();

app.listen(PORT, () => {
  process.stdout.write(`http://localhost:${PORT}\n`);
});
