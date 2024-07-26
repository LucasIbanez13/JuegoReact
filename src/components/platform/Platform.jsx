import React from 'react';

const Platform = ({ position, width, height }) => {
  return (
    <div
      className="bg-green-500 absolute border-2 border-white"
      style={{
        left: position.x,
        top: position.y,
        width: `${width}px`,
        height: `${height}px`
      }}
    ></div>
  );
};

export default Platform;
