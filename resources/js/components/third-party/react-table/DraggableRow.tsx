import { ReactElement } from 'react';

// third-party
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Row } from '@tanstack/react-table';

// types
import { TableDataProps } from '@/types/table';

// ==============================|| REACT TABLE - DRAGGABLE ROW ||============================== //

export default function DraggableRow({
  row,
  children
}: {
  row: Row<TableDataProps>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
  children: ReactElement;
}) {
  const { setNodeRef: setDropRef } = useDroppable({
    id: `row-${row.id}`
  });

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef
  } = useDraggable({
    id: `row-${row.id}`
  });

  return (
    <tr ref={setDropRef}>
      <td className="text-center">
        <div ref={setDragRef} {...listeners} {...attributes}>
          <i {...attributes} {...listeners} className="ti ti-drag-drop-2 text-secondary f-18" />
        </div>
      </td>
      {children}
    </tr>
  );
}
