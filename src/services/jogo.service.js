import JogoRepository from "../repositories/jogo.repository.js";
import igdbRequest from "./igdb.service.js";

async function buscarJogos(termoBusca) {
    const resultado = await igdbRequest(
        "games",
        `search "${termoBusca}"; fields name,cover.url,first_release_date,genres.name,total_rating,total_rating_count; where game_type = (0,8,9,10,11) & total_rating_count > 0; limit 50;`
    );
    return resultado;
}

async function getOuCriarJogo(idIGDB) {
    let jogo = JogoRepository.buscarPorIdIGDB(idIGDB);
    if (jogo) return jogo;

    const [dados] = await igdbRequest(
        "games",
        `fields name,summary,cover.url,first_release_date,genres.name,platforms.name; where id = ${idIGDB};`
    );

    jogo = await JogoRepository.criar({
        idIGDB: dados.id,
        titulo: dados.name,
        sinopse: dados.summary,
        capa: dados.cover?.url,
        dataLancamento: dados.first_release_date ? new Date(dados.first_release_date * 1000) : null,
        genero: dados.genre?.map((g) => g.name) || [],
        plataformas: dados.platforms?.map((p) => p.name) || [],
    });

    return jogo;
}

const JogoService = {
    buscarJogos,
    getOuCriarJogo,
};

export default JogoService;
