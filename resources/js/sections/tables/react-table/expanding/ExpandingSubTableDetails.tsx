import { useState, useEffect, useMemo } from 'react';

// react-bootstrap
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';
import makeData from '@/data/react-table';
import mockData from '@/utils/mock-data';
import { getImageUrl, ImagePath } from '@/utils/getImageUrl';

interface TableDataProps {
  avatar: string;
  fullName: string;
  email: string;
  role: string;
  country: string;
  contact: string;
}

const numRows = mockData(1);

// ==============================|| EXPANDING - EXPANDING SUB TABLE DETAILS ||============================== //

export default function ExpandingSubTableDetails({ row }: { row: { original: TableDataProps } }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TableDataProps[]>([]);

  const columns = useMemo(
    () => [
      { header: 'Avatar', accessor: 'avatar' },
      { header: 'Name', accessor: 'fullName' },
      { header: 'Email', accessor: 'email' },
      { header: 'Role', accessor: 'role' },
      { header: 'Country', accessor: 'country' },
      { header: 'Contact', accessor: 'contact' }
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(makeData(numRows.number.status(1, 5)));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const userData = row.original;

  return (
    <MainCard className="my-3" title={`${userData.fullName}'s Employee List`}>
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <Image
                    src={getImageUrl(`avatar-${item.avatar}.png`, ImagePath.USER)}
                    alt="User Avatar"
                    className="rounded-circle"
                    width={'32px'}
                    height={'32px'}
                  />
                </td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.country}</td>
                <td>{item.contact}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </MainCard>
  );
}
