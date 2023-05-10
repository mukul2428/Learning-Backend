const db = require('./mongodb');
const response = async ()=>{
    const database = await db();
    const result = await database.insertOne({name: "T-Shirt", price: "200", size:"L"});
    if(result.acknowledged){
        console.log("Inserted");
    }
    const resultMany = await database.insertMany([
        {name: "T-Shirt", price: "200", size:"L"},
        {name: "Trouser", price: "800", size:"L"},
        {name: "Kurta", price: "9200", size:"L"}
    ]);
    if(resultMany.acknowledged){
        console.log("Inserted");
    }
}
response();