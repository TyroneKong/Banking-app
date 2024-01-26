import React from 'react';
import { Flex } from '@chakra-ui/react';
import Login from '../components/login/login.tsx';

function LoginPage() {
  return (
    <Flex mt={100} justifyContent="center" alignItems="center">
      <Login />
    </Flex>
  );
}

export default LoginPage;
