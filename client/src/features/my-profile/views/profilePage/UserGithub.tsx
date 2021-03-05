import { Card, ListGroup } from "react-bootstrap";

import React from "react";

interface Props {
  repos?: any[];
}
export default function UserGithub({ repos }: Props) {
  if (repos && repos.length > 0)
    return (
      <Card className="mb-4">
        <Card.Body>
          <ListGroup>
            {repos?.map(({ id, name, html_url }) => (
              <ListGroup.Item as="a" href={html_url} key={id} target="_blank">
                {name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  return null;
}
