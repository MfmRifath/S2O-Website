import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SiteSettings: React.FC = () => {
  const [siteName, setSiteName] = useState<string>('');
  const [siteDescription, setSiteDescription] = useState<string>('');
  const [language, setLanguage] = useState<string>('en');
  const [theme, setTheme] = useState<string>('light');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log({ siteName, siteDescription, language, theme });
  };

  return (
    <div>
      <h2>Site Settings</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="siteName">
          <Form.Label>Site Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter site name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group controlId="siteDescription">
          <Form.Label>Site Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter site description"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="language">
          <Form.Label>Language</Form.Label>
          <Form.Control
            as="select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            {/* Add more languages as needed */}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="theme">
          <Form.Label>Theme</Form.Label>
          <Form.Control
            as="select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            {/* Add more themes as needed */}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default SiteSettings;
