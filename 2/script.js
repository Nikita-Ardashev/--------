const video = document.getElementById('videoSource');
const canvas = document.getElementById('videoCanvas');
const ctx = canvas.getContext('2d');
const textLines = [
	"We're here",
	16,
	'to make',
	null,
	'healthy,',
	5,
	'living effortless',
	null,
	'so you can',
	9,
	'live longer',
	null,
	'and happier',
	33,
	null,
];
const textLinesSmall = [
	"We're here",
	13,
	null,
	'to',
	20,
	'make',
	null,
	5,
	'healthy, living',
	null,
	'effortless so you',
	null,
	'can',
	4,
	'live longer',
	null,
	'and happier',
	10,
	null,
];

function updateCanvasSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function drawBackground() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText() {
	const fontSize = Math.floor(canvas.width * 0.05);
	const lineHeight = fontSize * 1.5;
	const startPadding = canvas.width * 0.01;
	const topPadding = canvas.height * 0.1;

	const textData = window.innerWidth > 1000 ? textLines : textLinesSmall;

	ctx.font = `bold ${fontSize}px Arial`;
	ctx.fillStyle = 'white';

	let currentLine = 0;
	let lastTextWidth = 0;

	const startNewLine = () => {
		currentLine++;
		lastTextWidth = 0;
	};

	textData.forEach((item, index) => {
		if (item === null) {
			startNewLine();
		} else if (typeof item === 'string') {
			drawTextLine(item, index);
		} else if (typeof item === 'number') {
			clearRect(item);
		}
	});

	function drawTextLine(text, index) {
		const textWidth = ctx.measureText(text).width;

		if (lastTextWidth + textWidth + startPadding > canvas.width) {
			startNewLine();
		}

		const x = startPadding + lastTextWidth;
		const y = topPadding + currentLine * lineHeight;

		ctx.fillText(text, x, y);

		lastTextWidth += startPadding + textWidth;
	}

	function clearRect(number) {
		const rectWidth = (canvas.width * number) / 100;
		ctx.clearRect(
			lastTextWidth + startPadding,
			topPadding + currentLine * lineHeight - fontSize,
			rectWidth,
			fontSize,
		);
		lastTextWidth += rectWidth + startPadding;
	}
}

function drawVideoOnCanvas() {
	drawBackground();
	drawText();
	requestAnimationFrame(drawVideoOnCanvas);
}

updateCanvasSize();
drawVideoOnCanvas();

window.addEventListener('resize', () => {
	updateCanvasSize();
	drawVideoOnCanvas();
});
