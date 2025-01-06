import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import man from 'assets/ava.svg';
import woman from 'assets/ava2.svg';
import group from 'assets/Group.png';
import el1 from 'assets/1.png';
import el2 from 'assets/2.png';
import el3 from 'assets/3.png';
import github from 'assets/github.svg';

function Welcome() {
  const { t } = useTranslation();
  const devs = [
    {
      foto: man,
      link: 'https://github.com/rincewizz',
      name: t('teamDevs.nameGR'),
      text: 'FrontEnd developer',
    },
    {
      foto: woman,
      link: 'https://github.com/Ol4ik88',
      name: t('teamDevs.nameOS'),
      text: 'FrontEnd developer, Teamlead',
    },
    {
      foto: man,
      link: 'https://github.com/yura703',
      name: t('teamDevs.nameYL'),
      text: 'FrontEnd developer',
    },
  ];
  return (
    <Container className="my-5">
      <Row className="fs-3 justify-content-between align-items-center pt-4">
        <Col xs={12} md={6} className="text-md-start text-center">
          <span className="fw-bold">{t('welcome.pms')}</span>
          <span>{t('welcome.definition')}</span>
        </Col>
        <Col xs={12} md={6}>
          <img src={group} className="img-fluid d-none d-md-inline" alt="" />
        </Col>
      </Row>
      <Row className="fs-3 justify-content-between align-items-center pt-4">
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <img src={el3} className="img-fluid" alt="" />
        </Col>
        <Col xs={12} md={6} className="text-md-start text-center">
          {t('welcome.description')}
        </Col>
      </Row>
      <Row className="fs-3 justify-content-between align-items-center pt-4">
        <Col xs={12} md={6} className="text-md-start text-center">
          {t('welcome.course')}
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <img src={el1} className="img-fluid" alt="" />
        </Col>
        <Col xs={12} md={6} className="text-md-start text-center">
          {t('welcome.RSS')}
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <img src={el2} className="img-fluid" alt="" />
        </Col>
      </Row>
      <Row className="mt-5 text-center">
        <Col className="fs-3">{t('teamDevs.team')}</Col>
      </Row>
      <Row md={3}>
        {devs.map((dev) => (
          <Col key={dev.name}>
            <Card bg="light" className="mb-2 text-center shadow">
              <Card.Img className="py-3 px-3 d-none d-sm-inline" src={dev.foto} />
              <Card.Body>
                <Card.Title>{dev.name} </Card.Title>
                <Card.Link
                  href={dev.link}
                  className="link-dark text-decoration-none"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={github} className="img-fluid" width="80px" alt="github" />
                </Card.Link>
                <Card.Text>{dev.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Welcome;
