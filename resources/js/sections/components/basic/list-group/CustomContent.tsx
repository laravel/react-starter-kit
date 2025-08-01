// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| LIST GROUP - CUSTOM CONTENT ||============================== //

export default function CustomContentPage() {
  return (
    <MainCard title="Custom content" subheader="Add nearly any HTML within, even for linked list groups like the one below">
      <ListGroup>
        <ListGroup.Item action active>
          <Stack direction="horizontal" className="justify-content-between align-items-start">
            <h5 className="mb-1 text-white">List group item heading</h5>
            <small>3 days ago</small>
          </Stack>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>Donec id elit non mi porta.</small>
        </ListGroup.Item>

        <ListGroup.Item action>
          <Stack direction="horizontal" className="justify-content-between align-items-start">
            <h5 className="mb-1">List group item heading</h5>
            <small>3 days ago</small>
          </Stack>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>Donec id elit non mi porta.</small>
        </ListGroup.Item>

        <ListGroup.Item action>
          <Stack direction="horizontal" className="justify-content-between align-items-start">
            <h5 className="mb-1">List group item heading</h5>
            <small>3 days ago</small>
          </Stack>
          <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>Donec id elit non mi porta.</small>
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
