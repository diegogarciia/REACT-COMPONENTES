import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BusquedasPrevias } from './BusquedasPrevias';

describe('BusquedasPrevias', () => {
  const historialSimulado = ['Pikachu', 'Bulbasaur', 'Mew'];

  test('debe renderizar el título y todos los elementos del historial', () => {
    render(<BusquedasPrevias historial={historialSimulado} alSeleccionar={() => {}} />);

    expect(screen.getByText(/Búsquedas Recientes/i)).toBeDefined();

    historialSimulado.forEach((termino) => {
      expect(screen.getByText(termino)).toBeDefined();
    });
  });

  test('debe llamar a alSeleccionar con el término correcto cuando se hace clic', () => {

    const alSeleccionarMock = vi.fn();
    
    render(
      <BusquedasPrevias 
        historial={historialSimulado} 
        alSeleccionar={alSeleccionarMock} 
      />
    );

    const pokemonElemento = screen.getByText('Pikachu');
    
    fireEvent.click(pokemonElemento);

    expect(alSeleccionarMock).toHaveBeenCalledWith('Pikachu');
  });

  test('no debe renderizar elementos de lista si el historial está vacío', () => {
    render(<BusquedasPrevias historial={[]} alSeleccionar={() => {}} />);
    
    const listaItems = screen.queryAllByRole('listitem');
    
    expect(listaItems.length).toBe(0);
  });
});