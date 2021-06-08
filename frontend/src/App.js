import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './logo.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>
          <img
            alt=''
            src={logo}
            width='32'
            height='32'
            className='d-inline-block align-top'
          />{' '}
          SwiftShadow
        </Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#polls">Polls</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default App;
