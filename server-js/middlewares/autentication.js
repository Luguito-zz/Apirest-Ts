"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let verifyToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (typeof headerToken !== 'undefined') {
        const token = headerToken.split(' ');
        const finalToken = token[1];
        const tokens = finalToken;
        jsonwebtoken_1.default.verify(tokens, 'seed', (err, decoded) => {
            if (err) {
                res.status(400).json({ err: { messague: 'Introduce un token valido' } });
            }
            next();
        });
    }
    else {
        res.json('Introuce el token');
    }
};
exports.default = verifyToken;
