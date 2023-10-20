import React from 'react';
import renderer from 'react-test-renderer';
import { NativeBaseProvider } from 'native-base';
import { ShareButton } from './ShareButton';

it('ShareButton renders correctly', () => {
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <ShareButton testID="shareButton" gifUrl={'https://google.com'} />
      </NativeBaseProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
