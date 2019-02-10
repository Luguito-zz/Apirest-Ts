"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let verifyToken = (req, res, next) => {
    const headerAuth = req.headers['authorization'];
    if (typeof headerAuth !== 'undefined') {
        const headerToken = headerAuth.split(' ');
        const finalToken = headerToken[1];
        const token = finalToken;
        jsonwebtoken_1.default.verify(token, 'seed', (err, decoded) => {
            if (err) {
                res.status(400).json({ err: { messague: 'Introduce un token valido' } });
            }
            next();
        });
    }
};
exports.default = verifyToken;
