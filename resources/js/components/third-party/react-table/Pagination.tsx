// react-bootstrap
import Pagination from 'react-bootstrap/Pagination';
import Stack from 'react-bootstrap/Stack';

// third-party
import { TableState, Updater } from '@tanstack/react-table';

interface TablePaginationProps {
  setPageSize: (updater: Updater<number>) => void;
  setPageIndex: (updater: Updater<number>) => void;
  getState: () => TableState;
  getPageCount: () => number;
  initialPageSize?: number;
  totalEntries: number;
  className?: string;
}

// ==============================|| REACT TABLE - PAGINATION ||============================== //

export default function TablePagination({
  getPageCount,
  setPageIndex,
  getState,
  totalEntries,
  initialPageSize,
  className
}: TablePaginationProps) {
  const state = getState();
  const pageIndex = state.pagination?.pageIndex ?? 0;
  const pageSize = state.pagination?.pageSize ?? initialPageSize ?? 10;

  const indexOfFirstUser = pageIndex * pageSize + 1;
  const indexOfLastUser = Math.min(indexOfFirstUser + pageSize - 1, totalEntries);
  const totalPages = getPageCount();

  return (
    <Stack
      direction="horizontal"
      className={`justify-content-between align-items-center p-4 pb-0 border-top ${className} flex-wrap`}
      gap={2}
    >
      <p className="mb-0">
        Showing {indexOfFirstUser} to {indexOfLastUser} of {totalEntries} entries
      </p>
      <Pagination className="custom-pagination justify-content-md-end justify-content-start mb-0">
        <Pagination.Prev onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))} disabled={pageIndex === 0} />

        {pageIndex > 2 && <Pagination.Item onClick={() => setPageIndex(0)}>1</Pagination.Item>}
        {pageIndex > 3 && <Pagination.Ellipsis />}
        {Array.from({ length: totalPages }, (_, index) => {
          if (index >= pageIndex - 1 && index <= pageIndex + 1) {
            return (
              <Pagination.Item key={index} active={index === pageIndex} onClick={() => setPageIndex(index)}>
                {index + 1}
              </Pagination.Item>
            );
          }
          return null;
        })}
        {pageIndex < totalPages - 3 && <Pagination.Ellipsis />}
        {pageIndex < totalPages - 2 && <Pagination.Item onClick={() => setPageIndex(totalPages - 1)}>{totalPages}</Pagination.Item>}

        <Pagination.Next
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={pageIndex === totalPages - 1}
        />
      </Pagination>
    </Stack>
  );
}
