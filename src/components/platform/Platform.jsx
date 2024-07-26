import React from 'react';

const Platform = ({ position, width, height }) => {
  const { x, y } = position;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: 'green', // Cambiado a verde
      }}
    />
  );
};

export default Platform;
