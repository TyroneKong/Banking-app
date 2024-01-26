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

import useUser from 'app/contexts/userContext';
import Transaction from '../../types/transaction';
import { useGetTransactions } from '../../requests/requests';

type TableColumn<T> = {
  key: keyof T;
  header: string;
  render: (item: T) => ReactNode;
};

// TODO: refactor tables and split up components and use real data

const columns: TableColumn<Transaction>[] = [
  { key: 'ID', header: 'ID', render: (t) => t.ID },
  { key: 'ID', header: 'user_id', render: (t) => t.user_id },
  { key: 'ID', header: 'name', render: (t) => t.name.toUpperCase() },
  { key: 'ID', header: 'amount', render: (t) => t.amount },
  { key: 'ID', header: 'balance', render: (t) => t.balance },
  { key: 'ID', header: 'currency', render: (t) => t.currency },
  { key: 'ID', header: 'type', render: (t) => t.type.toUpperCase() },
  { key: 'ID', header: 'createDate', render: (t) => t.createdate },
];

function TransactionTable() {
  const { data, isLoading } = useGetTransactions();

  // const columns2 = data?.data.map((t) => (t) => {
  //   ({ key: t.ID, header: t, render: (t) => t });
  // });

  return (
    <TableContainer>
      <Text fontSize={40} textAlign="center">
        Transactions
      </Text>
      <Table variant="striped" size="lg">
        <TableCaption>Transactions</TableCaption>
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

export default TransactionTable;
