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
        Conun Manager Licenses 1.0 * define It is important, so please read it
        carefully. This Software End User License Agreement (hereinafter
        referred to as the “License Agreement”) is a usage agreement concluded
        between an individual or a single company (“User”) and a “Company” for
        software products distributed by CONUN (“Company”). The software
        corresponding to this “License Agreement” is software provided by the
        “Company” and software provided through the company website (conun.io).
        This “Company” software (hereinafter “Product”) may include not only
        computer software, but also materials, media, files, data, printed
        materials and “online” or electronic documents (“Software”) attached to
        “Product”. . `&quot;`User`&quot;` is deemed to agree to and use the
        contents of this `&quot;`License Agreement`&quot;` by installing,
        copying or executing all or part of this `&quot;`Product`&quot;` on a
        computer or network. You may not use the `&quot;`Product`&quot;` unless
        the `&quot;`User`&quot;` agrees to the contents of this `&quot;`License
        Agreement`&quot;`. * terms The terms used in this Agreement are defined
        as follows. ‘This program’ refers to the Conun Manager program. The term
        `&apos;`this software`&apos;` refers to the subsidiary materials such as
        the program and manuals related to the program. ‘Use’ means to run and
        operate the Program (including installing and putting it in an
        executable state) and to access and use the attached materials provided
        for the execution and operation of the Program. ‘User’ means a person
        who uses the software in accordance with the terms of this Agreement.
        ‘Program reverse analysis’ refers to copying or converting software code
        to obtain information necessary for compatibility between independently
        created software and other software. “Technical protection measures”
        refers to measures to protect software copyright through key
        technologies or devices that effectively protect the rights under the
        copyright and other copyright laws by entering identification numbers
        and unique numbers for programs. * Consent to use of the program If you
        agree to this “License Agreement”, the following rights are granted to
        “User” by “Product”. The “User” may download or copy this “Product” in
        order to use the “Product” properly. You may also make a copy of this
        “Product” for backup or archival purposes. However, in the case of
        installing “product” on a network server and using it on multiple
        computers through streaming, and when using one PC at the same time by
        multiple independent users, the license is not allowed in principle.
        “User” agrees to be audited by “Company” for compliance with this
        Agreement. The “Company” may conduct an audit to determine if the
        customer complies with this Agreement during normal business hours by
        providing advance notice prior to a reasonable period of time. The
        “User” gives the “Company” or its authorized representatives access to
        the “User” `&apos;`s facilities, workstations and servers, cooperates as
        much as possible with the “Company” investigation, and the “Company”
        complies with the “User”`&apos;` s Agreement. All commercially
        reasonable steps should be taken to help determine whether they are
        accurate. The “Company” and its authorized representatives must comply
        with the reasonable security regulations of the customer in the “user”
        workplace. * Data and information collection and use policy In order to
        improve the quality of the `&apos;`Product`&apos;`, the
        `&apos;`Company`&apos;` collects non-personally identifiable information
        that cannot identify an individual, such as the information registered
        in the computer operating system and operating system of the
        `&apos;`User`&apos;`, the version of the `&apos;`Product`&apos;`, and
        error information. Please refer to the “Company” website for the
        “Company” privacy policy. (https://conun.io) * Change of Terms These
        terms and conditions are effective by notifying them through the
        service. The company may change the contents of these terms and
        conditions without prior notice in the event of significant reasons, and
        the terms will be posted on the website. * Indemnification Clause You
        all risks associated with the use and performance of this software
        product and customer support services. The Company and its suppliers
        (including their respective agents and employees) express, including the
        implied warranties of merchantability, fitness for a particular purpose,
        non-infringement of intellectual property or intellectual property
        rights, to the fullest extent permitted by applicable law. Or exclude
        any implied warranties. The company does not guarantee that the
        functions contained in this software product meet your requirements or
        that the use of the computer will not cause temporary interference or
        errors in the use of this software product, and may be excluded to the
        extent permitted by other applicable laws. All warranties are excluded.
        The company is not responsible for any problems arising from changes to
        the computer hardware and computer operating system manufactured after
        the release of this software product. In addition, new viruses
        discovered after the customer support service for the old version was
        stopped due to damage to customers due to new viruses or potentially
        harmful programs discovered since the release of this software product
        or the release of an upgraded version or new product of this software
        product In the event that the customer is harmed by a virus or
        potentially harmful program, the company is also not responsible for the
        damage. The company has jurisdiction over what functions can adversely
        affect the computer system, and what programs, files, and other
        components can adversely affect the user`&apos;`s computer system. We
        are not responsible for any damages. Regardless of whether the remedies
        provided for in this Agreement have achieved their objectives, the
        Company may use / disable or use customer support services of this
        software product to the fullest extent permitted by applicable law,
        except as provided in this Agreement. Any damages arising from the
        provision of, or non-compliance with (consequential, incidental,
        indirect, special, economic, punitive or other similar damages or loss
        of business interests, loss of goodwill, interference with business,
        paralysis of computer functions, or We are not responsible for any
        malfunction, loss of business information, or any other commercial or
        financial damage or loss. Regardless of the above-mentioned matters,
        whether your claim for damages, etc., is based on the principle of
        liability, such as breach of contract or illegal activity, the company
        has been informed in advance of the possibility of such damages, or of
        such damages. Even if the possibility was known in advance, the company
        will not be liable for the above damages, etc., and will not be liable
        for any claims made by a third party, unless there is an intention or
        serious negligence of the company. You understand that this risk has
        already been reflected in the consent of this Agreement. * opensource
        Certain software or libraries built with company software are open
        source software. You are licensed for open source software under your
        own applicable license terms. Details of individual license terms and
        related documents, other materials, and copyright notices can be found
        in the license file in the installation folder provided by the software
        or the company open source site recorded in the license file, which is
        separately notified by the license holder. Subject to change without
        notice. In the event of any conflict between the terms of this License
        and the terms of the Open Source Software, the license terms of the Open
        Source Software shall prevail. You may receive a copy of the open source
        file through the company`&apos;`s open source site recorded in the
        license file, subject to the terms of the license for the open source
        software. You can pick it up at the contact details listed in). Open
        source software is distributed in the hope that it will be useful, but
        it does not provide any form of warranty, including the suitability for
        a particular purpose or the implied warranty that it will be available
        for sale. Distributors, contributors, including licensees, companies,
        and suppliers, even if the potential for damages was known in advance,
        is liable for any damages arising from the use of your open source
        software to the fullest extent permitted by applicable law. Also does
        not bear. You agree to this by entering into this Agreement or by using
        the Company`&apos;`s software. * update This software product includes
        the ability to communicate over the Internet as part of normal operation
        for automatic updates. When this software product is automatically
        updated, arbitrary files may be installed on your computer as needed.
        The automatic update method can be changed at any time to enhance urgent
        and real-time updates to your computer. All updates / modifications are
        considered software for the purposes of this License Agreement and are
        part of the software. By accepting this License Agreement, you agree to
        such updates / modifications.
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
