// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TYPOGRAPHY - INLINE TEXT ELEMENT ||============================== //

export default function InlineTextElement() {
  return (
    <MainCard title="Inline Text Element">
      <p className="lead m-t-0">Your title goes here</p>
      You can use the mark tag to <mark>highlight</mark>.
      <br />
      <del>This line of text is meant to be treated as deleted text.</del>
      <br />
      <ins>This line of text is meant to be treated as an addition to the document.</ins>
      <br />
      <strong>rendered as bold text</strong>
      <br />
      <em>rendered as italicized text</em>
    </MainCard>
  );
}
