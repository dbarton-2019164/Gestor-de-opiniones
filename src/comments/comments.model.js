import mongoose, { Schema } from "mongoose";

const CommentsSchema = mongoose.Schema({
    comment :{
        type: String,
        required : [true, "The text is required"]
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    condition: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model("Comments", CommentsSchema);