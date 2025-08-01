// react-bootstrap
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| WIDGETS DATA - SOCIAL MEDIA COMPARISON CHART ||============================== //

export default function SocialMediaComparisonChart() {
  return (
    <MainCard title="Social Media Comparison" className="social-media">
      <Row>
        <Col xl={12} className="mb-4">
          <h6 className="m-b-8 text-center">
            Facebook <span className="ms-4">Twitter</span>
          </h6>
          <Stack direction="horizontal" className="w-100 justify-content-center align-items-center gap-4">
            <h5 className="mb-0">50%</h5>
            <ProgressBar style={{ width: '80%' }}>
              <ProgressBar className="bg-brand-color-2" key={1} style={{ width: '50%', height: '12px' }} />
              <ProgressBar className="bg-brand-color-1" key={2} style={{ width: '50%', height: '12px' }} />
            </ProgressBar>
            <h5 className="mb-0">50%</h5>
          </Stack>
          <h6 className="m-t-10 text-center text-muted">
            5326 <span className="m-l-15">234</span>
          </h6>
        </Col>
        <Col xl={12} className="mb-4">
          <h6 className="m-b-10 text-center">
            Pinterest <span className="ms-4">Instagram</span>
          </h6>
          <Stack direction="horizontal" className="w-100 justify-content-center align-items-center gap-4">
            <h5 className="mb-0">46%</h5>
            <ProgressBar style={{ width: '65%' }}>
              <ProgressBar className="bg-brand-color-2" key={1} style={{ width: '46%', height: '12px' }} />
              <ProgressBar className="bg-brand-color-1" key={2} style={{ width: '54%', height: '12px' }} />
            </ProgressBar>
            <h5 className="mb-0">54%</h5>
          </Stack>
          <h6 className="m-t-10 text-center text-muted">
            2856 <span className="m-l-15">5258</span>
          </h6>
        </Col>
        <Col xl={12}>
          <h6 className="m-b-20 text-center">
            YouTube <span className="ms-4">Vimeo</span>
          </h6>
          <Stack direction="horizontal" className="w-100 justify-content-center align-items-center gap-4">
            <h5 className="mb-0">41%</h5>
            <ProgressBar style={{ width: '70%' }}>
              <ProgressBar className="bg-brand-color-2" key={1} style={{ width: '41%', height: '12px' }} />
              <ProgressBar className="bg-brand-color-1" key={2} style={{ width: '59%', height: '12px' }} />
            </ProgressBar>
            <h5 className="mb-0">59%</h5>
          </Stack>
          <h6 className="m-t-20 text-center text-muted">
            2989 <span className="m-l-15">2873</span>
          </h6>
        </Col>
      </Row>
    </MainCard>
  );
}
