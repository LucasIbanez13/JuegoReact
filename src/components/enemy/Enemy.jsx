import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Bullet from '../bullet/Bullet';

const Enemy = ({ position }) => {
  const enemyRef = useRef(null);
  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    if (enemyRef.current) {
      gsap.to(enemyRef.current, { x: position.x, y: position.y });
    }
    const interval = setInterval(() => {
      shootBullet();
    }, 2000); // Dispara cada 2 segundos

    return () => clearInterval(interval);
  }, [position]);

  const shootBullet = () => {
    setBullets([...bullets, { x: position.x, y: position.y + 20 }]);
  };

  return (
    <>
      <div ref={enemyRef} className="w-12 h-12 bg-red-500 absolute border-2 border-white"></div>
      {bullets.map((bullet, index) => (
        <Bullet key={index} position={bullet} direction={1} />
      ))}
    </>
  );
};

export default Enemy;
