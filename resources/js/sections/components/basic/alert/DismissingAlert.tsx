import { useState } from 'react';

// react-bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

// project-imports
import MainCard from '@/components/MainCard';

interface AlertType {
  id: number;
  variant: string;
  message: string;
}

// ==============================|| ALERT - DISMISSING ||============================== //

export default function DismissingAlert() {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const showAlert = () => {
    setAlerts([...alerts, { id: Date.now(), variant: 'success', message: 'Nice, you triggered this alert message' }]);
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <MainCard title="Dismissing Alert">
      {alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.variant} dismissible onClose={() => dismissAlert(alert.id)}>
          {alert.message}
        </Alert>
      ))}
      <Button className="mb-3" onClick={showAlert}>
        Show Live Alert
      </Button>

      <Alert variant="secondary" dismissible>
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </Alert>
      <Alert variant="success" dismissible>
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </Alert>
      <Alert variant="danger" dismissible>
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </Alert>
      <Alert variant="warning" dismissible>
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </Alert>
      <Alert variant="info" dismissible>
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </Alert>
      <Alert variant="dark" dismissible>
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      </Alert>
    </MainCard>
  );
}
