import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },
        comentario: {
            type: String,
            required: true,
        },
        reviewComentada: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
            required: true,
        },
        data: {
            type: Date,
            default: Date.now,
        },
        quantidadeLikes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;
