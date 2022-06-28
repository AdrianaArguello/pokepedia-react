import axios from "axios";

export async function getPokemons(offset) {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
        const data = res.data.results;
        for(let i of data){
            const details = await getPokemonDetail(i.url);
            // console.log(details.data)
            i.newData = details.data;
        }
        return data;
    }
    catch(err){
        return err.response;
    }
};


export async function getPokemonDetail(url){
    try {
        const res = await axios.get(url);
        return res;
    }
    catch(err){
        return err.response;
    }
}

export async function gender(id) {
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/gender/${id}/`);
        return res;
    }
    catch(err){
        return err.response;
    }
}
