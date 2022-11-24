
import app from "./app";

import db from "./services/db"

const PORT = process.env.PORT || 5000;

// make sure DB is ready to go and serve app
const start = async () => {
  try {
    await db.sync();
    app.listen(PORT, () => console.log(
      `Serving SERN Demo backend on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();