import { useState, useMemo } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

// third-party
import Slider from 'rc-slider';

// project-imports
import LinearWithLabel from '@/components/@extended/progress/LinearWithLabel';
import MainCard from '@/components/MainCard';
import makeData from '@/data/react-table';

// types
import { TableDataProps } from '@/types/table';

// =============================|| REACT TABLE ||============================== //

function TanStackTable({ columns, initialData, striped }: { columns: any[]; initialData: any[]; striped?: boolean }) {
  const [data, setData] = useState<TableDataProps[]>(initialData);
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleEditToggle = (field: string, rowIndex: number) => {
    setEditing((prev) => ({
      ...prev,
      [`${field}-${rowIndex}`]: !prev[`${field}-${rowIndex}`]
    }));
  };

  const handleFieldChange = (field: string, value: any, rowIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      [`${field}-${rowIndex}`]: value
    }));
  };

  const handleSave = (field: string, rowIndex: number) => {
    const updatedData = [...data];
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [field]: formData[`${field}-${rowIndex}`]
    };
    0;

    setData(updatedData);

    setFormData((prev) => ({ ...prev, [`${field}-${rowIndex}`]: undefined }));
    setEditing((prev) => ({ ...prev, [`${field}-${rowIndex}`]: false }));
  };
  return (
    <MainCard title="Editable Cell" className="table-card">
      <Table responsive striped={striped} className="mb-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header} className={`${['Age', 'Visits'].includes(column.header) ? 'text-end' : ''}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => {
                const field = column.accessorKey as string;
                const currentValue = formData[`${field}-${rowIndex}`] ?? row[field as keyof TableDataProps];

                return (
                  <td key={column.header} className={`${['Age', 'Visits'].includes(column.header) ? 'text-end' : ''}  `}>
                    {editing[`${field}-${rowIndex}`] ? (
                      field === 'status' ? (
                        <Form.Select
                          value={currentValue}
                          onChange={(e) => handleFieldChange(field, e.target.value, rowIndex)}
                          onBlur={() => handleSave(field, rowIndex)}
                        >
                          <option value="Complicated">Complicated</option>
                          <option value="Relationship">Relationship</option>
                          <option value="Single">Single</option>
                        </Form.Select>
                      ) : field === 'progress' ? (
                        <Slider
                          defaultValue={currentValue}
                          onChange={(value: number) => handleFieldChange(field, value, rowIndex)}
                          onAfterChange={() => handleSave(field, rowIndex)}
                        />
                      ) : (
                        <Form.Control
                          type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                          value={currentValue}
                          onChange={(e) => handleFieldChange(field, e.target.value, rowIndex)}
                          onBlur={() => handleSave(field, rowIndex)}
                        />
                      )
                    ) : field === 'status' ? (
                      <Badge
                        bg={row[field] === 'Complicated' ? 'light-danger' : row[field] === 'Relationship' ? 'light-success' : 'light-info'}
                        onClick={() => handleEditToggle(field, rowIndex)}
                      >
                        {row[field]}
                      </Badge>
                    ) : field === 'progress' ? (
                      <LinearWithLabel value={currentValue} onClick={() => handleEditToggle(field, rowIndex)} />
                    ) : (
                      <span onClick={() => handleEditToggle(field, rowIndex)}>{row[field as keyof TableDataProps]}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </MainCard>
  );
}

// ==============================|| EDIT TABLE - EDITABLE CELL ||============================== //

export default function EditableCellTable({ striped }: { striped?: boolean; title?: string }) {
  const data: TableDataProps[] = makeData(10);

  const columns = useMemo(
    () => [
      { header: 'Name', accessorKey: 'fullName' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Age', accessorKey: 'age', meta: { className: 'text-end' } },
      { header: 'Visits', accessorKey: 'visits', meta: { className: 'text-end' } },
      { header: 'Status', accessorKey: 'status' },
      { header: 'Profile Progress', accessorKey: 'progress' }
    ],
    []
  );

  return <TanStackTable columns={columns} initialData={data} striped={striped} />;
}
