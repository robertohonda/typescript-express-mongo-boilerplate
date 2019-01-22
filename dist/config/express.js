"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
class Express {
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new Express().app;
//# sourceMappingURL=express.js.map