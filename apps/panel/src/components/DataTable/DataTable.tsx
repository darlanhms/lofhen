import * as React from 'react';
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Flex, Text, NumberInput, VStack } from '@chakra-ui/react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

export type DataTableProps<Data extends Record<string, unknown>> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export function DataTable<Data extends Record<string, unknown>>({
  data,
  columns,
}: DataTableProps<Data>): React.ReactElement {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <VStack>
      <Table>
        <Thead>
          {table.getHeaderGroups().map(headerGroup => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const { meta } = header.column.columnDef;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}

                    {/* <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'desc' ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span> */}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getPaginationRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                const { meta } = cell.column.columnDef;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex alignItems="center">
        <Text flexShrink="0" mr={8}>
          Página{' '}
          <Text fontWeight="bold" as="span">
            {table.getState().pagination.pageIndex + 1}
          </Text>{' '}
          de{' '}
          <Text fontWeight="bold" as="span">
            {table.getPageCount()}
          </Text>
        </Text>
      </Flex>
    </VStack>
  );
}
