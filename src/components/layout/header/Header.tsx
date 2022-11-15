import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Dropdown } from 'react-bootstrap';
import logo from 'assets/logo.svg';
import world from 'assets/world.svg';
import ru from 'assets/ru.svg';
import en from 'assets/en.svg';
import imgAddBoard from 'assets/add_board.svg';
import '../../../i18n/config';
import { useTranslation } from 'react-i18next';

function Header() {
  const [scrollPosition, setSrollPosition] = useState(0);
  const [barSticky, setBarSticky] = useState(false);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleScroll = () => {
    const position = window.pageYOffset;
    position >= 80 ? setBarSticky(true) : setBarSticky(false);
    setSrollPosition(position);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const isAuth = true;

  return (
    <Navbar
      bg={barSticky ? 'light' : 'info'}
      expand="md"
      sticky="top"
      className="shadow"
      variant="info"
      style={{ transition: 'all 0.5s ease-out' }}
    >
      <Container className="justify-content-between">
        <Navbar.Brand>
          <NavLink to="/">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="logo-Home"
            />
          </NavLink>
        </Navbar.Brand>
        {isAuth && (
          <Button variant="light">
            <img src={imgAddBoard} width="30" height="30" className="me-2" />
            <span className="d-none d-sm-inline">{t('addBoard')}</span>
          </Button>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
          {!isAuth ? (
            <Nav className="me-2">
              <NavLink to="/login" className="nav-link">
                {t('signIn')}
              </NavLink>
              <NavLink to="/registration" className="nav-link">
                {t('signUp')}
              </NavLink>
            </Nav>
          ) : (
            <Nav className="me-2">
              <NavLink to="/boards" className="nav-link">
                {t('boards')}
              </NavLink>
              <NavLink to="/profile" className="nav-link">
                {t('profile')}
              </NavLink>
              <Button
              onClick={() => {
                navigate(`/registration`);
              }}
              variant="link" className="text-start nav-link ">
                {t('signOut')}
              </Button>
            </Nav>
          )}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <img src={world} width="20" height="20" className="me-2" />
              {t('lang')}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage('ru')}>
                <img src={ru} width="20" height="20" />
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('en')}>
                <img src={en} width="20" height="20" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
