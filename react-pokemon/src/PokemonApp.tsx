import { useEffect, useState } from 'react';
import { obtener151Pokemon } from './actions/obtener.pokemon.action';
import { type Pokemon } from './interfaces/pokemon.interface';
import { TarjetaPokemon } from './components/TarjetaPokemon';
import { BarraBusqueda } from './components/BarraBusqueda';
import { BusquedasPrevias } from './components/BusquedasPrevias';

export const PokemonApp = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cargando, setCargando] = useState(true);
  const [historial, setHistorial] = useState<string[]>([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    obtener151Pokemon()
      .then(lista => {
        setPokemons(lista);
        setCargando(false);
      });
  }, []);

  const manejarNuevaBusqueda = (nombre: string) => {
    const nombreLimpio = nombre.toLowerCase().trim();
    if (nombreLimpio.length === 0) return;

    setTerminoBusqueda(nombreLimpio);

    setHistorial(prev => {
      const nuevo = [nombreLimpio, ...prev.filter(item => item !== nombreLimpio)];
      return nuevo.slice(0, 5);
    });
  };

  const pokemonsFiltrados = pokemons.filter(p => 
    p.nombre.toLowerCase().includes(terminoBusqueda)
  );

  if (cargando) return <p className="cargando">Cargando Pokédex...</p>;

  return (
    <div className="pokedex-container">
      <div className="titulo">
        <h1>Pokédex - Primera Generación</h1>
        <hr />
      </div>

      <BarraBusqueda onQuery={manejarNuevaBusqueda} />

      <BusquedasPrevias 
        historial={historial} 
        alSeleccionar={(termino) => setTerminoBusqueda(termino)} 
      />

      <div className="pokemon-grid">
        {pokemonsFiltrados.map((p) => (
          <TarjetaPokemon key={p.id} pokemon={p} />
        ))}
      </div>

      {pokemonsFiltrados.length === 0 && (
        <p className="no-results">No se encontró ningún Pokémon con "{terminoBusqueda}"</p>
      )}
    </div>
  );
};