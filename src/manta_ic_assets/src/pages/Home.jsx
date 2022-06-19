import * as React from "react";
import "../../assets/page.home.css";
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { Col, Container, Row, Card, Button } from 'react-bootstrap';

const Home = ({ onMenuSelected }) => {

  return (
    <div>
      <main>
        <div className="intro">
          <Container>
            <Row>
              <Col md={6} sm={12}>
                <div className="introTextContainer">
                  <h1 className="title">Manta Docs</h1>
                  <p className="subtitle">
                    Create, organize, and collaborate
                  </p>
                  <div style={{paddingTop: 30}}>
                    <Button variant="primary" style={{padding: '10px 40px'}} onClick={() => onMenuSelected('documents')}>Start</Button>
                  </div>
                </div>
              </Col>
              <Col md={6} sm={12}>
                <div className="intro-image">
                  <img src="screenshot-documents.png" alt="screenshot" />
                </div>
              </Col>
            </Row>
          </Container>
          <div className="introOverlay"></div>
        </div>
          <Row className="section-container features-section">
            <h2 className="heading">Highlights</h2>
              <Col md={6} sm={6}>
                <div><i className="icon ion-document"></i></div>
                <h4>Create Rich Documents</h4>
                <div className="feature-description">Create documents in a powerful text editor with rich styling features that you would expect in a modern document editor.</div>
              </Col>
              <Col md={6} sm={6}>
                <div><i className="icon ion-android-folder-open"></i></div>
                <h4>Organized Workspaces</h4>
                <div className="feature-description">Keep your documents well organized in workspaces with private or public visibility.</div>
              </Col>
              <Col md={6} sm={6}>
                <div><i className="icon ion-ios-people"></i></div>
                <h4>Collaborate With Anyone</h4>
                <div className="feature-description">Create public workspaces so anyone can join and contribute to them.</div>
              </Col>
              <Col md={6} sm={6}>
                <div><i className="icon ion-earth"></i></div>
                <h4>Discover Things</h4>
                <div className="feature-description">Find interesting public workspaces that you can join to see, learn and contribute.</div>
              </Col>
          </Row>
          <div style={{ background: '#eff5f5' }}>
            <Row className="section-container advanced-section">
              <Col md={6} sm={6}>
                <div className="feature-image">
                  <img src="screenshot-devices.png" alt="screenshot" />
                </div>
              </Col>
              <Col md={6} sm={6}>
                <div className="advanced-description">
                  <h2>Intuitive user experience makes setup, creation, and discovery easy.</h2>
                  <h3 className="muted">Manta looks great on every platform from desktop to mobile.</h3>
                  <p className="paragraph">
                    You have full control over your workspaces and documents. Create workspaces and any number of documents you want, modify them at any time and on the go. Style and format the way you like. Delete the ones you no longer want to keep.
                    <b>This is your space, use it however you will.</b>
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <Row  className="section-container" style={{ minHeight: 'auto' }}>
            <Col md={12} sm={12}>
              <h2>For anything you can think of</h2>
              <h4 className="usability-subtitle">from planning your next vacation, to sharing ideas across your organization</h4>
            </Col>
            <Col md={3} sm={6} xs={12}>
              <Card className="card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">To-Do List</Card.Title>
                  <div className="divider"></div>
                  <Card.Text className="card-description">
                    Keep track of things you need to do or make a grocery shopping list.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <Card className="card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">How-to Articles</Card.Title>
                  <div className="divider"></div>
                  <Card.Text className="card-description">
                    Provide step by step guidance for completing a task.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <Card className="card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">Marketing Campaign</Card.Title>
                  <div className="divider"></div>
                  <Card.Text className="card-description">
                    Plan and track your marketing campaign tasks and results.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} xs={12}>
              <Card className="card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">Brainstorming</Card.Title>
                  <div className="divider"></div>
                  <Card.Text className="card-description">
                    Plan, run and document a remote brainstorming session for your next great idea.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        <Footer />
      </main>
    </div>
  );
};

export default Home;
