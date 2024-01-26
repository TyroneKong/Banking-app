'use client';

import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { z } from 'zod';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { axiosRequest } from '../../requests/requests';

const schema = z.object({
  name: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
});

type Inputs = z.infer<typeof schema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const toast = useToast();
  const router = useRouter();

  const registerUser: UseMutationResult<
  AxiosResponse<Inputs>,
  unknown,
  Inputs
  > = useMutation({
    mutationFn: async (body: Inputs) => axiosRequest.post('/api/register', body),
    onSuccess: () => {
      router.push('/login');
      toast({
        title: 'Register',
        description: 'Register Successful',
        status: 'success',
      });
    },
  });

  const submit: SubmitHandler<Inputs> = (data) => {
    registerUser.mutate(data);
  };

  return (
    <Box>
      <Heading textAlign="center" mb={4}>
        Manage Money
      </Heading>
      <Text textAlign="center" fontSize="xl">
        A place to manage all your finances
      </Text>
      <Card maxW="sm">
        <CardBody>
          <Image
            src="/piggybank.jpg"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack>
            <Link href="/login">
              <Button
                mt={10}
                size="lg"
                variant="solid"
                colorScheme="orange"
                w="full"
              >
                Login
              </Button>
            </Link>

            <form onSubmit={handleSubmit(submit)}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} />
                <FormErrorMessage style={{ color: 'red' }}>
                  {errors.name?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input {...register('email')} />
                <FormErrorMessage style={{ color: 'red' }}>
                  {errors.email?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input {...register('username')} />
                <FormErrorMessage style={{ color: 'red' }}>
                  {errors.username?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>password</FormLabel>
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
              >
                Register
              </Button>
            </form>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default Register;
