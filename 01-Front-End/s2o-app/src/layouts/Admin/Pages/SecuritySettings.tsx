import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SecuritySettings: React.FC = () => {
  const [enable2FA, setEnable2FA] = useState<boolean>(false);
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [sessionTimeout, setSessionTimeout] = useState<number>(30);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log({ enable2FA, passwordLength, sessionTimeout });
  };

  return (
    <div>
      <h2>Security Settings</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="enable2FA">
          <Form.Check
            type="checkbox"
            label="Enable Two-Factor Authentication (2FA)"
            checked={enable2FA}
            onChange={(e) => setEnable2FA(e.target.checked)}
          />
        </Form.Group>

        <Form.Group controlId="passwordLength">
          <Form.Label>Minimum Password Length</Form.Label>
          <Form.Control
            type="number"
            min="6"
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="sessionTimeout">
          <Form.Label>Session Timeout (minutes)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={sessionTimeout}
            onChange={(e) => setSessionTimeout(Number(e.target.value))}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default SecuritySettings;
