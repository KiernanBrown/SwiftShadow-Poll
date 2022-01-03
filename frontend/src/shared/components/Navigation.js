import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../services/user';

import './Navigation.css';

const Navigation = (props) => {
  const getActiveKey = () => {
    return props.location.pathname.length > 0
      ? props.location.pathname.split('/')[1]
      : props.location.pathname;
  };

  const handleLogin = () => {
    window.open('http://localhost:5000/api/auth/login', '_self');
  };

  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.userSlice.authenticated);
  const user = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    GetUser(dispatch);
  }, [dispatch]);

  return (
    <Navbar bg='dark' variant='dark' collapseOnSelect expand='sm'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img
            alt='Swift Shadow Logo'
            src={logo}
            width='32'
            height='32'
            className='d-inline-block align-top logo'
          />
          SwiftShadow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsiveNavbar' />
        <Navbar.Collapse id='responsiveNavbar'>
          <Nav activeKey={getActiveKey()} className='mr-auto'>
            <Nav.Item>
              <Nav.Link eventKey='' as={Link} to='/'>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='polls' as={Link} to='/polls'>
                Polls
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {!authenticated ? (
            <Button
              variant='light'
              className='justify-content-end'
              onClick={handleLogin}
            >
              Login
            </Button>
          ) : (
            <div>
              <Navbar.Text>
                Signed in as:{' '}
                <Link to={`/users/${user._id}`}>{user.username}</Link>
              </Navbar.Text>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
