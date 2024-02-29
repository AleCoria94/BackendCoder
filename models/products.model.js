
import { Schema, model} from "mongoose";

const productsSchema = new Schema({
    title: {
        type: String, 
        required:true
    },
    description: {
        type: String, 
        required:true
    }/*,
    price: {
        type: Number, 
        required:true
    },
    thumbnail: {
        type: String, 
    },
    code: {
        type: Number, 
        required:true
    },
    stock: {
        type: Number, 
        required:true
    },
},
    {
    timestamps:true
    
    */})

export default model("Products",productsSchema)