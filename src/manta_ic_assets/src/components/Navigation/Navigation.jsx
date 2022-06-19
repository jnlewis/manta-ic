import * as React from "react";
import { Navbar } from 'react-bootstrap';
import '../../../assets/component.navigation.css';

const Navigation = ({ onMenuSelected }) => {

  return (
    <Navbar fixed="top" className="nav">
      <Navbar.Brand className="brand" href="/">
        Manta
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a className="linkItemBold" onClick={() => onMenuSelected('documents')}>Start</a>
          </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
