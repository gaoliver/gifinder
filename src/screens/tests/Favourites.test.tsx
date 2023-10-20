/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Favourites } from '../Favourites';
import { Provider, useSelector } from 'react-redux';
import { store } from '@/Redux/store';
import { NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from 'App';
import { mockGIFListApi } from './@mocks/mockGIFList';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const navigation = useNavigation<AppNavigationProp>();

describe('Favourites screen', () => {
  it('Renders empty state screen', () => {
    useSelector.mockReturnValue([]);

    const { findByText } = render(
      <Provider store={store}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <Favourites navigation={navigation} />
        </NativeBaseProvider>
      </Provider>,
    );

    expect(findByText('No favourite yet.')).toBeTruthy();
  });

  it('Renders favourite GIFs when exist', () => {
    useSelector.mockReturnValue(mockGIFListApi);

    const { getByTestId } = render(
      <Provider store={store}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <Favourites navigation={navigation} />
        </NativeBaseProvider>
      </Provider>,
    );

    expect(getByTestId('gif123')).toBeTruthy();
    expect(getByTestId('gif456')).toBeTruthy();
  });

  it('Navigates to GIFDetails screen when a GIF is pressed', () => {
    useSelector.mockReturnValue(mockGIFListApi);

    const { getByTestId } = render(
      <Provider store={store}>
        <NativeBaseProvider initialWindowMetrics={inset}>
          <Favourites navigation={navigation} />
        </NativeBaseProvider>
      </Provider>,
    );

    const gifPressable = getByTestId(mockGIFListApi[0].id);
    fireEvent.press(gifPressable);

    expect(navigation.navigate).toHaveBeenCalledWith('GIFDetails', {
      gif: mockGIFListApi[0],
    });
  });
});
