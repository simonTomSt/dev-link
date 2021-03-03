import { CodeSlash, Gear, PersonSquare } from "react-bootstrap-icons";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import React from "react";
import { Routes } from "../../../app/consts/RoutersConsts";
import { logOutUser } from "../../../store/auth/authActions";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <Navbar variant="light" bg="light" fixed="top">
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
            <Nav.Link as={NavLink} to={Routes.MyProfile}>
              My profile <PersonSquare />
            </Nav.Link>
          </Nav>
          <Dropdown>
            <Dropdown.Toggle>
              <Gear />
            </Dropdown.Toggle>

            <Dropdown.Menu className="justify-content-end">
              <Dropdown.Item as={NavLink} to={Routes.EditMyProfile}>
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={logOut}>
                Log out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
