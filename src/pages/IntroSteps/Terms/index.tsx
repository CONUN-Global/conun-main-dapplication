import React from 'react';
import { Flex, Stack, Text } from '@chakra-ui/react';

import Box from '../../../components/Box';
import Link from '../../../components/Chakra/Link';
import MotionWrapper from '../../../components/MotionWrapper';
import Button from '../../../components/Button';

import { introVariants } from '../../../const';

function Terms() {
  return (
    <MotionWrapper
      variants={introVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 1, type: 'spring' }}
    >
      <Box elevation={2} padding="2rem">
        <Stack spacing="2rem">
          <Text textAlign="center" fontSize="1.5rem">
            Terms and Conditions
          </Text>
          <Text textAlign="justify">
            To create new CONUN Manager Account, Read and agree Terms and
            Conditions below.
          </Text>
          <Text textAlign="justify">
            Conun Manager Licenses 1.0 * define It is important, so please read
            it carefully. This Software End User License Agreement (hereinafter
            referred to as the “License Agreement”) is a usage agreement
            concluded between an individual or a single company (“User”) and a
            “Company” for software products distributed by CONUN (“Company”).
            The software corresponding to this “License Agreement” is software
            provided by the “Company” and software provided through the company
            website (conun.io). This “Company” software (hereinafter “Product”)
            may include not only comput... very long text
          </Text>
          <Flex width="100%">
            <Link width="49%" to="/" mr="2%">
              <Button colorScheme="grey" width="100%" variant="outline">
                Back
              </Button>
            </Link>
            <Link width="49%" to="/wallet-options">
              <Button colorScheme="yellow" width="100%">
                Accept
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Box>
    </MotionWrapper>
  );
}

export default Terms;
