// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| FORM FIELD CONFIGURATION ||============================== //

const formFields = [
  { id: 'firstName', label: 'First Name', placeholder: 'Enter first name' },
  { id: 'lastName', label: 'Last Name', placeholder: 'Enter last name' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
  { id: 'regDate', label: 'Registration Date', type: 'date' },
  { id: 'idNumber', label: 'ID Number', type: 'number', placeholder: 'Enter ID number' },
  { id: 'course', label: 'Course', type: 'select', options: ['Course', 'Course 1', 'Course 2'] },
  { id: 'mobile', label: 'Mobile Number', type: 'phone', placeholder: 'Enter mobile number' },
  { id: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male'] },
  { id: 'parentsName', label: 'Parents Name', placeholder: 'Enter parents name' },
  { id: 'parentsMobile', label: 'Parents Mobile Number', type: 'phone', placeholder: 'Enter parents mobile number' },
  { id: 'dob', label: 'Date of Birth', type: 'date' },
  { id: 'bloodGroup', label: 'Blood Group', placeholder: 'Enter blood group' },
  { id: 'address', label: 'Shipping Address', as: 'textarea', rows: 2, placeholder: 'Enter address' },
  { id: 'profilePic', type: 'file' }
];

// ==============================|| STUDENT - ADD ||============================== //

export default function StudentAdd() {
  return (
    <MainCard title="Basic Information">
      <Row>
        {formFields.map((field, index) => (
          <Col md={field.id === 'address' || field.id === 'profilePic' ? 12 : 6} key={index}>
            <div className="mb-3">
              {field.label && <Form.Label>{field.label}</Form.Label>}

              {field.type === 'select' ? (
                <Form.Select>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control
                  type={field.type || 'text'}
                  as={typeof field.as === 'string' ? (field.as as React.ElementType) : undefined}
                  rows={field.rows}
                  placeholder={field.placeholder}
                />
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
