// react-bootstrap
import { EventInput } from '@fullcalendar/common';
import { deleteEvent } from '@/api/calender';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

// third-party
import Swal from 'sweetalert2';

interface EventDetailProps {
  icon: string;
  bgColor: string;
  title: string;
  className: string;
  value: string;
}

interface EventProps {
  isModalOpen: boolean;
  handleModal: () => void;
  selectedEvent: EventInput | null;
  handleEventModal: () => void;
  setModalOpen: (open: boolean) => void;
}

function handleConfirmDialog(id: string | undefined) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons
    .fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteEvent(id ?? '');
        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
}

function EventDetail({ icon, bgColor, title, className, value }: EventDetailProps) {
  return (
    <Stack direction="horizontal" className="align-items-start">
      <div className="flex-shrink-0">
        <div className={`avatar avatar-xs ${bgColor}`}>
          <i className={`ti ${icon} f-20`}></i>
        </div>
      </div>
      <div className="flex-grow-1 ms-3">
        <h5 className="mb-1">
          <b>{title}</b>
        </h5>
        <p className={`${className} text-muted`}>{value}</p>
      </div>
    </Stack>
  );
}

// ==============================|| CALENDAR - EVENT DETAIL MODAL ||============================== //

export default function EventDetailModal({ isModalOpen, handleModal, selectedEvent, handleEventModal, setModalOpen }: EventProps) {
  return (
    <Modal show={isModalOpen} onHide={handleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedEvent?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EventDetail
          icon="ti-heading"
          bgColor="bg-light-secondary"
          title="Title"
          className="pc-event-title"
          value={selectedEvent?.title ?? ''}
        />
        <EventDetail icon="ti-map-pin" bgColor="bg-light-warning" title="Venue" className="pc-event-venue" value="City Town" />
        <EventDetail
          icon="ti-calendar-event"
          bgColor="bg-light-danger"
          title="Date"
          className="pc-event-date"
          value={
            selectedEvent?.start
              ? Array.isArray(selectedEvent.start)
                ? 'Date range'
                : new Date(selectedEvent.start).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })
              : 'No date available'
          }
        />
        <EventDetail
          icon="ti-file-text"
          bgColor="bg-light-primary"
          title="Description"
          className="pc-event-description"
          value={selectedEvent?.description}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <ListGroup horizontal className="me-auto mb-0">
          <ListGroup.Item className="border-0 p-0">
            <a
              id="pc_event_remove"
              className="avatar avatar-s btn-link-danger btn-pc-default w-sm-auto"
              data-bs-toggle="tooltip"
              title="Delete"
              onClick={(e) => {
                e.preventDefault();
                handleConfirmDialog(selectedEvent?.id);
                setModalOpen(false);
              }}
            >
              <i className="ti ti-trash f-18" />
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="border-0 p-0">
            <a
              id="pc_event_edit"
              className="avatar avatar-s btn-link-success btn-pc-default"
              onClick={handleEventModal}
              data-bs-toggle="tooltip"
              title="Edit"
            >
              <i className="ti ti-edit-circle f-18"></i>
            </a>
          </ListGroup.Item>
        </ListGroup>
        <Button onClick={handleModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
