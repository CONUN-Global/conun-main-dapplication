import { extendTheme } from "@chakra-ui/react";
import theme, { Theme } from "@chakra-ui/theme";
import { Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  ...theme.styles,
  global: () => ({
    ...theme.styles.global,
    margin: 0,
    body: {
      padding: 0,
      width: "100vw",
      display: "block",
      overflow: "hidden",
      backgroundColor: "#f4f4f4",
    },
  }),
};

const customTheme: Theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: "ligth",
      },
    },
  },
});

export default { ...theme, styles, ...customTheme };
