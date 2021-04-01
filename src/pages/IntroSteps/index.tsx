import React, { useState } from "react";

import Welcome from "./Welcome";
import Introduction from "./Introduction";
import TermsAndConditions from "./TermsAndConditions";
import ImportWallet from "./ImportWallet";
import CreateWallet from "./CreateWallet";
import Success from "./Success";
import Layout from "../../components/Layout";
import ExistingWallet from "./ExistingWallet";

import styles from "./IntroSteps.module.scss";
import useCurrentUser from "../../hooks/useCurrentUser";

const steps = {
  welcome: {
    id: "welcome",
    breadCrumb: "",
    component: Welcome,
  },
  intro: {
    id: "intro",
    component: Introduction,
  },
  termsAndConditions: {
    id: "termsAndConditions",
    component: TermsAndConditions,
  },
  importWallet: {
    id: "importWallet",
    component: ImportWallet,
  },
  createWallet: {
    id: "createWallet",
    component: CreateWallet,
  },
  existingWallet: {
    id: "existingWallet",
    component: ExistingWallet,
  },
  success: {
    id: "success",
    component: Success,
  },
};

export interface StepProps {
  setCurrentStep: (id: string) => void;
}

function IntroSteps() {
  const { currentUser } = useCurrentUser();
  const [currentStep, setCurrentStep] = useState(
    currentUser ? steps.existingWallet.id : steps.welcome.id
  );

  const Component = steps[currentStep].component;

  return (
    <Layout>
      <div className={styles.Container}>
        <Component setCurrentStep={(id: string) => setCurrentStep(id)} />
      </div>
    </Layout>
  );
}

export default IntroSteps;
