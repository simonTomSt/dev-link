import { CodeSlash, Gear, PersonSquare } from "react-bootstrap-icons";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import React from "react";

const NavBar = () => {
  return (
    <>
      <Navbar variant="dark" bg="primary" fixed="top">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <CodeSlash size={34} className="font-weight-bold" />
            DevLink
          </Navbar.Brand>
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to="/developers">
              Developers
            </Nav.Link>
            <Nav.Link as={NavLink} to="/posts">
              Posts
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-profile">
              My profile <PersonSquare />
            </Nav.Link>
          </Nav>
          <Dropdown>
            <Dropdown.Toggle>
              <Gear />
            </Dropdown.Toggle>

            <Dropdown.Menu className="justify-content-end">
              <Dropdown.Item as={NavLink} to="/edit-profile">
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
