import { pokemonApi } from '../api/pokemon.api';
import type { Pokemon } from '../interfaces/pokemon.interface';

export const obtener151Pokemon = async (): Promise<Pokemon[]> => {
    
    const respuesta = await pokemonApi.get('/pokemon?limit=151');
    const listaBasica = respuesta.data.results;

    const promesas = listaBasica.map(async (p: any) => {
        const detalleResp = await fetch(p.url); 
        const datos = await detalleResp.json();

        return {
            id: datos.id,
            nombre: datos.name,
            tipo: datos.types.map((t: any) => t.type.name),
            habilidad: datos.abilities.map((a: any) => a.ability.name),
            sprites: {
                front: datos.sprites.front_default,
            },
        };
    });

    return Promise.all(promesas);
};