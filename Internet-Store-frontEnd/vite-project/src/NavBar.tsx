import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function MainBar({isLoggedIn, handleLogoutUser, isLoggedInAdmin, handleLogoutAdmin}) {
  
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Главная</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/catalog">Каталог</Nav.Link>
            <Nav.Link as={Link} to="/blog">Блог</Nav.Link>
            <Nav.Link as={Link} to="/about">О нас</Nav.Link>
            <Nav.Link as={Link} to="/FAQ">FAQ</Nav.Link>
            
            </Nav>
            {/* Страницы для администратора */}
            <Nav className="ms-auto">
            {isLoggedInAdmin && (
              <>
                <Nav.Link as={Link} to="/admin-dashboard/add-product">Панель администратора</Nav.Link>
                <Nav.Link as={Link} to="/profile-admin">Личный кабинет</Nav.Link>
              </>
            )}
              {isLoggedIn &&(
                <>
                <Nav.Link as={Link} to="profile">Личный кабинет</Nav.Link>
                </>
              )}
            
            <Nav.Link as={Link} to="/cart">Корзина</Nav.Link>
            {isLoggedIn || isLoggedInAdmin ? ( // Проверка кто авторизован, для того, чтобы вызывать тот или иной метод для выхода из системы
              <>
                <Nav.Link onClick={isLoggedInAdmin ? handleLogoutAdmin : handleLogoutUser} as={Link} to="/login">Выйти</Nav.Link>
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