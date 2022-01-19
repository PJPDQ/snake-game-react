import React, { useEffect, useRef, useState } from "react";

const GameBoard = () => {
  const width = 500;
  const height = 500;
  const canvas = useRef(null);
  const [snake, setSnake] = useState([
    [2, 0],
    [1, 0],
    [0, 0]
  ]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(randomPosition);

  function randomPosition() {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
  }
  useEffect(() => {
    var ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, 100, 100);
    ctx.fillStyle = "rgb(0, 0, 0)";

    for (let i = 0; i < snake.length; i++) {
      ctx.fillRect(snake[i][0] * 10, snake[i][1] * 10, 10, 10);
    }

    ctx.fillStyle = "rgb(200, 0, 200)";
    ctx.fillRect(food.x, food.y, 10, 10);
  }, snake);

  const handleKeyPress = (e) => {
    switch (e.keyCode) {
      case 37:
        setDirection("left");
        break;
      case 38:
        setDirection("up");
        break;
      case 40:
        setDirection("down");
        break;
      case 39:
        setDirection("right");
        break;
      default:
        break;
    }
  };
  document.addEventListener("keydown", handleKeyPress, false);
  const moveSnake = () => {
    let tailSnake = snake.slice(0, -1);
    switch (direction) {
      case "right":
        setSnake([[snake[0][0] + 1, snake[0][1]], ...snake.slice(0, -1)]);
        break;
      case "down":
        setSnake([[snake[0][0], snake[0][1] + 1], ...snake.slice(0, -1)]);
        break;
      case "up":
        setSnake([[snake[0][0], snake[0][1] - 1], ...snake.slice(0, -1)]);
        break;
      case "left":
        setSnake([[snake[0][0] - 1, snake[0][1]], ...snake.slice(0, -1)]);
        break;
      default:
        break;
    }
    if (snake[0][0] === food.x && snake[0][1] === food.y) {
      setFood(randomPosition);
      setSnake([...snake, tailSnake]);
    }
  };

  useInterval(moveSnake, 1000);
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div id="gameboard">
      <canvas ref={canvas} width={`${width}`} height={`${height}`}></canvas>
    </div>
  );
};

export default GameBoard;
