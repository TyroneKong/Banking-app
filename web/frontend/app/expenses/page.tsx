import React from 'react';
import { Flex } from '@chakra-ui/react';
import ExpenseTable from 'app/components/expenses/expenses';
import Sidebar from 'app/components/sidebar/sidebar';
import ExpenseDrawer from 'app/components/expenses/expenses-drawer';

export default function Home() {
  return (
    <Flex mt={100} justifyContent="center" alignItems="center">
      <Sidebar />
      <ExpenseTable />
      <ExpenseDrawer />
    </Flex>
  );
}
