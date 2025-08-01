// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| FORM FIELD CONFIGURATION ||============================== //

const formFields = [
  { id: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name' },
  { id: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter last name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
  { id: 'joiningDate', label: 'Joining Date', type: 'date' },
  { id: 'password', label: 'Password', type: 'password', placeholder: 'Enter password' },
  { id: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Enter confirm password' },
  { id: 'mobile', label: 'Mobile Number', type: 'phone', placeholder: 'Enter mobile number' },
  { id: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male'] },
  { id: 'designation', label: 'Designation', type: 'text', placeholder: 'Enter designation' },
  { id: 'department', label: 'Department', type: 'select', options: ['Department', 'Department 1', 'Department 2'] },
  { id: 'dob', label: 'Date of Birth', type: 'date' },
  { id: 'education', label: 'Education', type: 'text', placeholder: 'Enter education' },
  { id: 'profilePic', type: 'file' }
];

// ==============================|| TEACHER - ADD ||============================== //

export default function TeacherAdd() {
  return (
    <MainCard title="Basic Information">
      <Row>
        {formFields.map((field, index) => (
          <Col md={field.type === 'file' ? 12 : 6} key={index}>
            <div className="mb-3">
              {field.label && <Form.Label>{field.label}</Form.Label>}

              {field.type === 'select' ? (
                <Form.Select>
                  {field.options?.map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control type={field.type} placeholder={field.placeholder} />
              )}
            </div>
          </Col>
        ))}

        <Col md={12} className="text-end">
          <Button>Submit</Button>
        </Col>
      </Row>
    </MainCard>
  );
}
