import mongoose from "mongoose"
const connect = async()=>{
    try{
        
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connect")
    }
    catch(e){
        
    }
   
}
export default connect