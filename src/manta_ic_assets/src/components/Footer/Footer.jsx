import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../assets/component.footer.css';

const Footer = () => {
  
  return (
    <section className="footer">
      <Container>
        <Row>
          <Col lg={4} md={4}>
            <div className="brand">NFT Exchange</div>
            <p className="appDescription">NFT Exchange is a digital marketplace that lets you trade NFTs with a community of collectors. Put your token up for trade and start receiving offers.</p>
            <div className="label">Connect with us</div>
            <p>
              <a className="link" target="_blank" href="https://github.com/jnlewis/nft-exchange" rel="noreferrer">Find us on Github</a>
            </p>
          </Col>
          <Col lg={8} md={8}>
            <Container>
              <Row>
                <Col lg={4} md={4}>
                  <b>Marketplace</b>
                  <ul className="list">
                    <li><a className="link" href="/#explore">Explore</a></li>
                    <li><a className="link" href="/listing/create">Create Listing</a></li>
                  </ul>
                </Col>
                <Col lg={4} md={4}>
                  <b>My Account</b>
                    <ul className="list">
                    <li><a className="link" href="/account/listings">My Listings</a></li>
                    <li><a className="link" href="/account/offers">My Offers</a></li>
                    <li><a className="link" href="/account/offers">Incoming Offers</a></li>
                  </ul>
                </Col>
                <Col lg={4} md={4}>
                  <b>Platform</b>
                  <ul className="list">
                    <li><a className="link" href="https://github.com/jnlewis/nft-exchange">About</a></li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
