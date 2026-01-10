import type { Pokemon } from '../interfaces/pokemon.interface';
import { pokemonApi } from '../api/pokemon.api'; 

export const obtenerPokemonPorNombre = async (nombre: string): Promise<Pokemon> => {
    
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
    const datos = await respuesta.json();

    return {
        id: datos.id,
        nombre: datos.name,
        tipo: datos.types.map((t: any) => t.type.name),
        habilidad: datos.abilities.map((a: any) => a.ability.name),
        sprites: {
            front: datos.sprites.front_default,
        },
    };
};