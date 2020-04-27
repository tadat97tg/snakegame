window.onload = function(){
	var start = document.getElementById('start');
	var textDiem = document.getElementById('textDiem');
	var ketQua = document.getElementById('ketQua');
	var lightScore = document.getElementById('lightScore');
	var cvs = document.getElementById('canvas');
	var ctx = cvs.getContext('2d');
	var ctf = cvs.getContext('2d');
	var diem = document.getElementById('diem');
	var ready = document.getElementById('ready');
	var modeKey = document.getElementById('modeKey');
	var easy = document.getElementById('easy');
	var medium = document.getElementById('medium');
	var hard = document.getElementById('hard');
	var veryHard = document.getElementById('veryHard');

	var cvsW = cvs.width;
	var cvsH = cvs.height;


	var FPS = 30;
	var food = {x: 0, y:0};
	var light_Score = 0;

	start.addEventListener('click',run);
	document.addEventListener('keydown',getKeyS);
	easy.addEventListener('click',easyMode);
	medium.addEventListener('click',mediumMode);
	hard.addEventListener('click',hardMode);
	veryHard.addEventListener('click',veryHardMode);

	

	function getKeyS(e){
		if(e.keyCode == 83 && start.style.display == "block"){
			run();
		}
		if(e.keyCode == 81 && easy.style.display == 'inline'){
			easyMode();
		}
		if(e.keyCode == 87 && easy.style.display == 'inline'){
			mediumMode();
		}
		if(e.keyCode == 69 && easy.style.display == 'inline'){
			hardMode();
		}
		if(e.keyCode == 82 && easy.style.display == 'inline'){
			veryHardMode();
		}

	}

	function easyMode(){
		FPS = 20;
		easy.style.display = 'none';
		medium.style.display = 'none';
		hard.style.display = 'none';
		veryHard.style.display = 'none';

	}

	function mediumMode(){
		FPS = 30;
		easy.style.display = 'none';
		medium.style.display = 'none';
		hard.style.display = 'none';
		veryHard.style.display = 'none';
	}

	function hardMode(){
		FPS = 40;
		easy.style.display = 'none';
		medium.style.display = 'none';
		hard.style.display = 'none';
		veryHard.style.display = 'none';
	}

	function veryHardMode(){
		FPS = 60;
		easy.style.display = 'none';
		medium.style.display = 'none';
		hard.style.display = 'none';
		veryHard.style.display = 'none';
	}


	function run(){
		start.style.display = "none";
		textDiem.style.display = "block";
		ketQua.style.display = "none";
		ready.style.display = "none";
		modeKey.style.display = "none";
		easy.style.display = 'none';
		medium.style.display = 'none';
		hard.style.display = 'none';
		veryHard.style.display = 'none';


		var snakeW = 10;
		var snakeH = 10;
		var direction = 'right';
		var len = 4;
		var snake =[];
		var point = 0;

		for (var i = len-1; i>=0; i--){
			snake.push(
				{x:i,
				y:0
				}
			);
		}

		document.addEventListener('keydown',getDirection);

		function getDirection(e){
			if(e.keyCode == 37 && direction != 'right'){
				direction = 'left';
			}
			if(e.keyCode == 38 && direction != 'down'){
				direction = 'up';
			}
			if(e.keyCode == 39 && direction != 'left'){
				direction = 'right';
			}
			if(e.keyCode == 40 && direction != 'up'){
				direction = 'down';
			}
		}

		function drawPoint(x,y){
			ctx.fillStyle = "#FFF";
			ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

			ctx.fillStyle = "#000";
			ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
		}

		function drawFood(x,y){
			ctf.fillStyle = "orange";
			ctf.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

			ctf.fillStyle = "#000";
			ctf.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
		}

		function randomFood(){
			x = Math.round(Math.random()*(cvsW/snakeW-1));
			y = Math.round(Math.random()*(cvsW/snakeW-1));
			food.x = x;
			food.y = y;
		}

		function draw(){
			ctx.clearRect(0,0,cvsW,cvsH);

			for(var i = 0; i < snake.length;i++){
				var x = snake[i].x;
				var y = snake[i].y;
				drawPoint(x,y);
			}
			drawFood(food.x,food.y);
			var snakeX = snake[0].x;
			var snakeY = snake[0].y;

			function Same(){
				for (i=0;i<snake.length;i++){
					while (snake[i].x == food.x && snake[i].y == food.y) {
						randomFood();
						Same();
					}
				}
			}

			if (snakeX == food.x && snakeY == food.y){
				randomFood();
				point++;
				diem.innerHTML = point;
				Same();
				
			}
			else {snake.pop();}

			if (direction == 'right'){
				snakeX++;
			}
			if (direction == 'left'){
				snakeX--;
			}
			if (direction == 'up'){
				snakeY--;
			}
			if (direction == 'down'){
				snakeY++;
			}

			if(snakeX >=  cvsW/snakeW || snakeX <0 || snakeY >=  cvsH/snakeH || snakeY <0 ){
				clearInterval(play);
				start.style.display = "block";
				easy.style.display = 'inline';
				medium.style.display = 'inline';
				hard.style.display = 'inline';
				veryHard.style.display = 'inline';
				ready.style.display = 'block';
				modeKey.style.display = 'block';
				textDiem.style.display ='none';
				ketQua.innerHTML = "Chúc mừng bạn đạt được " + point + " điểm";
				ketQua.style.display = 'block';
				if (point > light_Score) {
					light_Score = point;
				}
				lightScore.innerHTML = "Điểm cao nhất: " + '<strong>' + light_Score + '</strong>';
				lightScore.style.display = 'block';
			}
			for (i=1;i<snake.length;i++){
				if (snake[i].x == snakeX && snake[i].y == snakeY) {
					clearInterval(play);
					start.style.display = "block";
					easy.style.display = 'inline';
					medium.style.display = 'inline';
					hard.style.display = 'inline';
					veryHard.style.display = 'inline';
					ready.style.display = 'block';
					modeKey.style.display = 'block';
					textDiem.style.display ='none';
					ketQua.innerHTML = "Chúc mừng bạn đạt được " + point + " điểm"; 
					ketQua.style.display = 'block';
					if (point > light_Score) {
						light_Score = point;
					}
					lightScore.innerHTML = "Điểm cao nhất: " + '<strong>' + light_Score + '</strong>';
					lightScore.style.display = 'block';
				}
			}
			var newHead = {
				x : snakeX,
				y : snakeY
			};
			snake.unshift(newHead);
		}

		diem.innerHTML = 0;
		randomFood();
		var play = setInterval(draw,1000/FPS);
	}
	
}

	