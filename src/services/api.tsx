import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR
//https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0

const api = axios.create({
    baseURL: 'http://200.169.68.106:9996/api/'
    // baseURL: 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
})

export default api;