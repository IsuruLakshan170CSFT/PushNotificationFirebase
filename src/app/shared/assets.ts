
  export interface User { 
    id: any; 
    user?: String;  
    token: String;
    deviceType:String;
}


export interface UserToken { 
  token: String;
}

export interface UserModel { 
  user:String,
  device:[
    deviceId:String,
    deviceName:String,
    deviceToken:String
  ]

  
}




