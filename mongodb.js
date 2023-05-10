const {MongoClient}  = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const database = 'e-com';

async function getData(){
    const connect = await client.connect();
    const db = connect.db(database);
    return db.collection('products');
}
module.exports = getData;