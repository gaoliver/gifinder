import { GIFProps } from '@/@types/models';
import gifReducer, { actions } from './slices';

describe('gifSlice REDUX test', () => {
  const initialGIF: GIFProps = {
    id: 'gif123',
    slug: 'test-gif',
    embed_url: 'https://example.com/embed',
    source: 'https://example.com/source',
    images: {
      original: {
        url: 'https://example.com/image.gif',
        height: '',
        width: '',
        size: '',
        mp4_size: '',
        mp4: '',
        webp_size: '',
        webp: '',
        frames: '',
        hash: '',
      },
      downsized: {
        height: '',
        width: '',
        size: '',
        url: '',
      },
    },
    title: 'Test GIF',
    url: 'https://example.com',
    rating: 'PG',
  };

  const initialState = {
    favourites: [],
    readingList: [],
  };

  it('should add a GIF to favourites', () => {
    const state = gifReducer(initialState, actions.saveFavourite(initialGIF));

    expect(state.favourites).toHaveLength(1);
    expect(state.favourites[0]).toEqual(initialGIF);
  });

  it('should remove a GIF from favourites if already added', () => {
    const stateWithGif = {
      ...initialState,
      favourites: [initialGIF],
    };

    const state = gifReducer(stateWithGif, actions.saveFavourite(initialGIF));

    expect(state.favourites).toHaveLength(0);
  });

  it('should not modify state for unknown action', () => {
    const state = gifReducer(initialState, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });
});
