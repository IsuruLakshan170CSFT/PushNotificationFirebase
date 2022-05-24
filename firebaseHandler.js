'use strict';
 
  import http from 'https';
  const authHeader ='key=AAAAHwhqxaw:APA91bGLH_ceCg20S-psBpysf974Yam1mGb0pGxEPIfX_Q_TgjihG4p_j513rD46CCAMzP9e0bemJFJMhKf3TDMwcsL-ws2PJySrf9RN8q9mm_ShzkcK3cBJsXx0A2LDT8BEvruUMs_j';
 
  const deviceToken = ' ["elUGSBp6r5knt61N5wojTV:APA91bHaVeBRQD-jMQvQ2cWcdfXLjyMdW4wSPPEwco3FWq2H5nNWgNN5-pneIAxc0d2Jz72RmheOyRfG0M0JWfi8jXvhGIRBKu9JKbqRkmm_EkTEYij5YB662Pw_MyzRmdrQzC7bS5ND" , "fV929kmJewV4rIOB-iwxf9:APA91bHlsM6Da2c2X1-v7bjZRPyiih0RHbq9It7P92n45lpoluNpXGUA7XTJrgZsyqI0S2wT_xbvLymyzcrC-CkINawxKf3AJ3ynutgDzqVo3tulhgcxMAJWJzQzeX6SDBCrJ53fl8p3"] ';

  async function  sendNotifications (event,context){
    return notifications ();
   
  };
  
  async function notifications (){

    console.log(deviceToken.length);
    console.log(deviceToken.length);

    return new Promise((resolve, reject) => {
      const options = {
          host: "fcm.googleapis.com",
          path: "/fcm/send",
          method: 'POST',
          headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json'
          }
      };
      
      const req = http.request(options, (res) => {
         resolve('success');
        console.log("resolve test");
      });
      
      req.on('error', (e) => {
          reject(e.message);
      });
      
    
      const reqBody = '{"registration_ids": '+ deviceToken +' , "priority": "high", "notification": {"title": " title ", "body": " body "}}';
      
      req.write(reqBody);
      console.log(reqBody);
      req.end();
   });

  }

  export  {sendNotifications,notifications};