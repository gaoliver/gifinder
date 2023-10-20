import React from 'react';
import { render } from '@testing-library/react-native';
import { GIFDetails } from '../GIFDetails';
import { NativeBaseProvider } from 'native-base';
import { mockGIFListApi } from './@mocks/mockGIFList';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe('GIFDetails screen test.', () => {
  const gif = mockGIFListApi[0];

  it('renders the component with the given GIF url', () => {
    const { getByText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <GIFDetails route={{ params: { gif } }} />
      </NativeBaseProvider>,
    );

    expect(getByText(gif.url)).toBeTruthy();
  });
});
