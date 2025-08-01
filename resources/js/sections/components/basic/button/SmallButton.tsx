// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - SMALL ||============================== //

export default function SmallButton() {
  return (
    <MainCard title="Sizes [Small]">
      <p>
        use <code>.btn-sm</code> in class <code>.btn</code> class to get Small button
      </p>
      <Stack direction="horizontal" gap={2} className="flex-wrap">
        <Button size="sm">Small button</Button>
        <Button variant="secondary" size="sm">
          Small button
        </Button>
      </Stack>
    </MainCard>
  );
}
