export interface UserModel { 
    user:string,
    devices:Array<Device>
  }

export interface Receiver{ 
    user:String,
}

export interface Notifications{
  _id:string,
  title:string,
  body:string,
  sendBy:string,
  sendFor:[sendFor:string],
  time:Date;
}


export interface Device{
  deviceId:string,
  deviceName:string,
  deviceToken:string
}
export interface DeviceLazyLoad{
  rows:number,
  first:number,
  sortField:string,
  sortOrder:number,
  filterUser:string,
  filterDeviceName:string
}
