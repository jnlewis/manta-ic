import * as React from "react";
import { Button } from 'react-bootstrap';
import '../../../assets/component.documentHeader.css';

const DocumentHeader = ({ onMenuToggle }) => {

  const toggleMenu = () => {
    onMenuToggle();
  };

  return (
    <div className="document-header-wrapper">
      <a onClick={() => toggleMenu()}>
        <div className="icon-burger">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </a>
      <div className="document-header-right">
        <Button onClick={() => saveDocument()}>Save</Button>
        <Button onClick={() => saveDocument()}>Rename</Button>
        <Button onClick={() => deleteDocument()}>Delete</Button>
      </div>
    </div>
  );
};

export default DocumentHeader;
