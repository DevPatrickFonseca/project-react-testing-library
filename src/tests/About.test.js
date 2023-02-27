import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Requisito 02 - Teste o componente <About.js />', () => {
  test('1 - Se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexAbout = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);

    expect(pokedexAbout).toBeInTheDocument();
  });

  test('2 - Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titleH2About = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(titleH2About).toBeInTheDocument();
  });

  test('3 - Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphAbout = screen.queryAllByText(/Pokémon/i);

    expect(paragraphAbout).toHaveLength(2);
  });

  test('4 - Se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imageLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageAbout = screen.getByRole('img');

    expect(imageAbout.src).toBe(imageLink);
  });
});
