import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../images/logo.png';

export default function Layout() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    setToken(null);
    navigate('/login');
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="todologo" style={{ height: '45px' }} />{' '}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/todolist">Todo List</Nav.Link>
            <Nav.Link href="/add">Add Todo</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
