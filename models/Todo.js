import mongoose from "mongoose";
const {Schema} = mongoose;

const TodoSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    desc:{
        type: String,
        required:true
    },
    isDone:{
        type: Boolean,
        default:false,
    },
})

export default mongoose.model("Todo",TodoSchema)