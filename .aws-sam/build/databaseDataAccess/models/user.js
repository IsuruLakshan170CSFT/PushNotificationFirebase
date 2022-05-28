import { mongoose } from 'mongoose';

const UserSchema =mongoose.Schema(
    {
        user: String,
        token: String,
        deviceType:String
    }, {
        timestamps: true
    });

const UserModel =mongoose.model('Device',UserSchema)

export   {UserModel};