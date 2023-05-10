const dbConnect = require('./mongodb');
const result = async () =>{
    let db = await dbConnect();
    const res = await db.updateMany(
       { name: "T-Shirt" },
       { $set: {name: "Pajama", size: "XXXXL"}} 
    )
    if(res.acknowledged){
        console.log("Updated");
    }
}
result();