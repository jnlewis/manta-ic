import React, { useState, useEffect } from "react";
import '../../../assets/component.discover.css';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAvailablePublicWorkspaces } from "../../services/workspaceService";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

const Discover = ({ onJoinWorkspace }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState(null);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {

    setIsLoading(true);

    let workspaces = await getAvailablePublicWorkspaces();
    setWorkspaces(workspaces);

    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (<h2 className="unselected-title"><LoadingIndicator /></h2>)}
      {!isLoading && (
        <Container>
          <Row className="section-container" style={{ minHeight: 'auto' }}>

            <Col md={12} sm={12}>
              <h2>Discover Workspaces</h2>
              <h4 className="usability-subtitle">Find interesting workspaces to join and be part of</h4>
            </Col>

            {workspaces && workspaces.map((workspace) => (
              <Col md={4} sm={6} xs={12}>
                <Card className="card">
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{workspace.title}</Card.Title>
                    <div className="divider"></div>
                    <Card.Text className="card-description">
                      {workspace.description}
                    </Card.Text>
                    <Card.Text className="card-description">
                      1 member
                    </Card.Text>
                    <Button onClick={() => onJoinWorkspace(workspace.id)}>Join</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Discover;
