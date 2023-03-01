import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Requisito 07 - Teste o componente <PokemonDetails.js />', () => {
  const dataTest = data[0];

  const {
    id,
    name,
    foundAt,
  } = dataTest;

  test('1 - Se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetailLink = screen.getByRole('link', { name: /More details/i });
    expect(pokemonDetailLink).toBeInTheDocument();

    userEvent.click(pokemonDetailLink);
    history.push(`/pokemons/${id}`);

    const pokemonDetailH2Name = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    expect(pokemonDetailH2Name).toBeInTheDocument();

    expect(pokemonDetailLink).not.toBeInTheDocument();

    const pokemonDetailH2Text = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(pokemonDetailH2Text).toBeInTheDocument();

    const pokemonDetailPText = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i);
    expect(pokemonDetailPText).toBeInTheDocument();
  });

  test('2 - Se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetailLink = screen.getByRole('link', { name: /More details/i });
    expect(pokemonDetailLink).toBeInTheDocument();

    userEvent.click(pokemonDetailLink);
    history.push(`/pokemons/${id}`);

    const pokemonMapTitle = screen.getByRole('heading', { level: 2, name: `Game Locations of ${name}` });
    expect(pokemonMapTitle).toBeInTheDocument();

    const pokemonLocationOne = screen.getByText(`${foundAt[0].location}`);
    expect(pokemonLocationOne).toBeInTheDocument();

    const pokemonMapLocationOne = screen.getAllByRole('img', { name: /pikachu location/i })[0];
    expect(pokemonMapLocationOne.src).toContain('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonMapLocationOne.alt).toContain(`${name} location`);

    const pokemonLocationTwo = screen.getByText(`${foundAt[1].location}`);
    expect(pokemonLocationTwo).toBeInTheDocument();

    const pokemonMapLocationTwo = screen.getAllByRole('img', { name: /pikachu location/i })[1];
    expect(pokemonMapLocationTwo.src).toContain('https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pokemonMapLocationTwo.alt).toContain(`${name} location`);
  });

  test('3 - Se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonDetailLink = screen.getByRole('link', { name: /More details/i });
    expect(pokemonDetailLink).toBeInTheDocument();

    userEvent.click(pokemonDetailLink);
    history.push(`/pokemons/${id}`);

    const pokemonDetailCheckboxFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(pokemonDetailCheckboxFavorite);

    const pokemonDetailFavoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(pokemonDetailFavoritePokemon);
    expect(history.location.pathname).toBe('/favorites');

    const pokemonDetailStarImage = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(pokemonDetailStarImage).toBeInTheDocument();
  });
});
