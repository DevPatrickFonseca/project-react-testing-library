import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Requisito 06 - Teste o componente <Pokemon.js />', () => {
  const dataTest = data[0];

  const { name } = dataTest;

  test('1 - Se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonCardNameDetailsPikachu = screen.getByText(/pikachu/i);
    expect(pokemonCardNameDetailsPikachu).toBeInTheDocument();

    const pokemonCardName = screen.getByTestId('pokemon-name');
    expect(pokemonCardName).toBeInTheDocument();

    const pokemonCardType = screen.getByTestId('pokemon-type');
    expect(pokemonCardType).toBeInTheDocument();
    expect(pokemonCardType).toHaveTextContent('Electric');

    const pokemonCardWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonCardWeight).toBeInTheDocument();

    const pokemonCardAverageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(pokemonCardAverageWeight).toBeInTheDocument();

    const pokemonCardMoreDetails = screen.getByRole('link', { name: /More details/i });
    expect(pokemonCardMoreDetails).toBeInTheDocument();

    const hasFavoritePokemonImage = screen.getByRole('img', { name: `${name} sprite` });
    expect(hasFavoritePokemonImage.alt).toContain(`${name} sprite`);
    expect(hasFavoritePokemonImage.src).toBe(data[0].image);
  });

  test('2 - Se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonCardLinkMoreDetails = screen.getByRole('link', { name: /More details/i });
    expect(pokemonCardLinkMoreDetails).toBeInTheDocument();
  });

  test('3 - Se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetailsRedirect = screen.getByRole('link', { name: /More details/i });
    expect(linkMoreDetailsRedirect).toBeInTheDocument();

    userEvent.click(linkMoreDetailsRedirect);
    expect(history.location.pathname).toBe('/pokemon/25');

    const linkMoreDetailsRedirectImage = screen.getByRole('img', { name: /sprite/i });
    expect(linkMoreDetailsRedirectImage).toBeInTheDocument();
  });

  test('4 - Se se a URL exibida no navegador muda para "/pokemon/<id>", onde "<id>" é o id do Pokémon cujos detalhes se deseja ver', () => {
    renderWithRouter(<App />);

    const linkUrlIdChange = screen.getByRole('link', { name: /More details/i });
    expect(linkUrlIdChange).toBeInTheDocument();
    userEvent.click(linkUrlIdChange);

    const linkUrlIdFavoritePokemon = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    userEvent.click(linkUrlIdFavoritePokemon);
  });

  test('5 - Se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const hasFavoritePokemonStarImage = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(hasFavoritePokemonStarImage).toBeInTheDocument();
    expect(hasFavoritePokemonStarImage.src).toContain('/star-icon.svg');
    expect(hasFavoritePokemonStarImage.alt).toContain(`${name} is marked as favorite`);
  });
});
