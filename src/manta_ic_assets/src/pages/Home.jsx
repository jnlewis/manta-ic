import * as React from "react";
import "../../assets/page.home.css";
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { Col, Container, Row, Button } from 'react-bootstrap';

const Home = () => {

  return (
    <div>
      <main>
        <div className="intro">
          <Container>
            <div className="introTextContainer">
              <h1 className="title">Manta Docs</h1>
              <p className="subtitle">
                Create, organize, and collaborate
              </p>
              <div style={{paddingTop: 30}}>
                <Button variant="primary" href="#explore" style={{padding: '10px 40px'}}>Start</Button>
              </div>
            </div>
          </Container>
          <div className="introOverlay"></div>
        </div>
        <Container id="explore">
          <Row style={{ marginTop: 80, marginBottom: 80 }}>
            <h2 className="heading">Live Examples</h2>
            ...
          </Row>
        </Container>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
