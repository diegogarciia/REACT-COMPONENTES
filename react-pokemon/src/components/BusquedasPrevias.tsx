import type { FC } from "react";

interface Props {
  historial: string[];
  alSeleccionar: (termino: string) => void;
}

export const BusquedasPrevias: FC<Props> = ({ historial, alSeleccionar }) => {
  return (
    <div className="busquedas-previas">
      <h3>Búsquedas Recientes</h3>
      <ul className="busquedas-previas-lista">
        {historial.map((termino) => (
          <li key={termino} onClick={() => alSeleccionar(termino)}>
            {termino}
          </li>
        ))}
      </ul>
    </div>
  );
};