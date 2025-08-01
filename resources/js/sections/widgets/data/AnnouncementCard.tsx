// project-imports
import MainCard from '@/components/MainCard';
import branding from '../../../../branding.json';

// ==============================|| WIDGETS DATA - ANNOUNCEMENT CARD ||============================== //

export default function AnnouncementCard() {
  return (
    <MainCard title="Do you know Datta Able is released?">
      <p>{branding.brandName} comes with Bootstrap 4 & Angular 6. It is best kind of own Dashboard categoty.</p>
    </MainCard>
  );
}
