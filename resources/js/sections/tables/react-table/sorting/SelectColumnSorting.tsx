import { SetStateAction } from 'react';

// react-bootstrap
import Form from 'react-bootstrap/Form';

// third-party
import { Column, SortingState, TableState } from '@tanstack/react-table';

interface Props {
  getState: () => TableState;
  setSorting: (value: SetStateAction<SortingState>) => void;
  getAllColumns: () => Column<any, unknown>[];
  size?: 'sm' | 'lg';
}

// ==============================|| SORTING - SELECT COLUMN SORTING ||============================== //

export default function SelectColumnSorting({ getState, getAllColumns, setSorting }: Props) {
  const sortingState = getState().sorting;

  const handleSortChange = (columnId: string) => {
    if (!columnId) {
      setSorting([]);
    } else {
      const isCurrentlySorted = sortingState.length > 0 && sortingState[0].id === columnId;
      setSorting(isCurrentlySorted ? [] : [{ id: columnId, desc: false }]);
    }
  };

  return (
    <Form>
      <Form.Select value={sortingState.length > 0 ? sortingState[0].id : []} onChange={(e) => handleSortChange(e.target.value)}>
        {getAllColumns().map(
          (column) =>
            column.columnDef &&
            column.getCanSort() && (
              <option
                key={column.id}
                value={column.id}
                onClick={() =>
                  setSorting(
                    getState().sorting.length > 0 && column.id === getState().sorting[0].id ? [] : [{ id: column.id, desc: false }]
                  )
                }
              >
                {column.columnDef.header as string}
              </option>
            )
        )}
      </Form.Select>
    </Form>
  );
}
