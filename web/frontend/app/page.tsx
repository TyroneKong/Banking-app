import { Flex } from '@chakra-ui/react';
import Register from './components/register/register';

export default function Home() {
  return (
    <Flex mt={100} justifyContent="center" alignItems="center">
      <Register />
    </Flex>
  );
}
