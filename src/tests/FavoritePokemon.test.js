import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 03 - Teste o componente <FavoritePokemon.js />', () => {
  test('1 - Se favoritar a partir da página de detalhes é exibida na tela mensagem "No favorite Pokémon found"', () => {
    renderWithRouter(<FavoritePokemon />);
    const messageNoFound = screen.getByText(/No favorite Pokémon found/i);

    expect(messageNoFound).toBeInTheDocument();
  });

  test('2 - Se favoritar a partir da página de detalhes apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    // Pokémon - More details
    const pokemonMoreDetailsSendToFavorited = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokemonMoreDetailsSendToFavorited);

    // Pokémon - Favorited Pokémon
    const checkboxFavoritePokemon = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(checkboxFavoritePokemon);

    // Pokémon - Favorite Pokémon History
    const favoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favoritePokemon);
    expect(history.location.pathname).toBe('/favorites');

    //  Pokémon - Favorite page has a Pokémon Image and Star Image
    const hasPokemonImage = screen.getByRole('img', { name: /sprite/i });
    expect(hasPokemonImage).toBeInTheDocument();

    const hasPokemonStarImage = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(hasPokemonStarImage).toBeInTheDocument();
  });
});
