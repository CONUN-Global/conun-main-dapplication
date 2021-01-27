import theme, { Theme } from '@chakra-ui/theme';
import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  ...theme.styles,
  global: () => ({
    ...theme.styles.global,
    margin: 0,
    padding: 0,
    select: {
      borderColor: '#CBD5E0 !important',
    },
    input: {
      borderColor: '#CBD5E0 !important',
    },
    body: {
      padding: 0,
      width: '100vw',
      display: 'block',
      overflow: 'hidden',
      backgroundColor: '#f4f4f4',
    },
  }),
};

const customTheme: Theme = {
  ...theme,
  styles,
};

export default customTheme;
