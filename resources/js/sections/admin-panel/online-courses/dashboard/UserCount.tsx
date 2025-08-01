// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface CourseCardProps {
  icon: string;
  title: string;
  members: string;
  color: string;
  percentage: number;
}

// =============================|| DASHBOARD - COURSE CARD ||============================== //

export default function UserCountCard({ icon, title, members, color, percentage }: CourseCardProps) {
  return (
    <MainCard>
      <Stack direction="horizontal" className="align-items-center">
        <div className="flex-shrink-0">
          <div className={`avatar bg-light-${color}`}>
            <i className={`${icon} f-24`} />
          </div>
        </div>
        <div className="flex-grow-1 ms-3">
          <p className="mb-1">{title}</p>
          <Stack direction="horizontal" className="align-items-center justify-content-between">
            <h4 className="mb-0">{members}</h4>
            <span className={`text-${color} fw-medium`}>{percentage}%</span>
          </Stack>
        </div>
      </Stack>
    </MainCard>
  );
}
