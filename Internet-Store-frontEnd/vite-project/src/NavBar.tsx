import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function MainBar({isLoggedIn, handleLogoutUser, isLoggedInAdmin, handleLogoutAdmin}) {
  
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/home">Главная</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/catalog">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/blog">Блог</Nav.Link>
            <Nav.Link as={Link} to="/about">О нас</Nav.Link>
            <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
            <Nav.Link as={Link} to="/delivery-and-payment">Доставка и оплата</Nav.Link>
            {/* Страницы для администратора */}
            {isLoggedInAdmin && (
              <>
                <Nav.Link as={Link} to="/admin-dashboard">Панель администратора</Nav.Link>
                <Nav.Link as={Link} to="/manage-users">Управление пользователями</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart">Корзина</Nav.Link>
            {isLoggedIn || isLoggedInAdmin ? (
              <>
                <Nav.Link as={Link} to="/profile">Личный кабинет</Nav.Link>
                <Nav.Link onClick={isLoggedInAdmin ? handleLogoutAdmin : handleLogoutUser}>Выйти</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">Вход</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainBar;