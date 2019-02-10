import { Request, Response, Router } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

class LoginUser {
    public router: Router
    constructor() {
        this.router = Router();
        this.routes();
    }

    private async userLogin(req: Request, res: Response) {
        let body = req.body
        const user = await User.findOne({email:body.email});
        if(typeof user !== 'undefined'){
            if(!bcrypt.compareSync(body.password, user!.password)){
                res.json('Fallo')
            };

            let token = JWT.sign({
            user,   
            }, 'seed',{expiresIn: 60 * 60})

           res.json('Login successfully')
        }
    }

    routes() {
        this.router.post('/api/login', this.userLogin);
    }

}

const apiLogin = new LoginUser();
export default apiLogin.router;