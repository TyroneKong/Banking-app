'use client';

import React from 'react';
import { schema, Inputs } from 'app/schemas/expense-schema';
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
  Select,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createExpenses } from 'app/requests/requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Expense from 'app/types/expenses';

export default function ExpenseDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createExpense = useMutation({
    mutationKey: ['expenses'],
    mutationFn: (body: Inputs) => createExpenses(body),
    onSuccess: () => {
      toast({
        title: 'created expense',
        status: 'success',
        description: 'Expense created',
      });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });

  const submit: SubmitHandler<Inputs> = (data) => {
    createExpense.mutate(data);
  };

  const typeOptions = ['food', 'clothes', 'holiday', 'travel', 'stationary'];

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Create Expense
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
                <FormLabel>Type</FormLabel>
                <Select {...register('type')}>
                  {typeOptions.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </Select>
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
