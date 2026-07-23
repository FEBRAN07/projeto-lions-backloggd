import mongoose from "mongoose";

const jogoSchema = new mongoose.Schema(
    {
        idIGDB: {
            type: Number,
            unique: true,
            index: true,
        },

        titulo: {
            type: String,
            required: true,
        },

        estudio: {
            type: String,
            required: true,
        },

        dataLancamento: {
            type: String,
            required: true,
        },

        notaMedia: {
            type: Number,
            default: 0,
        },

        plataformas: {
            type: [String],
            required: true,
        },

        genero: {
            type: [String],
            required: true,
        },

        sinopse: {
            type: String,
            required: true,
        },

        capa: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Jogo = mongoose.model("Jogo", jogoSchema);
export default Jogo;
