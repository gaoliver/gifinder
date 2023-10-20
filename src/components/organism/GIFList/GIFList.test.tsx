import React from 'react';
import renderer from 'react-test-renderer';
import { GIFProps } from '@/@types/models';
import { NativeBaseProvider } from 'native-base';
import { GIFList } from './GIFList';
test('GIFList renders correctly.', () => {
  const gifData: GIFProps[] = [
    {
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
    },
  ];

  const tree = renderer
    .create(
      <NativeBaseProvider>
        <GIFList list={gifData} onPressItem={() => {}} />
      </NativeBaseProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
