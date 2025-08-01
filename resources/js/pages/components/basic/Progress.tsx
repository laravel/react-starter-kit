import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// project-imports
import AnimatedStripes from '@/sections/components/basic/progress/AnimatedStripes';
import BackgroundsColors from '@/sections/components/basic/progress/BackgroundsColors';
import HeightProgress from '@/sections/components/basic/progress/HeightProgress';
import LabelProgress from '@/sections/components/basic/progress/LabelProgress';
import MultipleBars from '@/sections/components/basic/progress/MultipleBars';
import ProgressMain from '@/sections/components/basic/progress/Progress';
import StripedProgress from '@/sections/components/basic/progress/StripedProgress';
import ReferenceHeader from '@/components/ReferenceHeader';

// ==============================|| BASIC - PROGRESS BAR ||============================== //

export default function ProgressPage() {
  return (
    <>
      <AppLayout>
        <Head title="Progress" />
        <ReferenceHeader
          caption="Documentation and examples for using React-Bootstrap custom progress bars featuring support for stacked bars, animated backgrounds, and text labels."
          link="https://react-bootstrap.netlify.app/docs/components/progress/"
        />
        <ProgressMain />
        <LabelProgress />
        <HeightProgress />
        <BackgroundsColors />
        <MultipleBars />
        <StripedProgress />
        <AnimatedStripes />
      </AppLayout>
    </>
  );
}
