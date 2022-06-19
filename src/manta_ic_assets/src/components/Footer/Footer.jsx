import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../assets/component.footer.css';

const Footer = () => {
  
  return (
    <section className="footer">
      <Container>
        <Row>
          <Col lg={6} md={6}>
            <div className="brand">MANTA</div>
            <p className="appDescription">
              Manta Docs is a decentralized knowledge workspace that lets you create, organize and collaborate on rich documents. Compose private notes that only you can see, or public workspaces where people can join and collaborate on.
            </p>
          </Col>
          <Col lg={6} md={6}>
            <div className="label">Connect with us</div>
            <p>
              <a className="link" target="_blank" href="https://github.com/jnlewis/manta-ic" rel="noreferrer">Find us on Github</a>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
