import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  EducSchemaModel,
  ExpModel,
  ExperienceSchema,
  educationSchema,
  experienceSchema,
} from "../../models/formSchema";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import React, { useEffect, useState } from "react";
import {
  addEducation,
  addExperience,
  deleteEducation,
  deleteExperience,
  getUserProfile,
} from "../../../../store/profiles/profilesActions";
import { educationValues, experienceValues } from "../../models/formValues";

import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

export interface EditExpFormProps {
  experience?: ExperienceSchema;
}

const EditExpForm = ({ experience }: EditExpFormProps) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isCurrent, setIsCurrent] = useState(false);
  const removeExperience = () => {
    experience?._id && dispatch(deleteExperience(experience._id));
    dispatch(getUserProfile());
  };
  useEffect(() => {
    experience?.current && setIsCurrent(experience.current);
  }, [experience]);

  return (
    <Card className="mb-4 p-3 ">
      <Formik
        initialValues={experienceValues(experience)}
        validationSchema={experienceSchema}
        onSubmit={(values: ExperienceSchema) => {
          values.current = isCurrent;
          if (isCurrent) values.to = undefined;
          dispatch(addExperience(values));
        }}
      >
        <FormikForm>
          {!experience && <h4>Add new</h4>}
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  as={Field}
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter your title"
                />
                <ErrorMessage
                  name="title"
                  className="text-danger"
                  component="p"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  as={Field}
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Enter company name"
                />
                <ErrorMessage
                  name="company"
                  className="text-danger"
                  component="p"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              as={Field}
              id="location"
              name="location"
              type="text"
              placeholder="Enter location"
            />
            <ErrorMessage
              name="location"
              className="text-danger"
              component="p"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as={Field}
              id="description"
              name="description"
              type="text"
              placeholder="Enter description"
            />
            <ErrorMessage
              name="description"
              className="text-danger"
              component="p"
            />
          </Form.Group>

          <Form.Group>
            <p>Date: </p>
            <Row>
              <Col md={5}>
                <span className="mr-2"> From:</span>
                <Field
                  as={DatePicker}
                  name="from"
                  id="from"
                  selected={startDate}
                  onChange={(date: Date) => date && setStartDate(date)}
                />
                <ErrorMessage
                  name="from"
                  className="text-danger"
                  component="p"
                />
              </Col>

              <Col md={5}>
                <span className="mr-2"> To:</span>
                <Field
                  as={DatePicker}
                  name="to"
                  id="to"
                  selected={endDate}
                  onChange={(date: Date) => date && setEndDate(date)}
                  disabled={isCurrent}
                />
                <ErrorMessage name="to" className="text-danger" component="p" />
              </Col>
              <Col md={1}>
                <Row className="mx-center">
                  <Form.Label className="mr-2">Current</Form.Label>
                  <Form.Check
                    as={Field}
                    id="current"
                    name="current"
                    type="checkbox"
                    checked={isCurrent}
                    onChange={() => setIsCurrent(!isCurrent)}
                  />
                  <ErrorMessage
                    name="current"
                    className="text-danger"
                    component="p"
                  />
                </Row>
              </Col>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit">
            Confirm
          </Button>
          {experience && (
            <Button
              variant="outline-danger"
              type="button"
              onClick={removeExperience}
              className="ml-2"
            >
              Remove
            </Button>
          )}
        </FormikForm>
      </Formik>
    </Card>
  );
};

export default EditExpForm;
