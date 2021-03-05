import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { EducSchemaModel, educationSchema } from "../../models/formSchema";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import React, { useEffect, useState } from "react";
import {
  addEducation,
  deleteEducation,
} from "../../../../store/profiles/profilesActions";

import DatePicker from "react-datepicker";
import { educationValues } from "../../models/formValues";
import { useDispatch } from "react-redux";

export interface EducFromProps {
  education?: EducSchemaModel;
}

const EducFrom = ({ education }: EducFromProps) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isCurrent, setIsCurrent] = useState(false);
  const removeEducation = () => {
    education?._id && dispatch(deleteEducation(education._id));
  };

  useEffect(() => {
    education?.current && setIsCurrent(education.current);
  }, [education]);

  return (
    <Card className="mb-4 p-3 ">
      <Formik
        initialValues={educationValues(education)}
        validationSchema={educationSchema}
        onSubmit={(values: EducSchemaModel) => {
          values.current = isCurrent;
          if (isCurrent) values.to = undefined;
          dispatch(addEducation(values));
        }}
      >
        <FormikForm>
          {!education && <h4>Add new</h4>}
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Your school</Form.Label>
                <Form.Control
                  as={Field}
                  id="school"
                  name="school"
                  type="text"
                  placeholder="Enter your school name"
                />
                <ErrorMessage
                  name="school"
                  className="text-danger"
                  component="p"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  as={Field}
                  id="degree"
                  name="degree"
                  type="text"
                  placeholder="Enter your degree"
                />
                <ErrorMessage
                  name="degree"
                  className="text-danger"
                  component="p"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Field of study</Form.Label>
            <Form.Control
              as={Field}
              id="fieldOfStudy"
              name="fieldOfStudy"
              type="text"
              placeholder="Enter field of study"
            />
            <ErrorMessage
              name="fieldOfStudy"
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
          {education && (
            <Button
              variant="outline-danger"
              type="button"
              onClick={removeEducation}
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

export default EducFrom;
