import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Bullet = ({ position, direction, onRemove }) => {
  const bulletRef = useRef(null);

  useEffect(() => {
    if (bulletRef.current) {
      gsap.to(bulletRef.current, {
        y: position.y + direction * 1000, // Ajusta la distancia del movimiento vertical
        duration: 2, // Ajusta la duración del movimiento
        onComplete: () => {
          // Llamar a la función onRemove cuando el disparo termina
          if (typeof onRemove === 'function') {
            onRemove();
          }
        },
      });
    }
  }, [position, direction, onRemove]);

  return (
    <div
      ref={bulletRef}
      className="w-4 h-8 bg-red-500 absolute"
      style={{ left: position.x, bottom: position.y }}
    ></div>
  );
};

export default Bullet;
