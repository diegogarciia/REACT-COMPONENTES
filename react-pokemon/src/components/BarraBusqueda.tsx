import {useState, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  onQuery: (termino: string) => void;
}

export const BarraBusqueda = ({ placeholder = "Buscar Pokémon...", onQuery }: Props) => {
  const [valor, setValor] = useState('');

  const manejarBusqueda = () => {
    if (valor.trim().length === 0) return;
    onQuery(valor);
    setValor("");
  };

  const manejarTeclaPresionada = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      manejarBusqueda();
    }
  };

  return (
    <div className="buscador-pokemon">
      <input
        type="text"
        placeholder={placeholder}
        value={valor}
        onChange={(event) => setValor(event.target.value)}
        onKeyDown={manejarTeclaPresionada}
      />
      <button onClick={manejarBusqueda}>Buscar</button>
    </div>
  );
};