import React, { useEffect, useRef, useState } from 'react';
import Bullet from '../bullet/Bullet';

const Player = ({ position, setPosition }) => {
  const playerRef = useRef(null);
  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    if (playerRef.current) {
      // Ajustar la posición del jugador
      playerRef.current.style.left = `${position.x}px`;
      playerRef.current.style.bottom = `${position.y}px`;
    }
  }, [position]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let newPos = { ...position };
      const containerWidth = window.innerWidth * 0.6; // Ancho del contenedor
      const playerWidth = 50; // Ancho del jugador

      switch (e.key) {
        case 'ArrowRight':
          newPos.x = Math.min(newPos.x + 10, containerWidth - playerWidth);
          break;
        case 'ArrowLeft':
          newPos.x = Math.max(newPos.x - 10, 0);
          break;
        default:
          break;
      }

      setPosition(newPos);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, setPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      shootBullet();
    }, 500); // 500ms para 2 disparos por segundo

    return () => clearInterval(interval);
  }, [bullets]);

  const shootBullet = () => {
    setBullets((prevBullets) => [
      ...prevBullets,
      { x: position.x + 20, y: position.y }
    ]);
  };

  const removeBullet = (index) => {
    setBullets((prevBullets) => prevBullets.filter((_, i) => i !== index));
  };

  return (
    <>
      <div
        ref={playerRef}
        className="w-12 h-12 bg-blue-500 absolute bottom-0"
      ></div>
      {bullets.map((bullet, index) => (
        <Bullet
          key={index}
          position={bullet}
          direction={-1}
          onRemove={() => removeBullet(index)} // Asegúrate de que onRemove sea una función
        />
      ))}
    </>
  );
};

export default Player;
