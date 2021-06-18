import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = (props) => {
  const getActiveKey = () => {
    return props.location.pathname.length > 0 ? props.location.pathname.split('/')[1] : props.location.pathname;
  };

  return (
    <Navbar bg='dark' variant='dark'>
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
    </Navbar>
  );
};

export default Navigation;
