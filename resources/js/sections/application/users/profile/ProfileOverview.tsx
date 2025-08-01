// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Table from 'react-bootstrap/Table';

// project-imports
import MainCard from '@/components/MainCard';

interface Education {
  year: string;
  title: string;
  degree: string;
  institution: string;
}

interface Employment {
  year: string;
  position: string;
  level: string;
  company: string;
  description?: string;
}

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

// personal data
const personalDetails = [
  { label: 'Full Name', value: 'Akshay Handge' },
  { label: "Father's Name", value: 'Mr. Deepak Handge' },
  { label: 'Address', value: 'Street 110-B Kalani Bag, Dewas, M.P. INDIA' },
  { label: 'Zip Code', value: '12345' },
  { label: 'Phone', value: '+0 123456789 , +0 123456789' },
  { label: 'Email', value: 'support@example.com' },
  {
    label: 'Website',
    value: 'http://example.com'
  }
];

// education data
const educationData: Education[] = [
  {
    year: '2014-2017',
    title: 'Master Degree',
    degree: 'Master Degree in Computer Application',
    institution: 'University of Oxford, England'
  },
  { year: '2011-2013', title: 'Bachelor', degree: 'Bachelor Degree in Computer Engineering', institution: 'Imperial College London' },
  { year: '2009-2011', title: 'School', degree: 'Higher Secondary Education', institution: 'School of London, England' }
];

// employment data
const employmentData: Employment[] = [
  {
    year: 'Current',
    level: 'Senior',
    position: 'Senior UI/UX Designer',
    company: 'Microsoft, TX, USA',
    description:
      'Perform tasks related to project management with a 100+ team under my observation. Team management is a key role in this company.'
  },
  {
    year: '2017-2019',
    level: 'Junior',
    position: 'Trainee cum Project Manager',
    company: 'Microsoft, TX, USA'
  }
];

// skills data
const skillsData: Skill[] = [
  { name: 'Web Designer', percentage: 70, color: 'primary' },
  { name: 'Graphic Designer', percentage: 80, color: 'success' },
  { name: 'UX Researcher', percentage: 85, color: 'success' },
  { name: 'HTML', percentage: 45, color: 'warning' },
  { name: 'WordPress', percentage: 25, color: 'danger' },
  { name: 'PHP', percentage: 65, color: 'primary' }
];

// ==============================|| PROFILE - PROFILE OVERVIEW ||============================== //

export default function ProfileOverview() {
  return (
    <>
      <Alert variant="danger" dismissible>
        <h5 className="alert-heading">
          <i className="ph ph-warning-circle me-2" /> Email Verification
        </h5>
        <p className="mb-0">
          Your email is not confirmed. Please check your inbox. <a className="text-danger">Resend confirmation</a>
        </p>
      </Alert>
      {/* About Me */}
      <MainCard
        title={
          <h5>
            <i className="ph ph-user align-text-bottom text-primary f-20" />
            <span className="p-l-5">About me</span>
          </h5>
        }
      >
        <p>
          Hello, I’m Akshay Handge, a Creative Graphic Designer & User Experience Designer. I create digital products to make them more
          beautiful and usable. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt.
        </p>
        {/* Personal Details */}
        <h5 className="mt-4 mb-3">Personal Details</h5>
        <Table responsive borderless>
          <tbody>
            {personalDetails.map((detail, index) => (
              <tr key={index}>
                <td>{detail.label}</td>
                <td>:</td>
                <td>{detail.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Education Section */}
        <h5 className="mt-5 mb-4 pb-3 border-bottom">Education</h5>
        {educationData.map((edu, index) => (
          <Row key={index} className="align-items-center mb-3">
            <Col sm={3}>
              <h5>{edu.year}</h5>
              <span>{edu.title}</span>
            </Col>
            <Col sm={9} className="border-start">
              <h6>{edu.degree}</h6>
              <p>{edu.institution}</p>
            </Col>
          </Row>
        ))}
        {/* Employment Section */}
        <h5 className="mt-5 mb-4 pb-3 border-bottom">Employment</h5>
        {employmentData.map((job, index) => (
          <Row key={index} className="align-items-center mb-3">
            <Col sm={3}>
              <h5>{job.year}</h5>
              <span className="text-muted">{job.level}</span>
            </Col>
            <Col sm={9} className="border-start">
              <h6>{job.position}</h6>
              {job.description && <p className="mb-1">{job.description}</p>}
              <span className="text-muted">{job.company}</span>
            </Col>
          </Row>
        ))}
        {/* Skills */}
        <h5 className="mt-5 mb-4 pb-3 border-bottom">Skills</h5>
        <Row className="align-items-center mt-3">
          {skillsData.map((skill, index) => (
            <Col md={6} key={index} className="mb-3">
              <h6 className="m-b-10 text-muted">{skill.name}</h6>
              <Row className="align-items-center">
                <Col>
                  <ProgressBar now={skill.percentage} variant={skill.color} style={{ height: '8px' }} />
                </Col>
                <Col xs="auto">
                  <h6 className="mb-0">{skill.percentage}%</h6>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </MainCard>
    </>
  );
}
