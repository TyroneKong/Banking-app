'use client';

import React, { ReactNode } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';

import Expense from 'app/types/expenses';
import { useGetExpenses } from '../../requests/requests';

type TableColumn<T> = {
  key: keyof T;
  header: string;
  render: (item: T) => ReactNode;
};

// TODO: refactor tables and split up components and use real data

const columns: TableColumn<Expense>[] = [
  { key: 'ID', header: 'ID', render: (t) => t.ID },
  { key: 'ID', header: 'user_id', render: (t) => t.user_id },
  { key: 'ID', header: 'name', render: (t) => t.name.toUpperCase() },
  { key: 'ID', header: 'amount', render: (t) => t.amount },
  { key: 'ID', header: 'total', render: (t) => t.total },
  { key: 'ID', header: 'type', render: (t) => t.type.toUpperCase() },
  { key: 'ID', header: 'created_at', render: (t) => t.created_at },
];

function ExpenseTable() {
  const { data, isLoading } = useGetExpenses();

  // const columns2 = data?.data.map((t) => (t) => {
  //   ({ key: t.ID, header: t, render: (t) => t });
  // });

  return (
    <TableContainer>
      <Text fontSize={40} textAlign="center">
        Expenses
      </Text>
      <Table variant="striped" size="lg">
        <TableCaption>Expenses</TableCaption>
        <Thead>
          <Tr>{columns?.map((col) => <Th key={col.key}>{col.header}</Th>)}</Tr>
        </Thead>

        <Tbody>
          {data?.data.map((item) => {
            const color = item.type === 'withdrawal' ? 'red' : 'green';
            return (
              <Tr key={item.ID} style={{ color }}>
                {columns.map((col) => (
                  <Td fontWeight="bold" key={col.key}>
                    {col.render(item)}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ExpenseTable;
