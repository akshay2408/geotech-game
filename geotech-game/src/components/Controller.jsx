import React, { useEffect, useState } from "react";
import "./Controller.css";
import { unmountComponentAtNode } from "react-dom";

import { io } from "socket.io-client";
import { ENDPOINT } from "../Utils";

const Controller = () => {
  const [isControleEnable, setIsControleEnable] = useState(true);

  let socket = io(ENDPOINT);

  useEffect(() => {
    if (!isControleEnable) startGame();
  }, [isControleEnable]);

  var myGamePiece;

  function startGame() {
    myGamePiece = new remoteComponent(20, 40, "red", 10, 120);

    myGameArea.start();
  }

  const myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
      this.canvas.width = 480;
      this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");

      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
  };

  function remoteComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
      let ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function () {
      this.x += this.speedX;
      this.y += this.speedY;
    };
  }

  function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
  }

  useEffect(() => {
    socket.on("getUserMove", (move) => {
      if (isControleEnable && move === "stop") {
        myGameArea.clear();
      } else {
        switch (move) {
          case "up":
            myGamePiece.speedY = -1;
            break;
          case "down":
            myGamePiece.speedY = 1;
            break;
          case "right":
            myGamePiece.speedX = 1;
            break;
          case "left":
            myGamePiece.speedX = -1;
            break;
          default:
            myGamePiece.speedX = 0;
            myGamePiece.speedY = 0;
            unmountComponentAtNode(myGameArea.canvas);
            document.body.removeChild(myGameArea.canvas);
            break;
        }
      }
    });
  }, [isControleEnable]);

  const handleClick = (e, action) => {
    e.preventDefault();
    if (action === "stop") setIsControleEnable(true);
    if (action === "start") setIsControleEnable(false);
    socket.emit("FromClient", action);
  };
  return (
    <div className="canvasSection">
      {remoteComponent}
      <div className="controllerSection">
        <button
          onClick={(e) => handleClick(e, "up")}
          disabled={isControleEnable}
        >
          U
        </button>
        <div className="centerButton">
          <button
            disabled={isControleEnable}
            onClick={(e) => handleClick(e, "left")}
          >
            L
          </button>
          <button
            disabled={isControleEnable}
            onClick={(e) => handleClick(e, "right")}
          >
            R
          </button>
        </div>
        <button
          disabled={isControleEnable}
          onClick={(e) => handleClick(e, "down")}
        >
          D
        </button>
      </div>
      <div className="startButton">
        <button
          disabled={!isControleEnable}
          onClick={(e) => handleClick(e, "start")}
        >
          Start
        </button>

        <button
          disabled={isControleEnable}
          onClick={(e) => handleClick(e, "stop")}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default Controller;
