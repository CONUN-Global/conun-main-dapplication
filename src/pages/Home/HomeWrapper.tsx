import React from "react";
import { CarouselProvider } from "pure-react-carousel";

import Layout from "../../components/Layout";
import Home from ".";

import Menu from "../../assets/icons/menu.svg";
import Settings from "../../assets/icons/settings.svg";
import QrCodeSidebar from "../../components/Layout/QrCodeSidebar";

import { TOKEN_CARDS } from "../../const";

import styles from "./Home.module.scss";

import "pure-react-carousel/dist/react-carousel.es.css";

function HomeWrapper() {
  return (
    <Layout>
      <CarouselProvider
        className={styles.Carousel}
        naturalSlideWidth={351}
        naturalSlideHeight={219}
        totalSlides={TOKEN_CARDS.length}
      >
        <div className={styles.MainBar}>
          <Menu className={styles.Menu} />
          <div className={styles.NetworkName}>
            Conun <br /> Test Network
          </div>
          <Settings className={styles.Settings} />
        </div>
        <Home />
        <QrCodeSidebar />
      </CarouselProvider>
    </Layout>
  );
}

export default HomeWrapper;
