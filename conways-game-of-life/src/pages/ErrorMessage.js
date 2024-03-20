import React from 'react';
const ErrorMessage = ({ message }) => (
    message ? <div style={{ color: 'red', marginTop: '10px' }}>{message}</div> : null
  );

  
export default ErrorMessage;