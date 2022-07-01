import { mongoose } from 'mongoose';

const MessageSchema =  mongoose.Schema({

  deviceId:String,
  deviceName:String,
  deviceToken:String

})

const UserSchema =  mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  device:[MessageSchema]
});

const User = mongoose.model("User", UserSchema);

export   {User};