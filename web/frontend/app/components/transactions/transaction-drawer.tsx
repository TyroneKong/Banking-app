'use client';

import React from 'react';
import { schema, Inputs } from 'app/schemas/transaction-schema';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import useUser from 'app/contexts/userContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from 'app/requests/requests';

export default function TransactionDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { id, name } = useUser();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const transaction = useMutation({
    mutationKey: ['transactions'],
    mutationFn: (body: Inputs) => createTransaction(body),
    onSuccess: () => {
      toast({
        title: 'create new transaction',
        description: 'Sucessfully created a new transaction',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  const submit: SubmitHandler<Inputs> = (data) => {
    transaction.mutate(data);
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Create Transaction
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a Transaction</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSubmit(submit)}>
              <FormControl>
                <FormLabel>UserId</FormLabel>
                <Input {...register('userId')} />
                <FormErrorMessage />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} />
                <FormErrorMessage />
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input {...register('amount')} />
                <FormErrorMessage />
              </FormControl>
              <FormControl>
                <FormLabel>Currency</FormLabel>
                <Input {...register('currency')} />
                <FormErrorMessage />
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <Input {...register('type')} />
                <FormErrorMessage />
              </FormControl>
              <Stack mt={10} gap={5}>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="blue">
                  Save
                </Button>
              </Stack>
            </form>
          </DrawerBody>

          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    </>
  );
}
