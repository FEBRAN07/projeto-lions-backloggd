import Jogo from "../models/jogo.model.js";

async function criar(dados) {
    return await Jogo.create(dados);
}

async function buscarPorIdIGDB(idIGDB) {
    return await Jogo.findOne({ idIGDB: idIGDB });
}

async function buscarPorIdNosso(id) {
    return await Jogo.findById(id);
}

const JogoRepository = {
    criar,
    buscarPorIdIGDB,
    buscarPorIdNosso,
};

export default JogoRepository;
