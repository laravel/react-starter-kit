// react-bootstrap
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| BUTTON - LARGE ||============================== //

export default function LargeButton() {
  return (
    <MainCard title="Sizes [Large]">
      <p>
        use <code>.btn-lg</code> in class <code>.btn</code> class to get Large button
      </p>
      <Stack direction="horizontal" gap={2}>
        <Button size="lg">Large button</Button>
        <Button variant="secondary" size="lg">
          Large button
        </Button>
      </Stack>
    </MainCard>
  );
}
