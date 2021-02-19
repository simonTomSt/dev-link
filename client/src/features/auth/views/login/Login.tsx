import { Card, Container } from "react-bootstrap";

import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import React from "react";

export default function Login() {
  return (
    <Container fluid="sm">
      <Card className="p-3 mt-5 mx-auto " style={{ maxWidth: "700px" }}>
        <Form>
          <Form>
            <h2 className="text-center">Login</h2>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Form>
      </Card>
    </Container>
  );
}
