function waveFormula(min = game.wave.min, max = game.wave.max) {
	if (min > max) min = max;
	if (waveMult() !== 1) return format(waveMult()) + "((" + format(Math.abs((max - min) / 2)) + " * sin(t)) + " + format((max + min) / 2) + ")";
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

function waveMult() {
	let mult = 1;
	mult *= wave_upgrades[4].effect();
	return mult;
};

const wave_upgrades = [{
	title: "LARGER NUMBERS",
	desc() {
		return "increases the maximum value of your wave by 0.25";
	},
	effect() {
		return game.wave.upgrades[0] * 0.25;
	},
	cost() {
		return (1.5 ** game.wave.upgrades[0]) * 10;
	},
	unlocked() {
		return true;
	},
}, {
	title: "COOLHEADED",
	desc() {
		return "increases the minimum value of your wave by 0.25";
	},
	effect() {
		return game.wave.upgrades[1] * 0.25;
	},
	cost() {
		return (1.5 ** game.wave.upgrades[1]) * 25;
	},
	unlocked() {
		return game.wave.upgrades[0] > 0;
	},
}, {
	title: "LOOSEN CHAINS",
	desc() {
		return "multiplies your maximum wave points by 2";
	},
	effect() {
		return 2 ** game.wave.upgrades[2];
	},
	cost() {
		return (2 ** game.wave.upgrades[2]) * 100;
	},
	unlocked() {
		return game.wave.upgrades[1] > 0;
	},
}, {
	title: "CALCULATIONS",
	desc() {
		return "multiplies the " + constant() + " constant based on your best wave points (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		return (game.wave.pointBest + 1) ** 0.2;
	},
	effect() {
		return this.baseEff() ** game.wave.upgrades[3];
	},
	cost() {
		return (10 ** game.wave.upgrades[3]) * 200;
	},
	unlocked() {
		return game.wave.upgrades[2] > 0;
	},
}, {
	title: "RECURSION",
	desc() {
		if (this.baseEff() == 4) return "multiplies the value of your wave by 4 (maxed)";
		return "multiplies the value of your wave based on your wave points (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		let eff = (game.wave.points + 1) ** 0.1;
		if (eff > 4) return 4;
		return eff;
	},
	effect() {
		return this.baseEff() ** game.wave.upgrades[4];
	},
	cost() {
		return (5 ** game.wave.upgrades[4]) * 250;
	},
	unlocked() {
		return game.wave.upgrades[3] > 0;
	},
}];
