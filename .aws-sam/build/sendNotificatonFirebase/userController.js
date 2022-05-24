import {DBContext} from './DBContext.js';

const getDb =new DBContext()


//get all data
 async function getUsers(){
   const users=[];
    const dt= await getDb.connectToDb("myFirstDatabase");
    const data =await dt.collection("devices").find({})
          .sort({ last_review: -1 })  ;
          const results = await data.toArray();
          return results;
       
         
     getDb.connectionClose();
  }
 
 // getUsers();
 export   {getUserOne};
  
  
  
//get user one
 async function getUserOne(){
    const client="sadaru";
    const dt= await getDb.connectToDb("myFirstDatabase");
    const data =await dt.collection("devices").findOne({user:client});

    if(data){
        console.log(`User Details`);
        const userDetails="user : "+ data.user +", token :" +data.token;
        getDb.connectionClose();
        return userDetails;
       
    }
    else{
        console.log(`No listings found with the name '${client}'`);
        getDb.connectionClose();
        return data;
    }


}
  
  
//getUserOne("kasun");

 //insert one
async function addOne(newListing){
    const dt= await getDb.connectToDb("mongoDb");
    const data =await dt.collection("nodejsDb").insertOne(newListing);
     
    console.log(`Add new user by id: ${data.insertedId}`);
    getDb.connectionClose();
   }
   

 //addOne( { name: "gihan",   age: 82 });
  