import { ReactElement } from 'react';

// third-party
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { Header, Table } from '@tanstack/react-table';

// types
import { TableDataProps } from '@/types/table';

// ==============================|| REACT TABLE - DRAGGABLE COLUMN HEADER ||============================== //

export default function DraggableColumnHeader({
  header,
  className,
  children
}: {
  header: Header<TableDataProps, unknown>;
  className: string;
  table: Table<TableDataProps>;
  children: ReactElement;
}) {
  const { column } = header;

  const { setNodeRef: setDropRef } = useDroppable({
    id: column.id
  });

  const {
    setNodeRef: setDragRef,
    attributes,
    listeners
  } = useDraggable({
    id: column.id
  });

  return (
    <th ref={setDropRef} colSpan={header.colSpan} {...header.column.columnDef.meta} className={`${className} `}>
      <div ref={setDragRef} {...listeners} {...attributes}>
        {children}
      </div>
    </th>
  );
}
