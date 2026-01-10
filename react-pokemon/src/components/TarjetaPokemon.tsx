import { type Pokemon } from '../interfaces/pokemon.interface';

interface Props {
  pokemon: Pokemon;
}

export const TarjetaPokemon = ({ pokemon }: Props) => {
  return (
    <div className="pokemon-carta">
      <img src={pokemon.sprites.front} alt={pokemon.nombre} />
      
      <h3>#{pokemon.id} - {pokemon.nombre}</h3>

      <div className="tipos-container">
        <strong>Tipos:</strong>
        {pokemon.tipo.map((nombreTipo) => (
          <span key={nombreTipo} className={`etiqueta type-${nombreTipo}`}>
            {nombreTipo}
          </span>
        ))}
      </div>

      <div className="habilidades-container">
        <strong>Habilidades:</strong>
        <ul>
          {pokemon.habilidad.map((nombreHabilidad) => (
            <li key={nombreHabilidad}>
              {nombreHabilidad}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};