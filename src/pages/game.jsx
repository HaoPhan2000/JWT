import React, { useRef, useEffect } from "react";
import { updateScore } from "../util/apis";
import {notification} from "antd";
const GamePage = () => {
  const gameContainer_content = useRef(null);
  const retryButton = useRef(null);
  const playButton = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const objGameContainer_content = gameContainer_content.current;
    const objRetryButton = retryButton.current;
    const objPlayButton = playButton.current;
    const objcanvas = canvas.current;
    const context = objcanvas.getContext("2d");

    let contentWidth = objGameContainer_content.offsetWidth;
    let contentHeight = objGameContainer_content.offsetHeight;

    objcanvas.width = contentWidth;
    objcanvas.height = contentHeight;

    const bg = new Image();
    bg.src = new URL('/src/assets/images/bg.jpg', import.meta.url).href;

    let locationx = contentWidth / 4;
    let locationy = contentHeight / 2;
    let score = 0;
    let dy = 10;
    let scrollX = 0;
    const move_speed = 10;
    let startGame = false;

    class Player {
      constructor(x, y, radius, lineWidth, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.color = color;
      }
      draw() {
        context.beginPath();
        context.lineWidth = this.lineWidth;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.strokeStyle = this.color;
        context.stroke();
        context.fillStyle = "rgba(159, 33, 104,0.2)";
        context.fill();
      }
    }

    const controlGame = () => {
      dy = -dy;
    };

    const detectCollision = () => {
      if (locationy + 32 > contentHeight || locationy - 32 < 0) {
        endGame();
      }
    };

    const endGame = async() => {
      startGame = false;
      locationy = contentHeight / 2;
      scrollX = 0;
      dy = 10;
      objRetryButton.style.display = "block";
      try {
        await updateScore({score:score.toFixed(0)});
      } catch (error) {
        notification.error({
          message: "Lỗi cập nhật điểm số",
          description:"có lỗi trong quá trình cập nhật điểm số"
        });
      }finally{
        score = 0;
      }
    };

    const animate = () => {
      if (!startGame) return;
      requestAnimationFrame(animate);
      context.clearRect(0, 0, contentWidth, contentHeight);

      context.drawImage(bg, -scrollX, 0, contentWidth, contentHeight);
      context.drawImage(bg, contentWidth - scrollX, 0, contentWidth, contentHeight);

      scrollX += move_speed;
      if (scrollX >= contentWidth) {
        scrollX = 0;
      }

      const player = new Player(locationx, locationy, 30, 2, "#fa34a3");
      player.draw();

      score += 0.1;
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.fillText("Score: " + score.toFixed(0), 10, 50);

      locationy += dy;
      detectCollision();
    };

    const countDownTime = () => {
      let time = 3;
      const countdown = setInterval(() => {
        context.drawImage(bg, -scrollX, 0, contentWidth, contentHeight);
        const player = new Player(locationx, locationy, 30, 2, "#fa34a3");
        player.draw();

        if (time > 0) {
          context.font = "30px Arial";
          context.fillStyle = "white";
          context.fillText(time, contentWidth / 2, contentHeight / 3);
          time -= 1;
        } else {
          clearInterval(countdown);
          animate();
        }
      }, 1000);
    };

    const waitingGame = () => {
      context.drawImage(bg, -scrollX, 0, contentWidth, contentHeight);
      const player = new Player(locationx, locationy, 30, 2, "#fa34a3");
      player.draw();
      objPlayButton.style.display = "block";
    };

    objcanvas.addEventListener("mousedown", controlGame);

    objRetryButton.addEventListener("click", () => {
      startGame = true;
      objRetryButton.style.display = "none";
      countDownTime();
    });

    objPlayButton.addEventListener("click", () => {
      startGame = true;
      objPlayButton.style.display = "none";
      countDownTime();
    });

    bg.onload = () => {
      waitingGame();  
    };

    const handleResize = () => {
      contentWidth = objGameContainer_content.offsetWidth;
      contentHeight = objGameContainer_content.offsetHeight;

      objcanvas.width = contentWidth;
      objcanvas.height = contentHeight;
      locationx = contentWidth / 4;
      locationy = contentHeight / 2;

      context.clearRect(0, 0, contentWidth, contentHeight);
      context.drawImage(bg, -scrollX, 0, contentWidth, contentHeight);
      const player = new Player(locationx, locationy, 30, 2, "#fa34a3");
      player.draw();
    };

    const debounceResize = debounce(handleResize, 200);
    window.addEventListener("resize", debounceResize);

    // Cleanup sự kiện khi component unmount
    return () => {
      objcanvas.removeEventListener("mousedown", controlGame);
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  // Hàm debounce để giới hạn số lần xử lý khi resize
  function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
  notification.config({ placement: "bottomRight" });
  return (
    <div className="gameContainer">
      <div ref={gameContainer_content} id="gameContainer_content">
        <canvas ref={canvas} id="canvas"></canvas>
      </div>
      <button ref={retryButton} id="retryButton">
        Chơi lại
      </button>
      <button ref={playButton} id="playButton">
        Chơi game
      </button>
    </div>
  );
};

export default GamePage;
