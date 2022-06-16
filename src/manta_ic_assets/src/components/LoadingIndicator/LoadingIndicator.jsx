import * as React from "react";
import '../../../assets/component.loadingIndicator.css';

const LoadingIndicator = ({ size }) => {
  if (size === 'small') {
    return (
      <div className="lds-ring small"><div></div><div></div><div></div><div></div></div>
    );
  } else {
    return (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    );
  }
};

export default LoadingIndicator;
