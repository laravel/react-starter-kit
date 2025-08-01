// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-import
import MainCard from '@/components/MainCard';

// =============================|| TOOLTIPS ||============================== //

const validationSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  username: yup.string().required('Username is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip is required')
});
export default function FormExample() {
  const formik = useFormik({
    initialValues: {
      firstName: 'Mark',
      lastName: 'Otto',
      username: '',
      city: '',
      state: '',
      zip: ''
    },
    validationSchema,
    onSubmit: () => {}
  });

  return (
    <MainCard title="Tooltips">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <Form.Group as={Col} md="4" controlId="validationFormik101" className="mb-3 position-relative">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              isInvalid={formik.touched.firstName && !!formik.errors.firstName}
              isValid={formik.touched.firstName && !formik.errors.firstName}
            />
            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormik102" className="mb-3 position-relative">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              isInvalid={formik.touched.lastName && !!formik.errors.lastName}
              isValid={formik.touched.lastName && !formik.errors.lastName}
            />

            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" className="mb-3" controlId="validationFormikUsername2">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                aria-describedby="inputGroupPrepend"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.username}
                isValid={formik.touched.firstName && !formik.errors.firstName}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="6" controlId="validationFormik103" className="position-relative mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.city}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.city}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationFormik104" className="position-relative mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.state && formik.touched.state}
            >
              <option value="" disabled>
                Choose...
              </option>
              <option value="Option 1">...</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.state}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationFormik105" className="position-relative mb-3">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" name="zip" value={formik.values.zip} onChange={formik.handleChange} isInvalid={!!formik.errors.zip} />

            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.zip}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Submit form</Button>
      </Form>
    </MainCard>
  );
}
