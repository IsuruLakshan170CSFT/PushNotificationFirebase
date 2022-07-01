import { mongoose } from 'mongoose';

const UserSchema =mongoose.Schema(
    {
        title: String,
        body: String,
        
    }, {
        timestamps: true
    });

const NotificationModel =mongoose.model('Notification',UserSchema)

export   {NotificationModel};