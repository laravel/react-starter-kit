// react-bootstrap
import Pagination from 'react-bootstrap/Pagination';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| PAGINATION ||============================== //

export default function PaginationExample() {
  return (
    <MainCard title="Pagination">
      <Pagination>
        <Pagination.First>Previous</Pagination.First>
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Last>Next</Pagination.Last>
      </Pagination>

      <h5 className="mt-4 mb-0">Working with Icons</h5>
      <hr className="mt-2" />

      <Pagination>
        <Pagination.First />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Last />
      </Pagination>

      <h5 className="mt-4 mb-0">Disabled and Active States</h5>
      <hr className="mt-2" />

      <Pagination>
        <Pagination.First disabled>Previous</Pagination.First>
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Last>Next</Pagination.Last>
      </Pagination>

      <h5 className="mt-4 mb-0">Sizing</h5>
      <hr className="mt-2" />

      <Pagination size="lg">
        <Pagination.Item disabled>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
      </Pagination>

      <Pagination size="sm">
        <Pagination.Item disabled>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
      </Pagination>

      <h5 className="mt-4 mb-0">Alignment</h5>
      <hr className="mt-2" />

      <Pagination className="justify-content-center">
        <Pagination.First disabled>Previous</Pagination.First>
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Last>Next</Pagination.Last>
      </Pagination>

      <Pagination className="justify-content-end">
        <Pagination.First disabled>Previous</Pagination.First>
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Last>Next</Pagination.Last>
      </Pagination>
    </MainCard>
  );
}
