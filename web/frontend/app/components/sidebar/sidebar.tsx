'use client';

import React from 'react';

import {
  Box,
  IconButton,
  VStack,
  useColorModeValue,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import Link from 'next/link';

export default function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const iconColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      pos="fixed"
      left="0"
      top="0"
      h="100vh"
      bg={bgColor}
      color={textColor}
      boxShadow="lg"
      zIndex="1000"
      transition="width 0.3s ease"
      overflowX="hidden"
      display={{ base: false ? 'block' : 'none', md: 'block' }}
    >
      <VStack spacing="4" align="center" p="4">
        <IconButton
          icon={<FaBars />}
          aria-label="Toggle Sidebar"
          //   onClick={onToggle}
          fontSize="2xl"
          color={iconColor}
          variant="ghost"
        />
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          fontSize="2xl"
          color={iconColor}
          variant="ghost"
        />
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/transactions">Transactions</Link>
        <Link href="/expenses">Expenses</Link>
        <Link href="/budget">Budget</Link>
      </VStack>
    </Box>
  );
}
