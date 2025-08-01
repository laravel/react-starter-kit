import React, { useState } from 'react';

// react-bootstrap
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

interface AccountFormData {
  username: string;
  email: string;
  language: string;
  signinMethod: string;
}

interface InputProps {
  label: string;
  name: keyof AccountFormData;
  type?: string;
  options?: string[] | null;
  required?: boolean;
}

interface DeviceData {
  icon: string;
  name: string;
  location: string;
  active: boolean;
  lastActive: string;
}

const languageOptions = ['Washington', 'India', 'Africa', 'New York', 'Malaysia'];
const signinOptions = ['Password', 'Face Recognition', 'Thumb Impression', 'Key', 'Pin'];

// initial data
const initialData: AccountFormData = {
  username: 'Ashoka_Tano_16',
  email: 'demo@sample.com',
  language: 'Washington',
  signinMethod: 'Password'
};

// device data
const devices: DeviceData[] = [
  { icon: 'monitor', name: 'Cett Desktop', location: '4351 Deans Lane, Elmsford', active: true, lastActive: 'Current Active' },
  {
    icon: 'device-tablet-camera',
    name: 'Imoon Tablet',
    location: '4185 Michigan Avenue, SHIPPINGPORT',
    active: false,
    lastActive: 'Active 5 days ago'
  },
  {
    icon: 'ph ph-device-mobile-camera ',
    name: 'Asbs Mobile',
    location: '3462 Fairfax Drive, Montclair',
    active: false,
    lastActive: 'Active 1 month ago'
  }
];

// ==============================|| PROFILE - ACCOUNT INFORMATION ||============================== //

export default function AccountInformation() {
  const [formData, setFormData] = useState<AccountFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = ({ label, name, type = 'text', options = null, required = false }: InputProps) => (
    <Form.Group controlId={`formBasic${name}`} className="mb-3">
      <Form.Label>
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>
      {options ? (
        <Form.Control as="select" name={name} value={formData[name]} onChange={handleChange}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control type={type} name={name} value={formData[name]} onChange={handleChange} />
      )}
    </Form.Group>
  );

  return (
    <MainCard
      title={
        <>
          <Stack direction="horizontal" className="h5 align-items-center">
            <i className="ph ph-target text-primary f-20" />
            <span className="ms-1">Account Information</span>
          </Stack>
          <small className="text-muted d-block m-l-25 mt-1">Change your account settings</small>
        </>
      }
      footerClassName="text-end"
      footer={
        <>
          <Button variant="success">Update Profile</Button>
          <Button variant="outline-dark" className="ms-2">
            Clear
          </Button>
        </>
      }
    >
      <h5 className="mb-4">General</h5>
      <Row>
        <Col sm={6}>{renderInput({ label: 'Username', name: 'username', type: 'text', required: true })}</Col>
        <Col sm={6}>{renderInput({ label: 'Account Email', name: 'email', type: 'email', required: true })}</Col>
        <Col sm={6}>{renderInput({ label: 'Language', name: 'language', type: 'select', options: languageOptions })}</Col>
        <Col sm={6}>{renderInput({ label: 'SignIn Using', name: 'signinMethod', type: 'select', options: signinOptions })}</Col>
      </Row>
      <hr />
      <h5 className="mb-4">Secure Browsing</h5>
      <Form.Group className="mb-3">
        <Form.Check type="switch" id="customsecbrz1" label="Browsing Securely ( https ) when it's necessary" defaultChecked />
      </Form.Group>
      <hr />
      <h5 className="mb-4">Login Notifications</h5>
      <Form.Group className="mb-3">
        <Form.Check type="switch" id="customsecbrz2" label="Notify when login attempted from another place" defaultChecked />
      </Form.Group>
      <hr />
      <h5 className="mb-3">Login Approvals</h5>
      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          id="customsecbrz3"
          label="Approvals not required when logging in from unrecognized devices"
          defaultChecked
        />
      </Form.Group>

      <hr />
      <h5 className="mb-4">Recognized Devices</h5>
      {devices.map((device, index) => (
        <Stack direction="horizontal" className="mb-2" key={index}>
          <div className="flex-shrink-0">
            <i className={`ph ph-${device.icon} f-20 h3 wid-30 text-center`} />
          </div>
          <div className="flex-grow-1 ms-3">
            <div className="float-end">
              <div className={device.active ? 'text-success d-inline-block me-2' : 'text-muted d-inline-block me-2'}>
                <i className="ti ti-circle-filled f-10 me-2" />
                {device.active ? 'Current Active' : `Active ${device.lastActive}`}
              </div>
              <a className="text-danger">
                <i className="ph ph-x-circle" />
              </a>
            </div>
            <span className="font-weight-bold">{device.name}</span>
            <span className="text-muted"> | {device.location}</span>
          </div>
        </Stack>
      ))}
      <hr />
      <h5 className="mb-4">Active Sessions</h5>
      <Stack direction="horizontal" className="mb-2">
        <div className="flex-shrink-0">
          <i className="ph ph-monitor f-20 h3 wid-30 text-center text-success"></i>
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="float-end">
            <Badge bg="light-danger">Logout</Badge>
          </div>
          <span className="fw-bold">Cett Desktop</span>
          <span className="text-muted">| 4351 Deans Lane, Elmsford</span>
        </div>
      </Stack>
      <Stack direction="horizontal" className="mb-2">
        <div className="flex-shrink-0">
          <i className="ph ph-device-tablet-camera f-20 h3 wid-30 text-center text-success"></i>
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="float-end">
            <Badge bg="light-danger">Logout</Badge>
          </div>
          <span className="fw-bold">Imoon Tablet</span>
          <span className="text-muted">| 4185 Michigan Avenue, SHIPPINGPORT</span>
        </div>
      </Stack>
    </MainCard>
  );
}
