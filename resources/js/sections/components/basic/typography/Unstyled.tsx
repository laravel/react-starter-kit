// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| TYPOGRAPHY - UNSTYLED ||============================== //

export default function Unstyled() {
  return (
    <MainCard title="Unstyled">
      <ul className="list-unstyled">
        <li>Lorem ipsum dolor sit amet</li>
        <li>Integer molestie lorem at massa</li>
        <li>Phasellus iaculis neque</li>
        <li>Faucibus porta lacus fringilla vel</li>
        <li>Eget porttitor lorem</li>
      </ul>

      <h5>Inline</h5>
      <hr />
      <ul className="list-inline mb-0">
        <li className="list-inline-item">Lorem ipsum</li>
        <li className="list-inline-item">Phasellus iaculis</li>
        <li className="list-inline-item">Nulla volutpat</li>
      </ul>
    </MainCard>
  );
}
