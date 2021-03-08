import { Button, Container } from "react-bootstrap";

import { Link } from "react-router-dom";
import React from "react";
import { Routes } from "../../app/consts/RoutersConsts";

export default function LandingPage() {
  return (
    <div className="centralized text-center">
      <Container className="">
        <h1 className="text-white">DevLink - portal for real developers</h1>
        <h3 className="text-warning">
          Join to the community and show yourself to the world
        </h3>

        <Button variant="dark" size="lg" active as={Link} to={Routes.Register}>
          Start now!
        </Button>
      </Container>
    </div>
  );
}
