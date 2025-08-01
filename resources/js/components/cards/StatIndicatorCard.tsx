// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface StatIndicatorCardProps {
  icon: string;
  value: string;
  label: string;
  iconColor?: string;
}

// ==============================|| STAT INDICATOR CARD ||============================== //

export default function StatIndicatorCard({ data }: { data: StatIndicatorCardProps[] }) {
  return (
    <MainCard content={false}>
      {data.map((item, index) => (
        <MainCard key={index} className={`shadow-none mb-0 ${index !== data.length - 1 && 'border-bottom'}`}>
          <Stack direction="horizontal" className="gap-4 align-items-center">
            <i className={`${item.icon} f-30 ${item.iconColor ?? ''}`} />
            <Stack>
              <h3 className="f-w-300">{item.value}</h3>
              <span className="d-block text-uppercase">{item.label}</span>
            </Stack>
          </Stack>
        </MainCard>
      ))}
    </MainCard>
  );
}
