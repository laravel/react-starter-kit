// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

// project-imports
import MainCard from '@/components/MainCard';

// assets
import Image1 from '@assets/images/user/avatar-1.png';
import Image2 from '@assets/images/user/avatar-2.png';
import Image3 from '@assets/images/user/avatar-3.png';

// ==============================|| WIDGETS DATA - PROJECT OVERVIEW CARD ||============================== //

export default function ProjectOverviewCard() {
  return (
    <MainCard
      headerClassName="border-bottom-0"
      title={<span className="text-white f-w-600">Project Design Sprint</span>}
      subheader={<span className="d-block text-white mt-2 fs-6">11 MAY 10:35</span>}
      className="Design-sprint bg-brand-color-2"
    >
      <p className="text-white">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      <ul className="design-image">
        <li className="me-2">
          <Button className="btn-icon" variant="light">
            <i className="ti ti-plus f-14 me-0" />
          </Button>
        </li>
        <li className="me-2">
          <Image className="rounded-circle" src={Image1} width={40} />
        </li>
        <li className="me-2">
          <Image className="rounded-circle" src={Image2} width={40} />
        </li>
        <li className="me-2">
          <Image className="rounded-circle" src={Image3} width={40} />
        </li>
        <li className="text-white">+63</li>
      </ul>
    </MainCard>
  );
}
