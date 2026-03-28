import { useQuery } from '@tanstack/react-query';
import { mockUsers } from '../mock/data';
import type { User } from '../types';

interface FetchDataOptions {
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
}

interface FetchDataResponse {
  rows: User[];
  pageCount: number;
  totalRows: number;
}

// Generate a large mock dataset dynamically for the table demo (up to 500 records)
const generateLargeDataset = (): User[] => {
  const baseUsers = mockUsers;
  const largeDataset: User[] = [];

  for (let i = 0; i < 50; i++) {
    baseUsers.forEach((user, index) => {
      largeDataset.push({
        ...user,
        id: `${user.id}-${i}`,
        name: `${user.name} ${i > 0 ? `(${i})` : ''}`,
        email: `user${index}_${i}@nexgen.com`
      });
    });
  }
  return largeDataset;
};

const DUMMY_DATA = generateLargeDataset();

const fetchSimulatedData = async (options: FetchDataOptions): Promise<FetchDataResponse> => {
  // Simulate network delay of 800ms
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredData = DUMMY_DATA;

  // Apply global filter
  if (options.globalFilter) {
    const searchLower = options.globalFilter.toLowerCase();
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.role.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower)
    );
  }

  const totalRows = filteredData.length;
  const pageCount = Math.ceil(totalRows / options.pageSize);

  // Apply pagination
  const startRow = options.pageIndex * options.pageSize;
  const endRow = startRow + options.pageSize;
  const rows = filteredData.slice(startRow, endRow);

  return {
    rows,
    pageCount,
    totalRows,
  };
};

export const useAdvancedData = (options: FetchDataOptions) => {
  return useQuery({
    queryKey: ['advancedData', options],
    queryFn: () => fetchSimulatedData(options),
    placeholderData: (previousData) => previousData, // keep previous data while fetching next page
  });
};
