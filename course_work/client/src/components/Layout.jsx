import React from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <Container fluid="md" style={{ paddingTop: '3%' }}>
      <Row>
        <Col>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link>
                    <NavLink to={'/'}>Departments</NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink to={'/employees'}>Employees</NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink to={'/departments-employees'}>
                      DepartmentsEmployees
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink to={'/projects'}>Projects</NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink to={'/projects-in-work'}>ProjectsInWork</NavLink>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export { Layout };
