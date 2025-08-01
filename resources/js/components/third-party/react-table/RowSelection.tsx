// react-bootstrap
import Badge from 'react-bootstrap/Badge';

// =============================|| REACT TABLE - ROW SELECTION ||============================== //

export default function RowSelection({ selected }: { selected: number }) {
  return (
    <>
      {selected > 0 && (
        <Badge bg="secondary" className="position-absolute top-0 end-0 rounded-0 rounded-bottom-start px-2 py-1">
          {selected} row(s) selected
        </Badge>
      )}
    </>
  );
}
