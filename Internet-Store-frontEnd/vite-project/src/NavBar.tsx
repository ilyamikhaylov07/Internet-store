import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MainBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="home">Главная</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="каталог">Каталог</Nav.Link>
            <Nav.Link href="блог">Блог</Nav.Link>
            <Nav.Link href="онас">О нас</Nav.Link>

            <Nav.Link href="faq">FAQ</Nav.Link>
            <Nav.Link href="доставкаиоплата">Доставка и оплата</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="корзина">Корзина</Nav.Link>
            <Nav.Link href="вход">Вход</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainBar;