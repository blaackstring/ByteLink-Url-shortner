
import mongoose from "mongoose";


export default async function DbConnection() {
    try {
        console.log(process.env.MONGODB_URI);
        
        await mongoose.connect(`${process.env.MONGODB_URI}`)
    } catch (error) {
        console.log('Db connection failed',error);
        process.exit(1);
    }
}