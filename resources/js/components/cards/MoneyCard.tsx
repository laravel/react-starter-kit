// react-bootstrap
import Image from 'react-bootstrap/Image';
import ProgressBar, { ProgressBarProps } from 'react-bootstrap/ProgressBar';
import Stack from 'react-bootstrap/Stack';

// project-imports
import DropDown from '@/sections/dashboard/finance/DropDown';
import MainCard from '@/components/MainCard';

interface MoneyCardProps {
  image: string;
  title: string;
  value: number;
  progress: ProgressBarProps;
}

// ==============================|| ORDER STATUS CARD ||============================== //

export default function MoneyCard({ image, title, progress, value }: MoneyCardProps) {
  return (
    <MainCard className="shadow-none border mb-0" bodyClassName="p-3">
      <Stack direction="horizontal" className="align-items-center justify-content-between mb-3">
        <Image src={image} />
        <DropDown />
      </Stack>
      <h6 className="mb-3">{title}</h6>
      <div className="bg-dark p-3 pt-4 rounded-4">
        <ProgressBar className="bg-white bg-opacity-25">
          <ProgressBar {...progress} className="bg-white" />
        </ProgressBar>
        <Stack direction="horizontal" className="align-items-center justify-content-between mt-2">
          <p className="mb-0 text-white text-opacity-75 text-sm">{progress.now}%</p>
          <p className="mb-0 text-white text-opacity-75 text-sm">${value}</p>
        </Stack>
      </div>
    </MainCard>
  );
}
