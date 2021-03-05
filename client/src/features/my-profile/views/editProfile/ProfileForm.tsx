import { Button, Form, Row } from "react-bootstrap";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { ProfileModel, profileSchema } from "../../models/formSchema";

import { Link } from "react-router-dom";
import { ProfileRespModel } from "../../../../store/profiles/profilesModels";
import React from "react";
import { Routes } from "../../../../app/consts/RoutersConsts";
import { createUserProfile } from "../../../../store/profiles/profilesActions";
import { profileValues } from "../../models/formValues";
import { useDispatch } from "react-redux";

interface Props {
  profile?: ProfileRespModel;
}

const ProfileForm = ({ profile }: Props) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={profileValues(profile)}
      validationSchema={profileSchema}
      onSubmit={(values: ProfileModel) => {
        dispatch(createUserProfile(values));
      }}
    >
      <FormikForm>
        <h2 className="text-center">Your profile details</h2>
        <Form.Group>
          <Form.Label>Your status</Form.Label>
          <Form.Control
            as={Field}
            id="status"
            name="status"
            type="text"
            placeholder="Enter your company name"
          />
          <ErrorMessage name="status" className="text-danger" component="p" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Company</Form.Label>
          <Form.Control
            as={Field}
            id="company"
            name="company"
            type="text"
            placeholder="Enter your company name"
          />
          <ErrorMessage name="company" className="text-danger" component="p" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Website</Form.Label>
          <Form.Control
            as={Field}
            id="email"
            name="website"
            type="website"
            placeholder="Enter company website address"
          />
          <ErrorMessage name="website" className="text-danger" component="p" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            as={Field}
            id="location"
            name="location"
            type="text"
            placeholder="Enter company location"
          />
          <ErrorMessage name="location" className="text-danger" component="p" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Skills</Form.Label>
          <Form.Control
            as={Field}
            id="skills"
            name="skills"
            type="text"
            placeholder="Enter your skills"
          />
          <ErrorMessage name="skills" className="text-danger" component="p" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Github</Form.Label>
          <Form.Control
            as={Field}
            id="githubUserName"
            name="githubUserName"
            type="text"
            placeholder="Enter github username"
          />
          <ErrorMessage
            name="githubUserName"
            className="text-danger"
            component="p"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            as={Field}
            id="twitter"
            name="twitter"
            type="text"
            placeholder="Enter github username"
          />
          <ErrorMessage name="twitter" className="text-danger" component="p" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Facebook</Form.Label>
          <Form.Control
            as={Field}
            id="facebook"
            name="facebook"
            type="text"
            placeholder="Enter github username"
          />
          <ErrorMessage name="facebook" className="text-danger" component="p" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Short description</Form.Label>

          <Field
            id="bio"
            name="bio"
            type="text"
            rows={6}
            placeholder="Describe yourself"
            as={Form.Control}
          />

          <ErrorMessage name="bio" className="text-danger" component="p" />
        </Form.Group>
        <Form.Group>
          <Row>
            <Button
              as={Link}
              to={Routes.EditMyEduc}
              variant="outline-success ml-2"
            >
              Change your education
            </Button>
            <Button
              as={Link}
              to={Routes.EditMyExp}
              variant="outline-danger ml-2"
            >
              Change your experience
            </Button>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Confirm
        </Button>
      </FormikForm>
    </Formik>
  );
};

export default ProfileForm;
