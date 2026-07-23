import JogoService from "../services/jogo.service.js";

async function buscar(req, res) {
    try {
        const resultado = await JogoService.buscarJogos(req.query.q);
        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error.response?.data || err.message);
        return res.status(502).json({ error: "Falha ao buscar jogos" });
    }
}

async function getJogo(req, res) {
    try {
        const jogo = await JogoService.getOuCriarJogo(req.params.idIGDB);
        return res.status(200).json(jogo);
    } catch (error) {
        return res.status(502).json({ error: "Falha ao buscar ou criar jogo" });
    }
}

const JogoController = {
    buscar,
    getJogo,
};

export default JogoController;
