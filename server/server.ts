import express, {Response,Request,NextFunction} from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import apiUser from './routes/apiUser';

class Server{
    public app:express.Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    config(){
        //DB Routes
        const DbMlab = 'mongodb://luguito:a123456@ds125385.mlab.com:25385/apirest-ts';
        const DbLocal = 'mongodb://localhost/ApiRest-ts'

        //Mongoose Config
        mongoose.connect(DbMlab,
        {useNewUrlParser:true, useCreateIndex:true},()=>{
            console.log('Servidor Mongo online')
        })

        //Cors Config
        this.app.use((req:Request, res:Response, next:NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        
            next();
        });
        
        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json())
        
        //Set config
        this.app.set('port', process.env.PORT || 3000);
    }

    routes(){
        this.app.use(apiUser)
    }

    start(){   
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server Online')
        })

    }
}

const server = new Server();
server.start();