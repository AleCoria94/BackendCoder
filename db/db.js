import mongoose from "mongoose"

export const connectedDB = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:XXXXX")
        console.log("Te conectaste a las base de datos")
    }catch(error){
        console.error(error)
    }
}