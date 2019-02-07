"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiUser_1 = __importDefault(require("./routes/apiUser"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //DB Routes
        const DbMlab = 'mongodb://luguito:a123456@ds125385.mlab.com:25385/apirest-ts';
        const DbLocal = 'mongodb://localhost/ApiRest-ts';
        //Mongoose Config
        mongoose_1.default.connect(DbMlab, { useNewUrlParser: true, useCreateIndex: true }, () => {
            console.log('Servidor Mongo online');
        });
        //Cors Config
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
            next();
        });
        //Middlewares
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        //Set config
        this.app.set('port', process.env.PORT || 3000);
    }
    routes() {
        this.app.use(apiUser_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server Online');
        });
    }
}
const server = new Server();
server.start();
