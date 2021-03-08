import { Accordion, Button, Card, Col, Row } from "react-bootstrap";

import { EducationModel } from "../../models/formSchema";
import Moment from "react-moment";
import React from "react";

interface Props {
  education: EducationModel[];
}
export default function UserEducation({ education }: Props) {
  return (
    <Card className="mt-4 mb-4">
      <Card.Body>
        <h2 className="mb-4">My education: </h2>
        {education.length <= 0 && <p>There is no education added</p>}
        <Accordion>
          {" "}
          {education.map((educ) => (
            <Card key={educ._id}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={educ._id}
                >
                  {educ.school}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={educ._id}>
                <Card.Body>
                  <Row>
                    <Col md={7}>
                      <p>
                        <span className="font-weight-bold mr-2">Degree: </span>
                        {educ.degree}{" "}
                      </p>
                      <p>
                        <span className="font-weight-bold mr-2">
                          Field of study:{" "}
                        </span>{" "}
                        {educ.fieldOfStudy}
                      </p>
                    </Col>
                    <Col md={5}>
                      <p>
                        <span className="font-weight-bold mr-2">Period: </span>{" "}
                        <Moment date={educ.from} format="DD/MM/YYYY" /> -{" "}
                        {educ.current ? (
                          "current"
                        ) : (
                          <Moment date={educ.to} format="DD/MM/YYYY" />
                        )}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  );
}
