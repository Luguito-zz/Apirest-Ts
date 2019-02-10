"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUser {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            const user = yield User_1.default.findOne({ email: body.email });
            if (typeof user !== 'undefined') {
                if (!bcrypt_1.default.compareSync(body.password, user.password)) {
                    res.json('Fallo');
                }
                ;
                let token = jsonwebtoken_1.default.sign({
                    user,
                }, 'seed', { expiresIn: 60 * 60 });
                res.json('Login successfully');
            }
        });
    }
    routes() {
        this.router.post('/api/login', this.userLogin);
    }
}
const apiLogin = new LoginUser();
exports.default = apiLogin.router;
