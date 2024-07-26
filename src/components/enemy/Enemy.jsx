import React from 'react';

const Enemy = ({ position }) => {
  const { x, y } = position;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: '50px',
        height: '50px',
        backgroundColor: 'red',
      }}
    />
  );
};

export default Enemy;
