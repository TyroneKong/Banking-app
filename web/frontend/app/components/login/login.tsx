'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  Input,
  FormLabel,
  FormControl,
  FormErrorMessage,
  VStack,
  Heading,
  Box,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { axiosRequest } from 'app/requests/requests';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

function Login() {
  const schema = z.object({
    password: z.string(),
    email: z.string(),
  });

  type Inputs = z.infer<typeof schema>;
  const toast = useToast();
  const router = useRouter();

  const login = useMutation({
    mutationKey: ['users'],
    mutationFn: (body: {
      password: string;
      email: string;
    }): Promise<AxiosResponse<any, any>> => axiosRequest.post('/api/login', body),
    onSuccess: () => {
      toast({
        title: 'logged in',
        status: 'success',
        description: 'You have succesfully logged in',
      });
      router.push('/transactions');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const submit: SubmitHandler<Inputs> = (data) => {
    login.mutate(data);
    // console.log(data);
  };

  return (
    <Box>
      <Heading textAlign="center">Login</Heading>

      <VStack>
        <form onSubmit={handleSubmit(submit)}>
          <FormControl isInvalid>
            <FormLabel>Email</FormLabel>
            <Input {...register('email')} />
            <FormErrorMessage style={{ color: 'red' }}>
              {errors.email?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid>
            <FormLabel>Password</FormLabel>
            <Input {...register('password')} />
            <FormErrorMessage style={{ color: 'red' }}>
              {errors.password?.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={10}
            size="lg"
            variant="solid"
            colorScheme="blue"
            type="submit"
            isDisabled={!isValid}
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default Login;
