import React, { useState } from "react";

import TextBox from "../../../components/TextBox";
import Checkbox from "../../../components/Form/Checkbox";
import Button from "../../../components/Button";

import Arrow from "../../../assets/icons/arrow.svg";

import { StepProps } from "..";

import styles from "./TermsAndConditions.module.scss";

function TermsAndConditions({ setCurrentStep }: StepProps) {
  const [hasAccepted, setHasAccepted] = useState(false);
  return (
    <>
      <Button
        type="button"
        onClick={() => setCurrentStep("intro")}
        className={styles.BackButton}
        noStyle
      >
        <Arrow className={styles.Arrow} />
      </Button>
      <div className={styles.Title}>Terms and Conditions</div>
      <p className={styles.Subtitle}>
        Please read through CONUN’s terms and conditions and privacy policies,
        then select the check mark below to accept.
      </p>
      <TextBox
        className={styles.TermsAndConditions}
        containerStyle={styles.TermsAndConditionsContainer}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet
        vestibulum purus et pretium. Curabitur ultrices malesuada egestas.
        Maecenas nec est nulla. Proin nibh est, pharetra sed nulla porttitor,
        tempor ultrices augue. Nulla placerat, enim sit amet euismod iaculis, ex
        quam pharetra tellus, quis lacinia sem ante at diam. Donec consectetur a
        nunc ac tristique. Donec porta blandit dui, sed blandit quam finibus in.
        Nulla mi felis, molestie ac turpis at, imperdiet hendrerit magna. <br />
        Nulla facilisi. Ut pellentesque eros id elit ultrices pretium. Proin
        placerat pretium sodales. Proin pulvinar vitae est sit amet aliquam.
        Aenean pretium dui magna. Quisque et interdum elit. Mauris euismod
        dignissim justo, sed pharetra felis. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed laoreet vestibulum purus et pretium.
        Curabitur ultrices malesuada egestas. Maecenas nec est nulla. Proin nibh
        est, pharetra sed nulla porttitor, tempor ultrices augue. Nulla
        placerat, enim sit amet euismod iaculis, ex quam pharetra tellus, quis
        lacinia sem ante at diam. Donec consectetur a nunc ac tristique. Donec
        porta blandit dui, sed blandit quam finibus in. Nulla mi felis, molestie
        ac turpis at, imperdiet hendrerit magna. <br />
        Nulla facilisi. Ut pellentesque eros id elit ultrices pretium. Proin
        placerat pretium sodales. Proin pulvinar vitae est sit amet aliquam.
        Aenean pretium dui magna. Quisque et interdum elit. Mauris euismod
        dignissim justo, sed pharetra felis. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed laoreet vestibulum purus et pretium.
        Curabitur ultrices malesuada egestas. Maecenas nec est nulla. Proin nibh
        est, pharetra sed nulla porttitor, tempor ultrices augue. Nulla
        placerat, enim sit amet euismod iaculis, ex quam pharetra tellus, quis
        lacinia sem ante at diam. Donec consectetur a nunc ac tristique. Donec
        porta blandit dui, sed blandit quam finibus in. Nulla mi felis, molestie
        ac turpis at, imperdiet hendrerit magna. <br />
        Nulla facilisi. Ut pellentesque eros id elit ultrices pretium. Proin
        placerat pretium sodales. Proin pulvinar vitae est sit amet aliquam.
        Aenean pretium dui magna. Quisque et interdum elit. Mauris euismod
        dignissim justo, sed pharetra felis.
      </TextBox>
      <Checkbox
        id="terms-and-conditions"
        className={styles.Checkbox}
        checked={hasAccepted}
        onChange={(e) => setHasAccepted(e.target.checked)}
        label="I accept the Terms of Service and Privacy Policy"
      />
      <Button
        type="button"
        disabled={!hasAccepted}
        variant="secondary"
        round
        onClick={() => setCurrentStep("importWallet")}
      >
        Next
      </Button>
    </>
  );
}

export default TermsAndConditions;
