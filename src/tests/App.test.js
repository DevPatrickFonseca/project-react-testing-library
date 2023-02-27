import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 01 - Teste o componente <App.js />', () => {
  test('1 - Se primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });

    expect(linkHome).toBeInTheDocument();
  });

  test('2 - Se primeiro link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });

    expect(linkAbout).toBeInTheDocument();
  });

  test('3 - Se primeiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(linkFavoritePokemon).toBeInTheDocument();
  });
});
