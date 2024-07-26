import React, { useState } from 'react';
import Player from './player/Player';
import Enemy from './enemy/Enemy';
import Platform from './platform/Platform';

const Game = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 370, y: window.innerHeight - 635}); // Ajusta la posición inicial
  const [enemies] = useState([
    { id: 1, x: 300, y: 100 },
    { id: 2, x: 500, y: 200 }
  ]);
  const platforms = [
    { id: 1, x: 100, y: 300, width: 200, height: 20 },
    { id: 2, x: 400, y: 150, width: 150, height: 20 }
  ];

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
