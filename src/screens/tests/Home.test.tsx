import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react-native';
import { Home } from '../Home'; // Assuming your component file is in the same directory as the test
import { NativeBaseProvider } from 'native-base';
import { api } from '@/Api';
import { SearchResultsApi } from '@/@types/models';
import { useNavigation } from '__mocks__/react-navigation';

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

jest.mock('@/Api');
const mockedApi = api as jest.Mocked<typeof api>;

const mockApiResponse = {
  data: {
    data: [],
  },
};

describe('Home screen', () => {
  afterEach(cleanup);

  const navigation = useNavigation();

  it('Fetches random GIF on component mount', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Home navigation={navigation} />
      </NativeBaseProvider>,
    );

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith('/random');
    });
  });

  it('Fetches search results when searchQuery length is >= 2', async () => {
    mockedApi.get.mockResolvedValue(mockApiResponse);

    const { getByPlaceholderText } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <Home navigation={navigation} />
      </NativeBaseProvider>,
    );

    const searchInput = getByPlaceholderText('Search for GIFs');
    fireEvent.changeText(searchInput, 'test');

    await waitFor(() => {
      expect(mockedApi.get).toHaveBeenCalledWith('/search', {
        params: {
          q: 'test',
          limit: 18,
          offset: 0,
        },
      });
    });
  });
});
