import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import logo from 'assets/rs_school.svg';

const devs = [
  {
    link: 'https://github.com/rincewizz',
    name: 'Gleb Roskin',
  },
  {
    link: 'https://github.com/Ol4ik88',
    name: 'Olga Slapik',
  },
  {
    link: 'https://github.com/yura703',
    name: 'Yury Lapitski',
  },
];
function Footer() {
  return (
    <footer className="row-fluid text-bg-info p-3 shadow">
      <Container className="text-center container-sm">
        <Row className="row-cols-5">
          <Col>
            <a href="https://rs.school/react/">
              <img src={logo} className="img-fluid" width="80px" alt="logo" />
            </a>
          </Col>
          {devs.map((dev) => (
            <Col key={dev.name}>
              <a
                href={dev.link}
                className="text-decoration-none link-dark"
                target="_blank"
                rel="noreferrer"
              >
                {dev.name}
              </a>
            </Col>
          ))}
          <Col>© 2022</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
