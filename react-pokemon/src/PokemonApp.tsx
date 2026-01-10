import { useEffect, useState } from 'react';
import { obtener151Pokemon } from './actions/obtener.pokemon.action';
import { type Pokemon } from './interfaces/pokemon.interface';
import { TarjetaPokemon } from './components/TarjetaPokemon';

export const PokemonApp = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtener151Pokemon()
      .then(lista => {
        setPokemons(lista);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando los 151 originales...</p>;

  return (
    <div className="titulo">
      <h1>Pokédex - Primera Generación</h1>
      <hr />

      <div className="pokemon-grid">
        {pokemons.map((p) => (
          <TarjetaPokemon key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
};