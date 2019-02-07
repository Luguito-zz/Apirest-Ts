import {Request,Response,Router} from 'express';
import User from '../models/User';

class ApiUser{
    public router:Router;
    constructor(){
        this.router = Router();
        this.routes();
    }

    private async getUser(req:Request,res:Response):Promise<void>{
        try {
        const user = await User.find({state:true})
        res.status(200).json(user);

        } catch (error) {
            res.json(error)
        }
             
    }

    private async createUser(req:Request,res:Response):Promise<void>{
        let body = req.body;

        const newUser = await new User({
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
        });
        await newUser.save();
        res.status(200).json(newUser);
    }

    private async deleteUser(req:Request,res:Response):Promise<void>{
        let email = req.params.email
        let newState = req.body.state

        try{
        const deleteUser = await User.findOneAndUpdate({email:email}, {state:newState},{new:true});
        res.status(200).json(deleteUser);

        }catch(e){
            res.json(e)
        }
    }

    routes(){
        this.router.get('/api/user', this.getUser);
        this.router.post('/api/user', this.createUser);
        this.router.put('/api/user/:email', this.deleteUser);
    }
}

const apiUser = new ApiUser();
export default apiUser.router;