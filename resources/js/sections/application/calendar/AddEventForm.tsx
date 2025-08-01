// react-bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Stack from 'react-bootstrap/Stack';

// third-party
import { EventInput } from '@fullcalendar/common';
import * as Yup from 'yup';
import { useFormik, Form as FormikForm, FormikProvider } from 'formik';

import { createEvent, updateEvent } from '@/api/calender';

interface AddEventFormProps {
  open: boolean;
  handleEventModal: () => void;
  selectedEvent: EventInput | null;
}

const COLOR_CLASS_MAP: Record<string, string> = {
  '#f6ffed': 'event-danger',
  '#8c8c8c': 'event-secondary',
  '#fffbe6': 'event-warning',
  '#faad14': 'event-warning',
  '#52c41a': 'event-success',
  '#1890ff': 'event-primary',
  '#f5222d': 'event-danger',
  '#e6f7ff': 'event-info'
};

// formik validation
const EventSchema = Yup.object().shape({
  title: Yup.string().max(255).required('Title is required'),
  description: Yup.string().max(5000),
  venue: Yup.string().max(255).required('Venue is required'),
  color: Yup.string().max(255)
});

// ==============================|| CALENDAR - ADD EVENT FORM ||============================== //

export default function AddEventForm({ open, handleEventModal, selectedEvent }: AddEventFormProps) {
  const formik = useFormik({
    initialValues: {
      title: selectedEvent?.title || '',
      venue: 'City Town',
      description: selectedEvent?.description || '',
      start: selectedEvent?.start
        ? typeof selectedEvent.start === 'string'
          ? new Date(Date.parse(selectedEvent.start))
          : selectedEvent.start
        : null,
      end: selectedEvent?.end
        ? typeof selectedEvent.end === 'string'
          ? new Date(Date.parse(selectedEvent.end))
          : selectedEvent.end
        : null,
      color: selectedEvent?.color || ''
    },
    validationSchema: EventSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const transformedValues = {
          ...values,
          start: Array.isArray(values.start)
            ? new Date(values.start[0])
            : typeof values.start === 'number'
              ? new Date(values.start)
              : values.start,
          end: Array.isArray(values.end) ? new Date(values.end[0]) : typeof values.end === 'number' ? new Date(values.end) : values.end,
          color: values.color,
          textColor: values.color,
          allDay: true
        };

        if (selectedEvent && selectedEvent.id) {
          await updateEvent(selectedEvent.id, transformedValues);
        } else {
          await createEvent(transformedValues);
        }

        handleEventModal();
        setSubmitting(false);
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitting(false);
      }
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Offcanvas show={open} onHide={handleEventModal} placement="end">
      <Offcanvas.Header closeButton>
        <h3 className="f-w-600 text-truncate">{selectedEvent ? 'Update Event' : 'Add Event'}</h3>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <FormikProvider value={formik}>
          <FormikForm autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event title"
                {...getFieldProps('title')}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Venue</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter event venue"
                {...getFieldProps('venue')}
                isInvalid={touched.venue && !!errors.venue}
              />
              <Form.Control.Feedback type="invalid">{errors.venue}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter event description"
                {...getFieldProps('description')}
                isInvalid={touched.description && !!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {typeof errors.description === 'string' ? errors.description : ''}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                id="pc-e-type"
                {...formik.getFieldProps('color')}
                value={formik.values.color} // Ensure the value is the selected hex color
                onChange={(e) => formik.setFieldValue('color', e.target.value)} // Store hex color
              >
                <option value="">Select Type</option>
                {Object.entries(COLOR_CLASS_MAP).map(([hex, className]) => (
                  <option key={hex} value={hex}>
                    {className.replace('event-', '')}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Stack direction="horizontal" className="justify-content-between">
              <Button variant="outline-danger" className="btn-link-danger btn-pc-default" onClick={handleEventModal}>
                <i className="align-text-bottom me-1 ti ti-circle-x" /> Close
              </Button>
              <Button id="pc_event_add" variant="secondary" type="submit">
                <i className="align-text-bottom me-1 ti ti-calendar-plus" /> {selectedEvent ? 'Update' : 'Add'}
              </Button>
            </Stack>
          </FormikForm>
        </FormikProvider>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
