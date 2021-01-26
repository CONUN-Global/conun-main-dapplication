import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  GridItem,
  HStack,
  Select,
  Stack,
  Text,
  Switch,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import Box from '../../components/Box';
import Form from '../../components/Chakra/Form';
import Input from '../../components/Form/Input';

import useGetGasEstimate from '../../hooks/useGetGasEstimate';
import ConfirmTransferModal from './ConfirmTransferModal';

type FormData = {
  type: string;
  amount: number;
  to: string;
  fee: string;
  gasPrice: number;
  gasLimit: number;
  isAdvanced: boolean;
};

function Transfer() {
  const [confirmModal, setConfirmModal] = useState<FormData | null>(null);
  const { register, handleSubmit, watch, errors, control } = useForm<FormData>({
    defaultValues: {
      type: 'ETH',
      fee: 'average',
      isAdvanced: false,
      gasLimit: 21000,
      gasPrice: 36,
    },
  });

  const watchTo = watch('to');
  const watchType = watch('type');
  const watchIsAdvanced = watch('isAdvanced');
  const watchGasFee = watch(['gasLimit', 'gasPrice']);
  const watchAmount = watch('amount', 0);

  const { data, loading } = useGetGasEstimate({
    to: watchTo,
    token: watchType,
    amount: watchAmount,
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const fee = values.isAdvanced
      ? (values.gasPrice * values.gasLimit) / 1000000000
      : data?.[values.fee]?.total;

    const gasLimit = values.isAdvanced
      ? values.gasLimit
      : data?.[values.fee]?.gasLimit;

    const gasPrice = values.isAdvanced
      ? values.gasLimit
      : data?.[values.fee]?.gasPrice;

    setConfirmModal({
      ...values,
      fee,
      gasLimit,
      gasPrice,
    });
  };

  return (
    <GridItem colSpan={3}>
      <Box elevation={2} bgColor="#fff" width="100%" padding="25px">
        <Stack spacing="2rem">
          <Text fontWeight="bold" fontSize="22px">
            Send Transaction
          </Text>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="1rem">
              <HStack>
                <Select name="type" ref={register}>
                  <option value="ETH">ETH</option>
                  <option value="CON">CON</option>
                  <option value="COIN">COIN</option>
                </Select>
                <Input
                  name="amount"
                  type="number"
                  step="0.0001"
                  min={0}
                  placeholder="Amount"
                  formRef={register({
                    required: {
                      value: true,
                      message: 'Please specify an amount',
                    },
                  })}
                  error={errors.amount}
                />
              </HStack>
              <Input
                name="to"
                formRef={register({
                  required: {
                    value: true,
                    message: 'Please specify an address',
                  },
                })}
                placeholder="To Address"
                error={
                  data?.success || loading
                    ? errors.to
                    : { type: 'validate', message: 'Address not valid' }
                }
              />
              {watchType !== 'COIN' && (
                <>
                  <Text fontWeight={700}>Transaction Fee</Text>
                  {watchIsAdvanced ? (
                    <HStack>
                      <Input
                        name="gasPrice"
                        type="number"
                        formRef={register}
                        label="Gas Price"
                        error={errors.gasPrice}
                      />
                      <Input
                        name="gasLimit"
                        type="number"
                        formRef={register}
                        label="Gas Limit"
                        error={errors.gasLimit}
                      />
                      <FormControl>
                        <FormLabel
                          htmlFor="calculatedFee"
                          fontWeight="bold"
                          mb={0}
                        >
                          Fee
                        </FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <Text color="gray.300">{watchType}</Text>
                          </InputLeftElement>
                          <ChakraInput
                            id="calculatedFee"
                            label="Fee"
                            isReadOnly
                            type="number"
                            value={
                              (watchGasFee.gasPrice * watchGasFee.gasLimit) /
                              1000000000
                            }
                          />
                        </InputGroup>
                      </FormControl>
                    </HStack>
                  ) : (
                    <Controller
                      control={control}
                      name="fee"
                      render={({ onChange, value }) => (
                        <HStack justifyContent="space-between">
                          <Checkbox
                            isChecked={value === 'slow'}
                            onChange={() => onChange('slow')}
                          >
                            Slow ({data?.slow?.total?.toFixed(6) ?? '0.000059'}{' '}
                            {watchType})
                          </Checkbox>
                          <Checkbox
                            isChecked={value === 'average'}
                            onChange={() => onChange('average')}
                          >
                            Average (
                            {data?.average?.total?.toFixed(6) ?? '0.000069'}{' '}
                            {watchType})
                          </Checkbox>
                          <Checkbox
                            isChecked={value === 'fast'}
                            onChange={() => onChange('fast')}
                          >
                            Fast ({data?.fast?.total?.toFixed(6) ?? '0.000073'}{' '}
                            {watchType})
                          </Checkbox>
                        </HStack>
                      )}
                    />
                  )}

                  <FormControl
                    display="flex"
                    alignItems="center"
                    alignSelf="flex-end"
                    width="auto"
                  >
                    <FormLabel htmlFor="isAdvanced">Advanced Options</FormLabel>
                    <Switch
                      id="isAdvanced"
                      name="isAdvanced"
                      colorScheme="green"
                      ref={register}
                    />
                  </FormControl>
                </>
              )}
              <Button type="submit" backgroundColor="#05c0a5">
                Send Transaction
              </Button>
            </Stack>
          </Form>
        </Stack>
      </Box>
      <ConfirmTransferModal
        isOpen={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        values={confirmModal}
      />
    </GridItem>
  );
}

export default Transfer;
