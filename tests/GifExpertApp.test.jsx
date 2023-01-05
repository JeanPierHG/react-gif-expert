import { render, screen, fireEvent } from '@testing-library/react';
import GifExpertApp from '../src/GifExpertApp';

describe('Pruebas en <GifExpertApp />', () => {
  test('debe de mostrar en pantalla gifs de one punch de arranque', () => {
    render(<GifExpertApp />);

    expect(screen.getByText('One punch')).toBeTruthy();
  });

  test('debe de mostrar la categoria correspondiente', () => {
    const newCategory = 'Dragon Ball';
    render(<GifExpertApp />);

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');
    fireEvent.input(input, { target: { value: newCategory } });
    fireEvent.submit(form);

    expect(screen.getByText(newCategory)).toBeTruthy();
  });

  test('no debe agregar una misma categoria', () => {
    const newCategory = 'Goku';
    render(<GifExpertApp />);

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    fireEvent.input(input, { target: { value: newCategory } });
    fireEvent.submit(form);

    fireEvent.input(input, { target: { value: newCategory } });
    fireEvent.submit(form);

    expect(screen.getAllByText(newCategory).length).toBe(1);
  });
});
