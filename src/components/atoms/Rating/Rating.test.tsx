import React from 'react';
import renderer from 'react-test-renderer';
import { NativeBaseProvider } from 'native-base';
import { Rating } from './Rating';

it('Rating renders correctly', () => {
  const tree = renderer
    .create(
      <NativeBaseProvider>
        <Rating rating="g" />
      </NativeBaseProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
