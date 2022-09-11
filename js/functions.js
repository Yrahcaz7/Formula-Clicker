function copy(text) {
	const fallback = () => {
		var textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		var successful = document.execCommand("copy");
		document.body.removeChild(textArea);
		return successful;
	};
	if (!navigator.clipboard) return fallback();
	navigator.clipboard.writeText(text).then(() => {return true}).catch(() => {return false});
	return fallback();
};

function findNumber(percentage, min, max) {
	if (percentage > 1) percentage = 1;
	if (percentage < 0) percentage = 0;
	if (min > max) min = max;
	return (percentage * (max - min)) + min;
};

function multiBuy(scale, number, base, points = game.points, divCost = 1) {
	scale = +scale;
	number = +number;
	base = +base;
	if (scale < 0 || number < 0) return [NaN, NaN];
	if (scale == 0 || base <= 0) return [0, Infinity];
	let result = (scale ** number) * base / divCost;
	if (points < result) return [result, 0];
	if (scale == 1) return [Math.floor(points / base * divCost) * base / divCost, Math.floor(points / base * divCost)];
	let mult = 1, count = 1;
	while (true) {
		if (result * (mult + (scale ** count)) > points) break;
		mult += scale ** count;
		count++;
	};
	return [result * mult, count];
};
