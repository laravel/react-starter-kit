// react-bootstrap
import ProgressBar from 'react-bootstrap/ProgressBar';

// project-imports
import MainCard from '@/components/MainCard';

// =============================|| WIDGET - GENDER PROGRESS ||============================== //

export default function GenderProgress() {
  return (
    <MainCard title="Gender" className="progress-gender" subheader={<p className="mb-0">325 Employees</p>}>
      <h6 className="m-b-10">
        Female <span className="float-end">Male</span>
      </h6>

      <ProgressBar className="rounded-0 hei-10">
        <ProgressBar className="bg-brand-color-2" now={30} />
        <ProgressBar className="bg-brand-color-1" now={30} />
      </ProgressBar>

      <h5 className="f-w-300 m-t-20 text-muted">
        62%<span className="float-end">28%</span>
      </h5>

      <h6 className="m-b-10 m-t-20">
        Female <span className="float-end">Male</span>
      </h6>

      <ProgressBar className="rounded-0 hei-10">
        <ProgressBar className="bg-brand-color-2" now={40} key={1} />
        <ProgressBar className="bg-brand-color-1" now={30} key={2} />
      </ProgressBar>

      <h5 className="f-w-300 m-t-20 text-muted">
        60%<span className="float-end">50%</span>
      </h5>

      <h6 className="m-b-10 m-t-20">
        Female <span className="float-end">Male</span>
      </h6>

      <ProgressBar className="rounded-0 hei-10">
        <ProgressBar className="bg-brand-color-2" now={50} />
        <ProgressBar className="bg-brand-color-1" now={50} />
      </ProgressBar>

      <h5 className="f-w-300 m-t-20 text-muted">
        50%<span className="float-end">50%</span>
      </h5>
    </MainCard>
  );
}
