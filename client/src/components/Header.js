import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import '../pages/pages.css';

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <i
          className="fas fa-dumbbell fa-2x"
          style={{ color: 'white', margin: '0 10px' }}
        ></i>
        <Link to="/">
          <Navbar.Brand className="brand-title">eFitness</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              className="nav-links"
              title="Shop"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/accessories">
                Accessories
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/equipment">
                Equipment
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/supplement">
                Supplements
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="nav-links" as={Link} to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Nav.Link>
            {userInfo ? (
              <NavDropdown
                className="nav-links"
                title={userInfo.name}
                id="username"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link className="nav-links" as={Link} to="/login">
                <i className="fas fa-shopping-user"></i>Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
