import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 05 - Teste o componente <Pokedex.js />', () => {
  test('1 - Se a página contém um heading h2 com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    const hasH2Text = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });

    expect(hasH2Text).toBeInTheDocument();
  });

  test('2 - Se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const nextButtonPokemon = screen.getByText(/Próximo Pokémon/i);
    userEvent.click(nextButtonPokemon);

    expect(nextButtonPokemon).toBeInTheDocument();
  });

  test('3 - Se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    // All pokemons from data
    const allPokemons = [
      /pikachu/i,
      /charmander/i,
      /caterpie/i,
      /ekans/i,
      /alakazam/i,
      /mew/i,
      /rapidash/i,
      /snorlax/i,
      /dragonair/i,
    ];

    // Check Next Pokémon function
    const checkNextButtonPokemon = () => {
      const nextButtonPokemon = screen.getByText(/Próximo Pokémon/i);
      userEvent.click(nextButtonPokemon);
    };

    // Check Next Pokémon button pass by all pokemons
    allPokemons.forEach((currentPokemon) => {
      const pokemon = screen.getByText(currentPokemon);

      expect(pokemon).toBeInTheDocument();
      checkNextButtonPokemon();
    });
  });

  test('4 - Se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokemonFilterType = [
      /electric/i,
      /fire/i,
      /bug/i,
      /poison/i,
      /psychic/i,
      /normal/i,
      /dragon/i,
    ];

    const pokemonFilterAll = [
      /all/i,
    ];

    // Check Type Pokémon button
    pokemonFilterType.forEach((typePokemon) => {
      const filterButtonType = screen.getByRole('button', { name: typePokemon });
      expect(filterButtonType).toBeInTheDocument();
    });

    // Check All Pokémon button
    pokemonFilterAll.forEach((allPokemons) => {
      const filterButtonAll = screen.getByRole('button', { name: allPokemons });
      expect(filterButtonAll).toBeInTheDocument();
    });
  });

  test('5 - Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    // User select Poison
    const buttonTypePoison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(buttonTypePoison);

    const ekans = screen.getByRole('img', { name: /Ekans sprite/i });
    expect(ekans).toBeInTheDocument();

    // User select Dragon
    const buttonTypeDragon = screen.getByRole('button', { name: /dragon/i });
    userEvent.click(buttonTypeDragon);

    const dragonair = screen.getByRole('img', { name: /Dragonair sprite/i });
    expect(dragonair).toBeInTheDocument();

    // User select All (Clear)
    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);

    const pikachu = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();

    // Check by data-testid
    const buttons = screen.getByTestId('');
    expect(buttons).toBeInTheDocument();
  });
});
