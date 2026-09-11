import app from './app.js';
import { env } from './config/environment.js';
import { connectDatabase } from './config/database.js';

const PORT = env.PORT || 5000;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`The Dead Man's Cipher API running on port ${PORT}`);
  });
});

