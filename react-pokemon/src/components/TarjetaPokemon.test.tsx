import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { TarjetaPokemon } from './TarjetaPokemon';
import { type Pokemon } from '../interfaces/pokemon.interface';

describe('TarjetaPokemon', () => {

  const pokemonMock: Pokemon = {
    id: 25,
    nombre: 'Pikachu',
    sprites: { front: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
    tipo: ['electric'],
    habilidad: ['static', 'lightning-rod']
  };

  test('debe mostrar el nombre y el ID con el formato correcto', () => {
    render(<TarjetaPokemon pokemon={pokemonMock} />);
    
    const infoBasica = screen.getByText('#25 - Pikachu');
    expect(infoBasica).toBeDefined();
  });

  test('debe configurar correctamente los atributos de la imagen', () => {
    render(<TarjetaPokemon pokemon={pokemonMock} />);
    
    const imagen = screen.getByRole('img') as HTMLImageElement;
    
    expect(imagen.src).toBe(pokemonMock.sprites.front);
    expect(imagen.alt).toBe(pokemonMock.nombre);
  });

  test('debe renderizar todos los tipos como etiquetas', () => {
    render(<TarjetaPokemon pokemon={pokemonMock} />);
    
    pokemonMock.tipo.forEach(tipo => {
      const etiquetaTipo = screen.getByText(tipo);
      expect(etiquetaTipo).toBeDefined();

      expect(etiquetaTipo.className).toContain(`type-${tipo}`);
    });
  });

  test('debe listar todas las habilidades en la lista desordenada', () => {
    render(<TarjetaPokemon pokemon={pokemonMock} />);
    
    pokemonMock.habilidad.forEach(hab => {
      expect(screen.getByText(hab)).toBeDefined();
    });

    const itemsLista = screen.getAllByRole('listitem');
    expect(itemsLista.length).toBe(pokemonMock.habilidad.length);
  });
});