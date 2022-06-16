import * as React from "react";
import { Navbar } from 'react-bootstrap';
import '../../../assets/component.navigation.css';

const Navigation = ({ currentUser, onMenuSelected }) => {

  return (
    <Navbar fixed="top" className="nav">
      <Navbar.Brand className="brand" href="/">
        Manta
      </Navbar.Brand>
      <Navbar.Toggle />
      {currentUser && (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a className="linkItemBold" href="/account/listings">Account</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className="linkItem" href="/listing/create">Create Listing</a>
          </Navbar.Text>
          <Navbar.Text>
            <a className="linkItem">Logout</a>
          </Navbar.Text>
      </Navbar.Collapse>
      )}
      {!currentUser && (
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a className="linkItemBold" onClick={() => onMenuSelected('documents')}>Open</a>
          </Navbar.Text>
      </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Navigation;
