// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| ALERT - ICONS ||============================== //

export default function IconsAlert() {
  return (
    <MainCard title="Icons Alert">
      <Stack direction="horizontal" as={Alert} className=" align-items-center gap-2">
        <i className="ti ti-info-circle-filled f-24" />
        An example alert with an icon
      </Stack>
      <Stack direction="horizontal" as={Alert} variant="success" className="align-items-center gap-2">
        <i className="ti ti-circle-check-filled f-24" />
        An example success alert with an icon
      </Stack>
      <Stack direction="horizontal" as={Alert} variant="warning" className=" align-items-center gap-2">
        <i className="ti ti-alert-triangle-filled f-24" />
        An example warning alert with an icon
      </Stack>
      <Stack direction="horizontal" as={Alert} variant="danger" className=" align-items-center gap-2">
        <i className="ti ti-alert-triangle-filled f-24" />
        An example danger alert with an icon
      </Stack>
    </MainCard>
  );
}
