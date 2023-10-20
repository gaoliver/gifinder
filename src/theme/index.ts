import { extendTheme } from 'native-base';
import { colors } from './colors';

export const customTheme = extendTheme({
  colors,
});

declare module 'native-base' {
  interface ICustomTheme {
    colors: typeof colors;
  }
}
