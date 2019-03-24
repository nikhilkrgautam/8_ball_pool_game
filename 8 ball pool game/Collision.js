var canvas;
		var canvasContext;
		var rad = 15;
		var ballradius = [rad,rad,rad,rad,rad,rad];
		var ballColor = ['red','blue','green','yellow','brown','pink'];
		var ballX = [200,400,300,250,500,450]; //Horizontal position of the ball
		var ballSpeedX = [2,1,2,2,2,3]; //Horizontal speed of the ball
		var ballY = [500,300,500,150,200,350]; //Vertical position of the ball
		var ballSpeedY = [3,2,3,2,2,2]; //Vertical speed of the ball
		var stickX, stickY;
		var stickWidth = 10;
		var stickLength = 50;
		var i = 0;
		var n = 5;
		var a=0, b=0;
		var tempspeedX, tempspeedY;
		var fricrate = 0.005;
		//Makes sure that the entire code is loaded before the code is run
        window.onload = function()
         {
			var fps = 100;
			//Below function repeats after a given time interval
			setInterval(function() {
				moveEverything();
				drawEverything();
			}, 1000/fps);
		}
		
		function moveEverything() {
			for(let i = 0; i <= n; i++) {
					ballMovement(i);
					friction(i);
					wallCollision(i);
			}
			ballCollision();
		}
		function ballMovement(i) {
			ballX[i] = ballX[i] + ballSpeedX[i];
			ballY[i] = ballY[i] + ballSpeedY[i];
		}
		function friction(i) {
			if(ballSpeedX[i]<(-0.001)) {
				ballSpeedX[i] += fricrate;
			}
			else if(ballSpeedX[i]>0.001) {
				ballSpeedX[i] -= fricrate;
			}
			else{
				ballSpeedX[i] = 0;
			}
			if(ballSpeedY[i]<(-0.001)) {
				ballSpeedY[i] += fricrate;
			}
			else if(ballSpeedX[i]>0.001) {
				ballSpeedY[i] -= fricrate;
			}
			else {
				ballSpeedY[i] = 0;
			}
		}
		function wallCollision(i) {
			if (ballX[i]+ballradius[i]>=canvas.width) {
				ballSpeedX[i] = -ballSpeedX[i]; //Changes direction of ball
			}
			if (ballX[i]-ballradius[i]<=0) {
				ballSpeedX[i] = -ballSpeedX[i]; //Changes direction of ball
			}
			if (ballY[i]+ballradius[i]>=canvas.height) {
				ballSpeedY[i] = -ballSpeedY[i]; //Changes direction of ball
			}
			if (ballY[i]-ballradius[i]<=0) {
				ballSpeedY[i] = -ballSpeedY[i]; //Changes direction of ball
			}
		}
		function ballCollision() {
			for (a=0; a<=n; a++) {
				for (b=a+1; b<=n; b++) {
					if(Math.sqrt(Math.pow(ballX[a] - ballX[b],2) + Math.pow(ballY[a]-ballY[b],2)) <= rad*2) {
						tempspeedX = ballSpeedX[a];
						ballSpeedX[a] = ballSpeedX[b];
						ballSpeedX[b] = tempspeedX;
						tempspeedY = ballSpeedY[a];
						ballSpeedY[a] = ballSpeedY[b];
						ballSpeedY[b] = tempspeedY;
					}
				}
			}
		}
		function drawEverything() {
			for (let i = 0; i <= n; i++) {
				colorCircle(ballX[i],ballY[i],ballradius[i],ballColor[i]); //Ball
			}
			//Last rectangle overlaps the previous ones.
		}
		//Custom function to shorten the code
		function colorRect(leftX,topY,width,height,drawColor) {
			canvasContext.fillStyle = drawColor; //Fills color in the rectangle
			canvasContext.fillRect(leftX,topY,width,height); //Defines the position and dimesnsions of the rectangle
		}
		function drawText() {
			canvasContext.fillStyle = 'green';
			canvasContext.font = '75px fantasy';
			canvasContext.fillText('8 Ball Pool',100,100);
			canvasContext.fillStyle = 'green';
		}
		function colorCircle(centerX,centerY,radius,drawColor) {
			canvasContext.fillStyle = drawColor;
			canvasContext.beginPath();
			canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
			canvasContext.fill();
		}