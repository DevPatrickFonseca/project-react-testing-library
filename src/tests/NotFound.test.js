import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../pages';

describe('Requisito 04 - Teste o componente <NotFound.js />', () => {
  test('1 - Se a página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const pageNoFound = screen.getByRole('heading', { level: 2, name: /Page requested not found/i });

    expect(pageNoFound).toBeInTheDocument();
  });

  test('2 - Se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imageNoFound = screen.getByRole('img', { name: /Pikachu crying because the page requested was not found/i });

    expect(imageNoFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imageNoFound).toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
