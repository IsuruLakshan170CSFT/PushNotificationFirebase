import { MongoClient } from 'mongodb';
import { DBUrl } from './config.js';

export  class DBContext{

    constructor(){     
         this.client=new MongoClient(DBUrl,{
            useUnifiedTopology:true,
        });
    }
    
    async  connectToDb(dbName){
      try{
        await this.client.connect();
        console.log("Connection established !");
        const db = this.client.db(dbName);
        return db ;
    }
    catch(e){
        console.error(e);
        }
    }

    async connectionClose(){
      console.log("Connection closed !");
      await this.client.close();
    }

}


