import { PORT } from "./config/config";
import app from "./config/express";

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Express server listening on port ${PORT}`);
});
