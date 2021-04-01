import useCarouselContext from "./useCarouselContext";

import { TOKEN_CARDS } from "../const";

function useCurrentToken() {
  const currentSlide = useCarouselContext();
  return TOKEN_CARDS[currentSlide];
}

export default useCurrentToken;
