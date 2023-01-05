const { render, screen } = require('@testing-library/react');
const { GifGrid } = require('../../src/components/GifGrid');

/* Nos sirve para poder utilizar el hook en nuestra prueba del componente */
const { useFetchGifs } = require('../../src/hooks/useFetchGifs');
jest.mock('../../src/hooks/useFetchGifs');

describe('Pruebas en <GifGrid/>', () => {
  const category = 'One Punch';

  test('debe de mostrar el loading inicialmente', () => {
    useFetchGifs.mockReturnValue({
      gifs: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);
    expect(screen.getByText('Cargando...'));
    expect(screen.getByText(category));
  });

  test('debe de mostrar items cuando se cargan las imagenes useFetchGifs', async () => {
    const gifs = [
      {
        id: 'ABC',
        title: 'Saitama',
        url: 'https://saitama.jpg',
      },
      {
        id: '123',
        title: 'Goku',
        url: 'https://goku.jpg',
      },
    ];

    useFetchGifs.mockReturnValue({
      gifs,
      isLoading: false,
    });

    render(<GifGrid category={category} />);

    expect(screen.getAllByRole('img').length).toBe(2);
  });
});
