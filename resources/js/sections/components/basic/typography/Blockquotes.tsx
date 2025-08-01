// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TYPOGRAPHY - BLOCKQUOTES ||============================== //

export default function Blockquotes() {
  return (
    <MainCard title="Blockquotes">
      <p className="text-muted mb-1">Your awesome text goes here.</p>

      <blockquote className="blockquote">
        <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer className="blockquote-footer">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </footer>
      </blockquote>

      <p className="text-muted m-b-15 m-t-20">
        Add <code>.text-end</code> for a blockquote with right-aligned content.
      </p>

      <blockquote className="blockquote text-end">
        <p className="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
        <footer className="blockquote-footer">
          Someone famous in <cite title="Source Title">Source Title</cite>
        </footer>
      </blockquote>
    </MainCard>
  );
}
