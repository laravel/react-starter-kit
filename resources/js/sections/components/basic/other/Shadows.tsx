// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| OTHER - SHADOWS ||============================== //

export default function Shadows() {
  return (
    <MainCard title="Shadows">
      <div className="shadow-none p-3 mb-3 bg-body rounded">No shadow</div>
      <div className="shadow-sm p-3 mb-3 rouneded">Small shadow</div>
      <div className="shadow p-3 mb-3 rouneded">Regular shadow</div>
      <div className="shadow-lg p-3 mb-3 rouneded">Larger shadow</div>
    </MainCard>
  );
}
