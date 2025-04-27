// "mongodb+srv://bonguchandu:Chandu123456@cluster0.su81k.mongodb.net"
import mongoose from "mongoose";


let cached = global.mongoose


if(!cached){
    cached = global.mongoose = {conn :null ,promise:null}


}

async function connectDB() {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const opts = {
            bufferCommands:false
        }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/new-cart`,opts).then(mongoose => {
            return mongoose
        })

        cached.conn = await cached.promise
        return cached.conn
    }
    
}
export default  connectDB