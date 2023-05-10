const dbConnect = require('./mongodb');
const result = async () =>{
    const db = await dbConnect();
    const result = await db.deleteOne({name: "Trouser"},{name: "T-Shirt"});
    if(result.acknowledged){
        console.log("Deleted")
    }
}
result();