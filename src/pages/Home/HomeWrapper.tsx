import React from "react";
import { CarouselProvider } from "pure-react-carousel";

import Layout from "../../components/Layout";
import Home from ".";
import QrCodeSidebar from "../../components/Layout/QrCodeSidebar";
import Button from "../../components/Button";

import Settings from "../../assets/icons/settings.svg";

import { useAppContext } from "../../components/AppContext";

import { TOKEN_CARDS } from "../../const";

import styles from "./Home.module.scss";

import "pure-react-carousel/dist/react-carousel.es.css";

function HomeWrapper() {
  const { handleSettingsSidebar } = useAppContext();
  return (
    <Layout>
      <CarouselProvider
        className={styles.Carousel}
        naturalSlideWidth={351}
        naturalSlideHeight={219}
        totalSlides={TOKEN_CARDS.length}
      >
        <div className={styles.MainBar}>
          <div className={styles.NetworkName}>
            Conun <br /> Test Network
          </div>
          <Button
            type="button"
            noStyle
            className={styles.Settings}
            onClick={() => handleSettingsSidebar(true)}
          >
            <Settings />
          </Button>
        </div>
        <Home />
        <QrCodeSidebar />
      </CarouselProvider>
    </Layout>
  );
}

export default HomeWrapper;
