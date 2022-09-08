function waveFormula(min = game.wave.min, max = game.wave.max) {
	return "(" + format(Math.abs((max - min) / 2)) + " * sin(t)) + " + format((max + min) / 2);
};

function findNumber(percentage, min, max) {
	if (percentage > 1) percentage = 1;
	if (percentage < 0) percentage = 0;
	if (min > max) min = max;
	return (percentage * (max - min)) + min;
};

var sinwaves = [];

for (let iteration = 0; iteration <= 615; iteration++) {
	sinwaves.push(Math.round(((50 * Math.sin((iteration * 50) / 2500)) + 50) * 100) / 100);
};

const wave_upgrades = [{
	title: "LARGER NUMBERS",
	desc() {
		return "increases the maximum value of your wave by 0.2";
	},
	effect() {
		return game.wave.upgrades[0] * 0.2;
	},
	cost() {
		return (2 ** game.wave.upgrades[0]) * 10;
	},
	unlocked() {
		return true;
	},
}];
