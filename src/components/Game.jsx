import React, { useState, useEffect } from 'react';
import Player from './player/Player';
import Enemy from './enemy/Enemy';
import Platform from './platform/Platform';

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 370, y: window.innerHeight - 635 }); // Ajusta la posición inicial
  const [enemies, setEnemies] = useState([
    { id: 1, x: 300, y: 100 },
    { id: 2, x: 500, y: 200 }
  ]);
  const [platforms, setPlatforms] = useState([
    { id: 1, x: 100, y: 300, width: 200, height: 20 },
    { id: 2, x: 400, y: 150, width: 150, height: 20 }
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEnemies(prevEnemies => prevEnemies.map(enemy => ({
        ...enemy,
        y: enemy.y + 2 < window.innerHeight ? enemy.y + 2 : -50 // Reinicia la posición al salir del contenedor
      })));

      setPlatforms(prevPlatforms => prevPlatforms.map(platform => ({
        ...platform,
        y: platform.y + 2 < window.innerHeight ? platform.y + 2 : -20 // Reinicia la posición al salir del contenedor
      })));
    }, 50); // Ajusta la frecuencia de actualización si es necesario

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="w-full h-screen bg-gray-800 flex justify-center items-center">
      <div className="relative w-3/5 h-full bg-gray-900 border-2 border-white overflow-hidden">
        <Player position={playerPosition} setPosition={setPlayerPosition} />
        {enemies.map(enemy => (
          <Enemy key={enemy.id} position={{ x: enemy.x, y: enemy.y }} />
        ))}
        {platforms.map(platform => (
          <Platform key={platform.id} position={{ x: platform.x, y: platform.y }} width={platform.width} height={platform.height} />
        ))}
      </div>
    </div>
  );
};

export default Game;
