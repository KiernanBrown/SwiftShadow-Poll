import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='/'>
        <img
          alt='Swift Shadow Logo'
          src={logo}
          width='32'
          height='32'
          className='d-inline-block align-top logo'
        />
        SwiftShadow
      </Navbar.Brand>
      <Nav className='mr-auto'>
        <Nav.Item eventKey='home'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item eventKey='polls'>
          <Nav.Link as={Link} to='/polls'>
            Polls
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
