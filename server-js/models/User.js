"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    state: { type: Boolean, default: true },
    role: { type: String, default: 'USER', enum: { values: ['ADMIN', 'USER'] } },
    date: Date
});
exports.default = mongoose_1.model('User', userSchema);
