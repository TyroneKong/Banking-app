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
} from '@chakra-ui/react';

type TableColumn<T> = {
  key: keyof T;
  header: string;
  render: (item: T) => ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
};

function ResusableTable({ data, columns }: TableProps<any>) {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>Transactions</TableCaption>
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={col.key}>{col.header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((item) => (
            <Tr key={item.id}>
              {columns.map((col) => (
                <Td key={col.key}>{col.render(item)}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
        <Tfoot />
      </Table>
    </TableContainer>
  );
}

export default ResusableTable;
