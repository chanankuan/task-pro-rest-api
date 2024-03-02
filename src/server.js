import mongoose from 'mongoose';
import config from './dotenvConfig.js';
import { app } from './app.js';

const { MONGO_CONNECT, PORT = 3030 } = config;

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_CONNECT)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful, ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
