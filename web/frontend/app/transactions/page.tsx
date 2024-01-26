'use client';

import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import Sidebar from 'app/components/sidebar/sidebar';
import TransactionDrawer from 'app/components/transactions/transaction-drawer';
import TransactionTable from '../components/transactions/transactions';

export default function Home() {
  return (
    <Flex mt={100} justifyContent="center" alignItems="center">
      <Sidebar />
      <TransactionTable />
      <TransactionDrawer />
    </Flex>
  );
}
