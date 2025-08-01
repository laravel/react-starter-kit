// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TYPOGRAPHY - CONTEXTUAL TEXT COLORS ||============================== //

export default function ContextualTextColors() {
  return (
    <MainCard title="Contextual Text Colors">
      <p className="text-muted mb-1">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
      <p className="text-primary mb-1">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
      <p className="text-success mb-1">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      <p className="text-info mb-1">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
      <p className="text-warning mb-1">Etiam porta sem malesuada magna mollis euismod.</p>
      <p className="text-danger mb-1">NDonec ullamcorper nulla non metus auctor fringilla.</p>
      <p className="text-dark mb-1">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
    </MainCard>
  );
}
