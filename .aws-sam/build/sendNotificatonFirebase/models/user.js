//const mongoose =require('mongoose')
import { mongoose } from 'mongoose';

const UserSchema =mongoose.Schema(
    {
        user: String,
        token: String
    }, {
        timestamps: true
    });

const UserModel =mongoose.model('Device',UserSchema)

//module.exports =UserModel

export   {UserModel};