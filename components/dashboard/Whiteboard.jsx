import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const Whiteboard = ({socketUrl}) => {
  let timeout = useState(undefined);
  const [tooltype, setToolType] = useState('draw');
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);

  useEffect(() => {
    const socketRef = io.connect(socketUrl);
    // --------------- getContext() method returns a drawing context on the canvas-----
    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext('2d');

    context.imageSmoothingQuality = 'high';

    const dataURL = localStorage.getItem('canvasInstance');
    const img = new Image();
    img.src = dataURL;

    img.onload = function () {
      context.drawImage(img, 0, 0);
    };

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName('color');
    // set the current color
    const current = {
      color: 'black'
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.id;
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener('click', onColorUpdate, false);
    }
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      if (tooltype == 'draw') {
        context.globalCompositeOperation = 'source-over';
      } else {
        context.globalCompositeOperation = 'destination-out';
        context.lineWidth = 20;
      }

      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 7;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }
      const w = canvas.width;
      const h = canvas.height;

      // Cache all drawings to local storage
      const base64ImageData = canvas.toDataURL('image/png');
      if (timeout != undefined) clearTimeout();

      timeout = setTimeout(function () {
        localStorage.setItem('canvasInstance', base64ImageData);
        // MESSAGE EMITTING
        socketRef.emit('drawing', base64ImageData);
      });
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }

      const BB = canvas.getBoundingClientRect();
      const offsetX = BB.left;
      const offsetY = BB.top;

      drawLine(
        current.x - offsetX,
        current.y - offsetY,
        e.clientX - offsetX,
        e.clientY - offsetY,
        current.color,
        true
      );
      current.x = e.clientX;
      current.y = e.clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      );
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mouseout', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', onMouseDown, false);
    canvas.addEventListener('touchend', onMouseUp, false);
    canvas.addEventListener('touchcancel', onMouseUp, false);
    canvas.addEventListener('touchmove', onMouseMove, false);

    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      const BB = canvas.getBoundingClientRect();

      const w = BB.right - BB.left;
      const h = BB.bottom - BB.top;

      if (w > 0 && h > 0) {
        const base64ImageData = canvas.toDataURL('image/png');
        const temp_cnvs = document.createElement('canvas');
        const temp_cntx = temp_cnvs.getContext('2d');
        // set it to the new width & height and draw the current canvas data into it //
        temp_cnvs.width = w;
        temp_cnvs.height = h;
        temp_cntx.fillStyle = '#fff';
        temp_cntx.fillRect(0, 0, w, h);

        canvas.width = w;
        canvas.height = h;

        const img = new Image();
        img.src = base64ImageData;

        img.onload = function () {
          temp_cntx?.drawImage(img, 0, 0);
          context.drawImage(img, 0, 0);
        };
      }
    };

    window.addEventListener('resize', onResize, false);
    onResize();

    // ----------------------- socket.io connection (MESSAGE RECEIVING) ----------------------------
    const onDrawingEvent = (data) => {
      const image = new Image();
      image.onload = function () {
        context.drawImage(image, 0, 0);
      };
      image.src = data;
    };

    const clearWhiteboardEvent = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    socketRef.on('drawing', onDrawingEvent);
    socketRef.on('clear_whiteboard', clearWhiteboardEvent);

    return () => socketRef.disconnect();
  }, []);

  const clearWhiteboard = () => {
    const socketRef = io.connect(socketUrl);
    localStorage.removeItem('canvasInstance');

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    socketRef.emit('clear_whiteboard');
  };

  return (
    <div className="relative w-full h-full bg-white">
      <button
        onClick={clearWhiteboard}
        className="z-20 absolute top-0 right-0 m-2 rounded shadow-sm bg-blue-400 px-2 py-2 text-white text-sm font-semibold flex items-center cursor-pointer"
      >
        <svg
          className="w-4 h-4 text-white mr-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Clear Board
      </button>
      {/* <button
        onClick={() => setToolType('erase')}
        className="z-20 absolute top-10 left-0 m-2 rounded shadow-sm bg-blue-400 px-2 py-2 text-white text-sm font-semibold flex items-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-center icon icon-tabler icon-tabler-eraser mr-1"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9" />
          <line x1="18" y1="12.3" x2="11.7" y2="6" />
        </svg>
        Erase
      </button> */}
      <canvas
        className="absolute inset-0"
        className="bg-white"
        ref={canvasRef}
        className="whiteboard"
      />
      <div ref={colorsRef} className="colors flex flex-row space-x-1 m-2">
        <div
          id="black"
          className="black inline-block rounded-full h-6 w-6 bg-black color cursor-pointer"
        />
        <div
          id="red"
          className="red inline-block rounded-full h-6 w-6 bg-red-500 color cursor-pointer"
        />
        <div
          id="green"
          className="green inline-block rounded-full h-6 w-6 bg-green-500 color cursor-pointer"
        />
        <div
          id="blue"
          className="blue inline-block rounded-full h-6 w-6 bg-blue-500 color cursor-pointer"
        />
        <div
          id="purple"
          className="purple inline-block rounded-full h-6 w-6 bg-purple-700 color cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Whiteboard;
