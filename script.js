const startBtn = document.getElementById('start-btn');
const finishBtn = document.getElementById('finish-btn');
const overlay = document.getElementById('overlay');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const ghosts = ['assets/ghost_spank.GIF', 'assets/ghost_sock.GIF', 'assets/ghost_horn.GIF'];

let score = 0;
let gameRunning = false;
let ghostInterval;
let countdown;
let timeLeft = 10;

function randomPosition() {
	const x = Math.random() * (window.innerWidth - 100);
	const y = Math.random() * (window.innerHeight - 150);
	return { x, y };
}

function spawnGhost() {
	const ghost = document.createElement('img');
	ghost.src = ghosts[Math.floor(Math.random() * ghosts.length)];
	ghost.classList.add('ghost');
	const { x, y } = randomPosition();
	ghost.style.left = x + 'px';
	ghost.style.top = y + 'px';
	gameContainer.appendChild(ghost);

	ghost.addEventListener('click', () => {
		if (!gameRunning) return;
		score++;
		scoreDisplay.textContent = 'Score: ' + score;
		ghost.remove();
	});

	// Remove after 1.5 seconds
	setTimeout(() => ghost.remove(), 1500);
}

function startGame() {
	score = 0;
	timeleft = 10;
	scoreDisplay.textContent = 'Score: 0';
	timerDisplay.textContent = 'Time: 10s';
	overlay.style.display = 'none';
	gameRunning = true;

	ghostInterval = setInterval(spawnGhost, 600);
	countdown = setInterval(() => {
		if (!gameRunning) return;
		timeLeft--;
		timerDisplay.textContent = 'Time: ' + timeLeft + 's';
		if (timeLeft <= 0) {
			clearInterval(countdown);
			endGame();
		}
	}, 1000);
}

function endGame() {
	gameRunning = false;
	clearInterval(ghostInterval);
	clearInterval(countdown);
	const remaining = document.querySelectorAll('.ghost');
	remaining.forEach(g => g.remove());
	finishBtn.style.display = 'block';
	startBtn.style.display = 'none';
	overlay.style.display = 'flex';
	overlay.querySelector('h1').textContent = `Your score: ${score}`;
}

startBtn.addEventListener('click', () => {
	startBtn.style.display = 'none';
	finishBtn.style.display = 'none';
	overlay.querySelector('h1').textContent = 'Catch the Ghosts!';
	startGame();
});

finishBtn.addEventListener('click', () => {
	startBtn.style.display = 'block';
	finishBtn.style.display = 'none';
	overlay.querySelector('h1').textContent = 'Catch the Ghosts!';
});

window.addEventListener('resize', () => {
	// Adjust for mobile rotations
	if (gameRunning) {
		const ghostsOnScreen = document.querySelectorAll('.ghost');
		ghostsOnScreen.forEach(g => {
			const { x, y } = randomPosition();
			g.style.left = x + 'px';
			g.style.top = y + 'px';
		});
	}
});