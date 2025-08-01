// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

//==============================|| OTHER - COLORED LINKS ||============================== //

export default function ColoredLinks() {
  return (
    <MainCard
      title={
        <h5>
          Colored links <Badge bg="danger">NEW</Badge>
        </h5>
      }
      subheader={
        <p className="mb-0">
          You can use the <code>.link-* </code> classes to colorize links. These classes have a <code>:hover</code> and
          <code> :focus</code> state.
        </p>
      }
    >
      <Stack direction="horizontal" gap={3} className="flex-wrap">
        <a href="#" className="text-primary">
          Primary link
        </a>
        <a href="#" className="text-secondary">
          Secondary link
        </a>
        <a href="#" className="text-success">
          Success link
        </a>
        <a href="#" className="text-danger">
          Danger link
        </a>
        <a href="#" className="text-warning">
          Warning link
        </a>
        <a href="#" className="text-info">
          Info link
        </a>
        <div className="bg-white px-3 py-2 d-inline-block rounded">
          <a href="#" className="link-dark">
            Dark link
          </a>
        </div>
        <div className="bg-dark px-3 py-2 d-inline-block rounded">
          <a href="#" className="text-light">
            Light link
          </a>
        </div>
      </Stack>
    </MainCard>
  );
}
