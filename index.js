// const {MongoClient}  = require('mongodb');
// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);
// const database = 'e-com';

// async function getData(){
//     const connect = await client.connect();
//     const db = connect.db(database);
//     const collection = db.collection('products');
//     const response = await collection.find({}).toArray();
//     console.log(response);
// }
// getData();

const mongodb = require('./mongodb');

// const data = async () => {
//     const db = await mongodb();
//     const response = await db.find({name: "Jeans"}).toArray();
//     console.log(response);
// }

const data = () =>{
    mongodb().then((res)=>{
        res.find({name: "Jeans"}).toArray().then((data)=>{
            console.log(data);
        });
    })
    // mongodb().then((res)=>{
    //     const response = res.find({name: "Jeans"});
    //     console.log(response);
    // })
}

data();