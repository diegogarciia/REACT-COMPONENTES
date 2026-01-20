import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { BarraBusqueda } from './BarraBusqueda'; 

describe('BarraBusqueda', () => {
  
  test('debe mostrar el placeholder por defecto', () => {
    render(<BarraBusqueda onQuery={() => {}} />);

    expect(screen.getByPlaceholderText('Buscar Pokémon...')).toBeDefined();
  });

  test('debe actualizar el valor del input al escribir', () => {
    render(<BarraBusqueda onQuery={() => {}} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Mew' } });
    
    expect(input.value).toBe('Mew');
  });

  test('debe llamar a onQuery y limpiar el campo al hacer clic en Buscar', () => {
    const onQueryMock = vi.fn();
    render(<BarraBusqueda onQuery={onQueryMock} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const boton = screen.getByRole('button', { name: /buscar/i });

    fireEvent.change(input, { target: { value: 'Pikachu' } });
    fireEvent.click(boton);

    expect(onQueryMock).toHaveBeenCalledWith('Pikachu');

    expect(input.value).toBe('');
  });

  test('debe llamar a onQuery al presionar la tecla Enter', () => {
    const onQueryMock = vi.fn();
    render(<BarraBusqueda onQuery={onQueryMock} />);
    
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Charizard' } });

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onQueryMock).toHaveBeenCalledWith('Charizard');
  });

  test('no debe llamar a onQuery si el input está vacío o solo tiene espacios', () => {
    const onQueryMock = vi.fn();
    render(<BarraBusqueda onQuery={onQueryMock} />);
    
    const boton = screen.getByRole('button', { name: /buscar/i });
    const input = screen.getByRole('textbox');

    fireEvent.click(boton);
    
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(boton);

    expect(onQueryMock).not.toHaveBeenCalled();
  });

});