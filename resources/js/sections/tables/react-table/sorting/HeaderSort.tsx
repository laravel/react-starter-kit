// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// third-party
import { Column } from '@tanstack/react-table';

enum SortType {
  ASC = 'asc',
  DESC = 'desc'
}

function SortToggler({ type }: { type?: SortType }) {
  return (
    <Stack className="ms-2 text-secondary opacity-50">
      <i className={`ti ti-caret-up-filled ${type === SortType.ASC ? 'text-dark' : ''}`} />
      <i className={`ti ti-caret-down-filled mt-n1 ${type === SortType.DESC ? 'text-dark' : ''}`} />
    </Stack>
  );
}

interface HeaderSortProps {
  column: Column<any, unknown>;
  sort?: boolean;
}

// ==============================|| SORTING - HEADER SORT ||============================== //

export default function HeaderSort({ column, sort }: HeaderSortProps) {
  return (
    <div {...(sort && { onClick: column.getToggleSortingHandler() })}>
      {{
        asc: <SortToggler type={SortType.ASC} />,
        desc: <SortToggler type={SortType.DESC} />
      }[column.getIsSorted() as string] ?? <SortToggler />}
    </div>
  );
}
