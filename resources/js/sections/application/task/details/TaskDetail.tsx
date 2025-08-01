// react-bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// detail data
const detailData = [
  {
    icon: 'ph ph-code-block',
    label: 'Project',
    value: <a className="link-secondary">Singular app</a>
  },
  { icon: 'ph ph-arrows-clockwise', label: 'Updated', value: '12 May, 2020' },
  { icon: 'ph ph-feather', label: 'Created', value: '25 Feb, 2019' },
  {
    icon: 'ph ph-flag-checkered',
    label: 'Priority',
    value: (
      <>
        <i className="ph ph-arrow-circle-up f-20 align-middle " /> Highest
      </>
    )
  },
  { icon: 'ph ph-arrow-u-up-left', label: 'Revisions', value: '29' },
  { icon: 'ph ph-user-circle', label: 'Added by', value: 'Winnie' },
  { icon: 'ph ph-tag', label: 'Status', value: 'Published' }
];

// ===========================|| DETAILS - TASK DETAILS ||=========================== //

export default function TaskDetail() {
  return (
    <MainCard title="Task Details" bodyClassName="p-0">
      <ListGroup variant="flush">
        {detailData.map((item, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between">
            <Stack direction="horizontal" gap={1} className="h6 m-0">
              <i className={`${item.icon} text-primary f-20 align-middle`} />
              {item.label} :
            </Stack>
            <div>{item.value}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </MainCard>
  );
}
