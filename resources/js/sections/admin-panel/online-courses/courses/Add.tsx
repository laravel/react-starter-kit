import { useRef } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| COURSE - ADD ||============================== //

export default function CourseAdd() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Row>
      <Col xs={12}>
        <MainCard title="Course Add">
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" placeholder="Enter course name" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Course Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Course code" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Start Form</Form.Label>
                <Form.Control type="date" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Course Duration</Form.Label>
                <Form.Control type="text" placeholder="Enter Course Durations" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Course Price</Form.Label>
                <Form.Control type="number" placeholder="Enter course price" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Teacher Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Teacher name" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Maximum Students</Form.Label>
                <Form.Control type="number" placeholder="Enter maximum students" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Course Status</Form.Label>
                <Form.Select>
                  <option>Deactive</option>
                  <option>Active</option>
                </Form.Select>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label>Course Details</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter course details" />
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <Form action="/file-upload" className="dropzone dz-clickable" onClick={handleClick}>
                  <div className="dz-default text-align-center my-4">
                    <Form.Control type="file" name="file" multiple className="dz-button" style={{ display: 'none' }} ref={fileInputRef} />
                    Drop files here to upload
                  </div>
                </Form>
              </div>
            </Col>
            <Col md={12} className="text-end">
              <Button>Create Course</Button>
            </Col>
          </Row>
        </MainCard>
      </Col>
    </Row>
  );
}
