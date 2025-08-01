import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

// third-party
import ReactQuillDemo from '@/components/third-party/ReactQuill';

// assets
import AddUserImg from '@assets/images/admin/img-add-user.png';

interface Props {
  open: boolean;
  modalToggler: (state: boolean) => void;
}

// ==============================|| ADD BIO - MODAL ||============================== //

export default function AddBio({ open, modalToggler }: Props) {
  const [text, setText] = useState('');

  const handleChange = (value: string) => {
    setText(value);
  };

  const closeModal = () => modalToggler(false);

  return (
    <Modal className="fade" show={open} onHide={closeModal} centered>
      <div className="modal-content">
        <Modal.Header closeButton>
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Add Bio
          </h1>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="horizontal" className="flex-column gap-3 align-items-center mb-4">
            <Image src={AddUserImg} fluid alt="img" />
            <Button variant="outline-secondary" size="sm">
              Add Image
            </Button>
          </Stack>
          <ReactQuillDemo value={text} onChange={handleChange} />
          <div className="mt-3 text-center">
            <Button onClick={closeModal}>Add Bio</Button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}
