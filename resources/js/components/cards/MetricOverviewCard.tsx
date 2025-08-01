// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface MetricOverviewCardProps {
  title: string;
  icon1: string;
  icon2: string;
  value: number | string;
  description: string;
  label: string;
}

// =============================|| METRIC OVERVIEW CARD ||============================== //

export default function MetricOverviewCard({ title, icon1, icon2, value, description, label }: MetricOverviewCardProps) {
  return (
    <MainCard className="affilate-offers">
      <h5>
        {title}
        <span className="float-end">
          <i className={`card-icon ${icon1} f-24`} />
        </span>
      </h5>
      <Stack direction="horizontal" as="h2" className="mt-4 mb-0  align-items-center justify-content-between f-w-300">
        {value} <Badge className="badge bg-brand-color-1 text-white f-12 f-w-400 float-end">{label}</Badge>
      </Stack>
      <Stack as="h6" direction="horizontal" className=" align-items-center justify-content-center mt-3">
        {description} <i className={`${icon2} text-success f-26 m-l-10`} />
      </Stack>
    </MainCard>
  );
}
