import '@core/utils/env';
import app from './app';

app.listen(process.env.PORT || 80, () => {
  console.info(`Server listening on port ${process.env.PORT}`);
});
