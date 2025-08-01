import { useState } from 'react';

// react-bootstrap
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';

// project-imports
import MainCard from '@/components/MainCard';

// ==============================|| PROFILE - EMAIL SETTINGS ||============================== //

export default function EmailSettings() {
  const [notifications, setNotifications] = useState({
    emailNotification: true,
    copyToPersonal: false,
    newNotifications: true,
    directMessage: true,
    newConnection: true,
    newOrder: true,
    membershipApproval: true,
    memberRegistration: true,
    newsUpdates: true,
    tips: true,
    missedUpdates: true,
    productNews: true,
    businessTips: true
  });

  type NotificationKey = keyof typeof notifications;

  const handleToggle = (key: NotificationKey) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <MainCard
      title={
        <Stack direction="horizontal" className="justify-content-between align-items-center">
          <h5>
            <i className="ph ph-envelope-open align-text-bottom text-primary f-20" /> Email Settings
          </h5>
          <Dropdown align="end">
            <Dropdown.Toggle as="div" bsPrefix="toggle" className="p-0 border-0 bg-transparent shadow-none" id="dropdown-custom">
              <i className="ti ti-dots" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="text-primary">
                <i className="ti ti-maximize" /> Maximize
              </Dropdown.Item>
              <Dropdown.Item className="text-primary">
                <i className="ti ti-minus" /> Collapse
              </Dropdown.Item>
              <Dropdown.Item className="text-primary">
                <i className="ti ti-refresh" /> Reload
              </Dropdown.Item>
              <Dropdown.Item className="text-primary">
                <i className="ti ti-trash" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      }
      footerClassName="text-end"
      footer={
        <>
          <Button variant="warning">Update Change</Button>
          <Button variant="outline-dark" className="ms-2">
            Clear
          </Button>
        </>
      }
    >
      <ListGroup variant="flush">
        <ListGroup.Item className="py-4">
          <h5>Setup Email Notification</h5>
          <Form className="mt-3 m-l-40">
            <Form.Check
              type="switch"
              id="emailNotification"
              label="Email Notification"
              checked={notifications.emailNotification}
              onChange={() => handleToggle('emailNotification')}
            />
            <Form.Check
              type="switch"
              id="copyToPersonal"
              label="Send Copy To Personal Email"
              checked={notifications.copyToPersonal}
              onChange={() => handleToggle('copyToPersonal')}
            />
          </Form>
        </ListGroup.Item>
        <ListGroup.Item className="py-4">
          <h5>Activity Related Emails</h5>
          <h6 className="mt-4 m-l-40">When to email?</h6>
          {(
            [
              { key: 'newNotifications', label: 'Have new notifications' },
              { key: 'directMessage', label: "You're sent a direct message" },
              { key: 'newConnection', label: 'Someone adds you as a connection' }
            ] as { key: NotificationKey; label: string }[]
          ).map(({ key, label }) => (
            <Form.Check
              className="m-l-40"
              key={key}
              type="switch"
              id={key}
              label={label}
              checked={notifications[key]}
              onChange={() => handleToggle(key)}
            />
          ))}
          <h6 className="mt-4 m-l-40">When to escalate emails?</h6>
          {(
            [
              { key: 'newOrder', label: 'Upon new order' },
              { key: 'membershipApproval', label: 'New membership approval' },
              { key: 'memberRegistration', label: 'Member registration' }
            ] as { key: NotificationKey; label: string }[]
          ).map(({ key, label }) => (
            <Form.Check
              className="m-l-40"
              key={key}
              type="switch"
              id={key}
              label={label}
              checked={notifications[key]}
              onChange={() => handleToggle(key)}
            />
          ))}
        </ListGroup.Item>
        <ListGroup.Item className="py-4">
          <h5>Updates From System Notification</h5>
          <h6 className="m-l-40 mt-4">Email you with?</h6>
          {(
            [
              { key: 'newsUpdates', label: 'News about PCT-themes products and feature updates' },
              { key: 'tips', label: 'Tips on getting more out of PCT-themes' },
              { key: 'missedUpdates', label: 'Things you missed since last login' },
              { key: 'productNews', label: 'News about products and other services' },
              { key: 'businessTips', label: 'Tips and Document business products' }
            ] as { key: NotificationKey; label: string }[]
          ).map(({ key, label }) => (
            <Form.Check
              className="m-l-40"
              key={key}
              type="checkbox"
              id={key}
              label={label}
              checked={notifications[key]}
              onChange={() => handleToggle(key)}
            />
          ))}
        </ListGroup.Item>
      </ListGroup>
    </MainCard>
  );
}
