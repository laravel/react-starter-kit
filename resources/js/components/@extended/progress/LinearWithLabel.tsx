// react-bootstrap
import ProgressBar, { ProgressBarProps } from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';

type CustomProgressBarProps = ProgressBarProps & {
  value: number;
};

// ==============================|| PROGRESS - LINEAR WITH LABEL ||============================== //

export default function LinearWithLabel({ value, ...others }: CustomProgressBarProps) {
  return (
    <Stack direction="horizontal" className="align-items-center justify-content-between" gap={2}>
      <ProgressBar now={value} {...others} className="w-100" />
      <span className="text-end">{`${Math.round(value!)}%`}</span>
    </Stack>
  );
}
