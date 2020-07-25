"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    jwt: { type: String, require: true, unique: true },
    payload: { type: Object }
});
var Tokes = mongoose_1.model('token', schema);
exports.default = Tokes;
