import "../../../../styles/general.css";

import { Alert, Card, Container } from "react-bootstrap";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { RegisterModel, registerSchema } from "../../models/formsSchemas";
import { connect, useDispatch } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import React from "react";
import { ToastContainer } from "react-toastify";
import { registerUser } from "../../../../store/auth/authActions";
import { registerValues } from "../../models/formsValues";
import { useHistory } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <AsyncWrapper>
        <Container fluid="sm">
          <Card
            className="p-3 mt-5 mx-auto shadow-lg p-3 mb-5 bg-white rounded"
            style={{ maxWidth: "700px" }}
          >
            <Formik
              initialValues={registerValues}
              validationSchema={registerSchema}
              onSubmit={(values: RegisterModel) => {
                dispatch(registerUser(values));
                history.push("/posts");
              }}
            >
              <FormikForm>
                <h2 className="text-center">Register</h2>

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    as={Field}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage
                    name="name"
                    className="text-danger"
                    component="p"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    as={Field}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  <ErrorMessage
                    name="email"
                    className="text-danger"
                    component="p"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    as={Field}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    className="text-danger"
                    component="p"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </FormikForm>
            </Formik>
          </Card>
        </Container>
      </AsyncWrapper>
    </>
  );
}
