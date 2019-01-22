// lib/server.ts
import app from "./config/express";
import { PORT } from './config/config'

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})