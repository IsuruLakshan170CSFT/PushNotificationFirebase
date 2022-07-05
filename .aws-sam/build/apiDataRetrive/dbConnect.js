
import { MongoClient } from 'mongodb';
import { switchFunction } from './apiHandler.js'
import {uri,dbName } from './config.js';

 async function run(functionName,req,res) {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      await client.db(dbName).command({ ping: 1 });
      console.log("Connected successfully to server");
      const response = await switchFunction(client,functionName,req,res);
      return response
    } finally {
      await client.close();
    }
 }

 export {run}