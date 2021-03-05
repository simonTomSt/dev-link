import { Card, Col, Row } from "react-bootstrap";

import { ProfileRespModel } from "../../../../store/profiles/profilesModels";
import React from "react";

interface Props {
  info: ProfileRespModel;
}

export default function UserMainInfo({ info }: Props) {
  const { user, company, skills, location, bio, status, social } = info;
  return (
    <div>
      <Card>
        <Card.Body>
          <Row>
            <Col md={4}>
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="User face"
                  className="img-fluid border border-dark  rounded"
                />
              )}
              <h4 className="ml-1 mt-2 ">{user.name}</h4>
            </Col>
            <Col md={8}>
              <p>
                {" "}
                <span className="text-secondary mr-2 font-weight-bold">
                  Status:{" "}
                </span>{" "}
                {status}
              </p>
              <p>
                <span className="text-secondary mr-2 font-weight-bold">
                  Company:{" "}
                </span>{" "}
                {company}
              </p>
              <p>
                {" "}
                <span className="text-secondary mr-2 font-weight-bold">
                  Location:{" "}
                </span>{" "}
                {location}
              </p>
              <p>
                {" "}
                <span className="text-secondary mr-2 font-weight-bold">
                  Skills:{" "}
                </span>{" "}
                {skills?.join(", ")}
              </p>
              <p>
                {" "}
                <span className="text-secondary mr-2 font-weight-bold">
                  About me:{" "}
                </span>{" "}
                {bio}
              </p>
              <span className="text-secondary mr-2 font-weight-bold">
                Social:{" "}
              </span>
              {!social && "not added"}
              {social?.facebook}
              {social?.twitter}
              {social?.instagram}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
