const {MongoClient }=require('mongodb');
const User = require('./testmodule');



 async function main(){
    const uri="mongodb+srv://StDB:lrJKqTsc8nNSgoIP@cluster0.izid3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try{
        await client.connect();
        await getAllDevice(client);

    }
    catch(e){
        console.error(e);
    } finally{
        await client.close();
    }
}
main().catch(console.error);

async function getAllDevice(client) {
    const cursor = client.db("mongoDb").collection("nodejsDb").find({})
    .sort({ last_review: -1 })  ;
    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`List is `);
        results.forEach((result, i) => {
            console.log();         
            console.log(`${i + 1}. _id: ${result._id}`);
            console.log(` name: ${result.name}`);
            console.log(`   age: ${result.age}`);
                   });
    } else {
        console.log(`no list`);
    }
}

module.exports = main;

/*



//get list of users
async function getAllUsers(client){
    const result =await client.db("mongoDb").collection("nodejsDb").find({});

    if(result){
        console.log(`Founda listing in the collection with the name `);
        console.log(result);
    }
    else{
        console.log(`No listings found with the name '`);
    }
   
}




async function deleteLisingByName(client,nameOfListing){
    const result =await client.db("mongoDb").collection("nodejsDb")
    .deleteOne({name:nameOfListing});
    console.log( `${result.deletedCount} document(s) was / were deleted `);

}

async function upsertListingByName(client,nameOfListing,updatedListing){
    const result =await client.db("mongoDb").collection("nodejsDb").updateOne({name:nameOfListing},{$set:updatedListing},{upsert:true});

}

async  function updateListingByName(client,nameOfListing,updatedListing){
    const result =await client.db("mongoDb").collection("nodejsDb").updateOne({name:nameOfListing},{$set:updatedListing});

    console.log( `${result.matchedCount} document(s) matched the querycriteria `);

    console.log( `${result.modifiedCount} documents was/were updated `);

}

async function findOneListingByName(client,nameOfListing){
    const result =await client.db("mongoDb").collection("nodejsDb").findOne({name:nameOfListing});

    if(result){
        console.log(`Founda listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    }
    else{
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
   
}



async function createMultipleListings(client,newListings){
    const result =  await  client.db("mongoDb").collection("nodejsDb").insertMany(newListings);
   
    console.log(`${result.insertedCount} new listings created with the following id(s):`);
    console.log(result.insertedIds);
}

//insert one
async function createListing(client,newListing){
 const result =  await  client.db("mongoDb").collection("nodejsDb").insertOne(newListing);
  
 console.log(`New listing created with the following id: ${result.insertedId}`);

}

async function listDatabases (client){
    const databasesList =await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db =>{
        console.log(`-${db.name}`);
    })
}


module.exports = main;

*/