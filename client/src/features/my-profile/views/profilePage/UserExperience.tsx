import { Accordion, Button, Card, Col, Row } from "react-bootstrap";

import { ExpModel } from "../../models/formSchema";
import Moment from "react-moment";
import React from "react";

interface Props {
  experience: ExpModel[];
}
export default function UserExperience({ experience }: Props) {
  return (
    <Card className="mt-4">
      <Card.Body>
        <h2 className="mb-4">My experience: </h2>
        {experience.length <= 0 && <p>There is no experience added</p>}
        <Accordion>
          {" "}
          {experience.map((exp) => (
            <Card key={exp._id}>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={exp._id}>
                  {exp.company}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={exp._id}>
                <Card.Body>
                  <Row>
                    <Col md={7}>
                      <h5>{exp.title} </h5>
                      <p>
                        <span className="font-weight-bold mr-2">
                          Location:{" "}
                        </span>{" "}
                        {exp.location}
                      </p>
                      <p>
                        <span className="font-weight-bold mr-2">
                          Description:{" "}
                        </span>{" "}
                        {exp.description}
                      </p>
                    </Col>
                    <Col md={5}>
                      <p>
                        <span className="font-weight-bold mr-2">Period: </span>{" "}
                        <Moment date={exp.from} format="DD/MM/YYYY" /> -{" "}
                        {exp.current ? (
                          "current"
                        ) : (
                          <Moment date={exp.to} format="DD/MM/YYYY" />
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
