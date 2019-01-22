"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/server.ts
const express_1 = require("./config/express");
const PORT = 3000;
express_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
//# sourceMappingURL=index.js.map