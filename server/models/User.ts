import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    name:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    state:{type:Boolean, default:true},
    role:{type:String, default:'USER', enum:{values:['ADMIN','USER']}},
    date: Date
});

export default model('User', userSchema);