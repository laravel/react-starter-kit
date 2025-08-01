// react-bootstrap
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| STATISTICS - WEATHER SUMMARY CARD ||============================== //

export default function WeatherSummaryCard() {
  return (
    <MainCard className="bg-brand-color-2">
      <Stack direction="horizontal" className="align-items-center gap-4">
        <i className="ph ph-sun f-40 text-white" />
        <Stack>
          <h2 className="f-w-300 text-white">
            26° <span className="f-14">Sunny</span>
          </h2>
          <p className="mb-0 d-block text-white">Monday 12:00 PM</p>
        </Stack>
      </Stack>
    </MainCard>
  );
}
