
import  {dbConnection}  from './dbConnect.js';

const client = dbConnection;

async function findOneListingByName(client){
    const result = await client.db("myFirstDatabase").collection("users").find({}).toArray();
    console.log(result[0].user);
}
findOneListingByName(client);


// async function findOneListingByName(client) {
//     const result = await client.db("myFirstDatabase").collection("users").find({}).toArray();
//     if (result) {
//         console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
//         console.log(result[0].user);
//     } else {
//         console.log(`No listings found with the name '${nameOfListing}'`);
//     }
//  }
  
//  findOneListingByName(client);

//   async function createListing(client, newListing){
//     const result = await client.db("myFirstDatabase").collection("users").insertOne(newListing);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
//   }
  