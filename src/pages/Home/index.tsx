import React from "react";
import classNames from "classnames";
import { Dot, Slider } from "pure-react-carousel";

import TokenCard from "../../components/TokenCard";
import TabsSection from "./TabsSection";

import useCarouselContext from "../../hooks/useCarouselContext";

import { TOKEN_CARDS } from "../../const";

import DotIcon from "../../assets/icons/dot.svg";

import styles from "./Home.module.scss";

import "pure-react-carousel/dist/react-carousel.es.css";

function Home() {
  const currentSlide = useCarouselContext();

  return (
    <div className={styles.Home}>
      <Slider className={styles.CardsContainer}>
        {TOKEN_CARDS.map((token, i) => (
          <TokenCard key={token.token} token={token} i={i} />
        ))}
      </Slider>
      <div className={styles.DotGroup}>
        {TOKEN_CARDS.map((token, i) => (
          <Dot
            className={classNames(styles.Dot, {
              [styles.active]: currentSlide === i,
            })}
            key={token.token}
            slide={i}
          >
            <DotIcon className={styles.DotIcon} />
          </Dot>
        ))}
      </div>
      <TabsSection />
    </div>
  );
}

export default Home;
