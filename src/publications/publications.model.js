import mongoose, { Schema } from "mongoose";

const PublicationsSchema = new mongoose.Schema({
    title: {

        type: String,
        required: [true, "The title is required"]
    },
    category: {

        type: String,
        required: [true, "The category is required"]
    },
    text: {
        type: String,
        required: [true, "The message is required"]
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comentarios: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref : "Comments"
            }
        ]
    },
    condition: {
        type: Boolean,
        default: true
    }
});


PublicationsSchema.methods.addCommentById = async function(commentId) {
    this.comentarios.push(commentId);
    await this.save();
};


PublicationsSchema.methods.toJSON = function (){
    const { __v, _id, ...resto} = this.toObject();
    resto.uid = _id;
    return resto;
};
export default mongoose.model("Publications", PublicationsSchema)