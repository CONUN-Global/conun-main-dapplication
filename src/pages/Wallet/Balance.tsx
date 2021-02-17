import React from "react";
import { Spinner, Stack, Text } from "@chakra-ui/react";

import Box from "../../components/Box";
import Icon from "../../components/Chakra/Icon";
import FormattedBalance from "../../components/FormattedBalance";
import Button from "../../components/Button";

import useGetConBalance from "../../hooks/useGetConBalance";
import useGetEthBalance from "../../hooks/useGetEthBalance";
import useGetLocalConBalance from "../../hooks/useLocalConBalance";

import { ReactComponent as Refresh } from "../../assets/icons/refresh.svg";

function Balance() {
  const { balance, refetch: refetchEth, isFetching } = useGetEthBalance();
  const {
    balance: conBalance,
    refetch: refetchCon,
    isFetching: isFetchingCon,
  } = useGetConBalance();
  const {
    balance: localBalance,
    refetch,
    isFetching: isFetchingLocal,
  } = useGetLocalConBalance();

  return (
    <Box elevation={2} padding="25px" bgColor="#5a78f0" color="#fff">
      <Stack
        alignItems="flex-start"
        height="100%"
        justifyContent="space-between"
      >
        <Text fontWeight="bold" fontSize="22px">
          Balance
        </Text>
        <Text
          as="div"
          display="flex"
          justifyContent="space-between"
          width="100%"
          fontSize="18px"
        >
          <Text>
            <FormattedBalance balance={localBalance} />
          </Text>
          <Text as="span" fontSize="18px">
            COIN
          </Text>
        </Text>
        <Text
          as="div"
          display="flex"
          justifyContent="space-between"
          width="100%"
          fontSize="18px"
        >
          <Text>
            <FormattedBalance balance={balance} />
          </Text>
          <Text as="span" fontSize="18px">
            ETH
          </Text>
        </Text>
        <Text
          as="div"
          display="flex"
          justifyContent="space-between"
          width="100%"
          fontSize="18px"
        >
          <Text>
            <FormattedBalance balance={conBalance} />
          </Text>
          <Text as="span" fontSize="18px">
            CON
          </Text>
        </Text>
        <Button
          pure
          bgColor="transparent"
          padding={0}
          alignSelf="flex-end"
          minWidth="auto"
          _active={{ bgColor: "transparent" }}
          _focus={{ border: "none" }}
          _hover={{ bgColor: "transparent" }}
          width="auto"
          onClick={async () => {
            await refetch();
            await refetchEth();
            await refetchCon();
          }}
        >
          {isFetchingLocal || isFetchingCon || isFetching ? (
            <Spinner />
          ) : (
            <Icon icon={Refresh} fill="#fff" width="18px" height="18px" />
          )}
        </Button>
      </Stack>
    </Box>
  );
}

export default Balance;
