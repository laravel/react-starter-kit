// project-imports
import MainCard from '@/components/MainCard';

interface BusinessGrowthCardProps {
  icon: string;
  iconsize: string;
  title: string;
  value: string;
  description: string;
  bgcolor: string;
  className: string;
}

// =============================|| BUSINESS GROWTH CARD ||============================== //

export default function BusinessGrowthCard({ icon, iconsize, title, value, description, bgcolor, className }: BusinessGrowthCardProps) {
  return (
    <MainCard className={bgcolor} bodyClassName="text-center text-white">
      <i className={`${icon} ${iconsize} m-b-20`} />
      <h5 className={className}>{title}</h5>
      <h3 className="text-white f-w-300">{value}</h3>
      <p className="mb-0">{description}</p>
    </MainCard>
  );
}
