// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TYPOGRAPHY - HEADINGS ||============================== //

export default function Heading() {
  return (
    <MainCard
      title="Headings"
      subheader={
        <p className="mb-0">
          .h1 through .h6 classes are also available, for when you want to match the font styling of a heading but cannot use the associated
          HTML element.
        </p>
      }
    >
      <h1>h1. Heading</h1>
      <h2>h2. Heading</h2>
      <h3>This is a H3</h3>
      <h4>This is a H4</h4>
      <h5>This is a H5</h5>
      <h6>This is a H6</h6>
    </MainCard>
  );
}
