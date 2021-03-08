import { Card, Container } from "react-bootstrap";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { LoginModel, loginSchema } from "../../models/formsSchemas";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Link } from "react-router-dom";
import React from "react";
import { Routes } from "../../../../app/consts/RoutersConsts";
import { logInUser } from "../../../../store/auth/authActions";
import { loginValues } from "../../models/formsValues";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  return (
    <AsyncWrapper>
      <Container fluid="sm">
        <Card
          className="p-3 mt-5 mx-auto shadow-lg p-3 mb-5 bg-white rounded"
          style={{ maxWidth: "700px" }}
        >
          <Formik
            initialValues={loginValues}
            validationSchema={loginSchema}
            onSubmit={(values: LoginModel) => {
              dispatch(logInUser(values));
            }}
          >
            <FormikForm>
              <h2 className="text-center">Login</h2>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  as={Field}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />

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
                Log in
              </Button>
            </FormikForm>
          </Formik>
        </Card>
        <p className="text-light text-center">
          Don't have account?{" "}
          <Link to={Routes.Register}>
            <span className="text-warning underline">
              <u> Register here</u>
            </span>{" "}
          </Link>
        </p>
      </Container>
    </AsyncWrapper>
  );
}
