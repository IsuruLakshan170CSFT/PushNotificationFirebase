
import { MongoClient } from 'mongodb';


// Connection URI
const uri =
"mongodb+srv://StDB:lrJKqTsc8nNSgoIP@cluster0.izid3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
try {
  // Connect the client to the server
  await client.connect();
  // Establish and verify connection
  await client.db("myFirstDatabase").command({ ping: 1 });
  console.log("Connected successfully to server");
 // console.log(client)
  return client
} finally {
  // Ensures that the client will close when you finish/error
  await client.close();
}
}

run().catch(console.error);

async function findOneListingByName(clients,nameOfListing) {
  
  const result = await clients.db("myFirstDatabase").collection("users").find({}).toArray();
  if (result) {
      console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
      console.log(result[0]);
  } else {
      console.log(`No listings found with the name '${nameOfListing}'`);
  }
}

findOneListingByName(client,"");

//   async function createListing(client, newListing){
//     const result = await client.db("myFirstDatabase").collection("users").insertOne(newListing);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
//   }
