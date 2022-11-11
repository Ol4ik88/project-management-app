import React from 'react';
import { Container } from 'react-bootstrap';
import logo from 'assets/rs_school.svg';

function Footer() {
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
  return (
    <footer className="row-fluid text-bg-info p-3 shadow">
      <Container className="text-center container-sm">
        <div className="row row-cols-5">
          <a href="https://rs.school/react/" className="col">
            <img src={logo} className="img-fluid" width="80px" />
          </a>
          {devs.map((dev) => (
            <div key={dev.name}>
              <a href={dev.link} className="col text-decoration-none link-dark">
                {dev.name}
              </a>
            </div>
          ))}
          <div className="col">© 2022</div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
