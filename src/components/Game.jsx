import React, { useState, useEffect } from 'react';
import Player from './player/Player';
import Enemy from './enemy/Enemy';
import Platform from './platform/Platform';

// Función para generar una posición aleatoria
const getRandomPosition = (items, width, height, itemWidth, itemHeight, minDistance = 50) => {
  let position;

  do {
    position = {
      x: Math.random() * (width - itemWidth),
      y: Math.random() * (height - itemHeight)
    };
  } while (items.some(item =>
    Math.abs(item.x - position.x) < itemWidth + minDistance &&
    Math.abs(item.y - position.y) < itemHeight + minDistance
  ));

  return position;
};

const Game = () => {
  const containerWidth = window.innerWidth * 0.6; // Ancho del contenedor
  const containerHeight = window.innerHeight; // Alto del contenedor
  const enemyWidth = 50; // Ancho del enemigo
  const enemyHeight = 50; // Alto del enemigo
  const platformWidth = 200; // Ancho de la plataforma
  const platformHeight = 20; // Alto de la plataforma

  const [playerPosition, setPlayerPosition] = useState({ x: 370, y: window.innerHeight - 635 });
  const [enemies, setEnemies] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  // Función para reiniciar una posición aleatoria de un elemento
  const resetPosition = (item, itemWidth, itemHeight) => {
    return getRandomPosition(
      [...enemies, ...platforms], // Evita solapamientos con enemigos y plataformas
      containerWidth,
      containerHeight,
      itemWidth,
      itemHeight
    );
  };

  useEffect(() => {
    // Genera posiciones aleatorias iniciales
    const initialEnemies = Array.from({ length: 2 }, () => resetPosition({}, enemyWidth, enemyHeight));
    const initialPlatforms = Array.from({ length: 2 }, () => resetPosition({}, platformWidth, platformHeight));
    
    setEnemies(initialEnemies);
    setPlatforms(initialPlatforms);
  }, [containerWidth, containerHeight]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEnemies(prevEnemies => prevEnemies.map(enemy => {
        const newY = enemy.y + 2;
        // Reinicia la posición si sale del contenedor
        return newY < containerHeight
          ? { ...enemy, y: newY }
          : { ...resetPosition({}, enemyWidth, enemyHeight), y: -enemyHeight };
      }));

      setPlatforms(prevPlatforms => prevPlatforms.map(platform => {
        const newY = platform.y + 2;
        // Reinicia la posición si sale del contenedor
        return newY < containerHeight
          ? { ...platform, y: newY }
          : { ...resetPosition({}, platformWidth, platformHeight), y: -platformHeight };
      }));
    }, 50); // Ajusta la frecuencia de actualización si es necesario

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [containerHeight, enemyHeight, platformHeight]);

  return (
    <div className="w-full h-screen bg-gray-800 flex justify-center items-center">
      <div className="relative w-3/5 h-full bg-gray-900 border-2 border-white overflow-hidden">
        <Player position={playerPosition} setPosition={setPlayerPosition} />
        {enemies.map((enemy, index) => (
          <Enemy key={index} position={enemy} />
        ))}
        {platforms.map((platform, index) => (
          <Platform key={index} position={platform} width={platformWidth} height={platformHeight} />
        ))}
      </div>
    </div>
  );
};

export default Game;
