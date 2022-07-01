import { mongoose } from 'mongoose';

const NotificationSchema =mongoose.Schema(
    {
        title: String,
        body: String,
        
    }, {
        timestamps: true
    });

const Notification=mongoose.model('Notification',NotificationSchema)

export   {Notification};