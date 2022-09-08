function waveFormula(min = game.wave.min, max = game.wave.max) {
	if (min > max) min = max;
	let result = "";
	result += "(" + format(Math.abs((max - min) / 2)) + " * sin(t)) + " + format((max + min) / 2);
	if (waveMult() !== 1) result = format(waveMult()) + "(" + result + ")";
	return result;
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
	desc: "increases the maximum value of your wave by 0.25",
	effect() {
		return game.wave.upgrades[0] * 0.25;
	},
	cost() {
		let div = 1;
		div *= wave_upgrades[5].effect();
		return (1.5 ** game.wave.upgrades[0]) * 10 / div;
	},
	unlocked() {
		return true;
	},
}, {
	title: "COOLHEADED",
	desc: "increases the minimum value of your wave by 0.25",
	effect() {
		return game.wave.upgrades[1] * 0.25;
	},
	cost() {
		let div = 1;
		div *= wave_upgrades[5].effect();
		if (game.wave.upgrades[7] > 0) return (1.4 ** game.wave.upgrades[1]) * 25 / div;
		return (1.5 ** game.wave.upgrades[1]) * 25 / div;
	},
	unlocked() {
		return game.wave.upgrades[0] > 0;
	},
}, {
	title: "LOOSEN CHAINS",
	desc: "multiplies your maximum wave points by 2",
	effect() {
		return 2 ** game.wave.upgrades[2];
	},
	cost() {
		if (game.wave.upgrades[7] > 0) return (2 ** game.wave.upgrades[2]) * 50;
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
		if (game.wave.upgrades[6] > 0) return (game.wave.pointBest + 1) ** 0.25;
		return (game.wave.pointBest + 1) ** 0.2;
	},
	effect() {
		return this.baseEff() ** game.wave.upgrades[3];
	},
	cost() {
		return (10 ** game.wave.upgrades[3]) * 200;
	},
	max: 20,
	unlocked() {
		return game.wave.upgrades[2] > 0;
	},
}, {
	title: "RECURSION",
	desc() {
		if (this.baseEff() == 3.333333333333333) return "multiplies the value of your wave by 3.33x (maxed)";
		return "multiplies the value of your wave based on your wave points (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		let eff = (game.wave.points + 1) ** 0.1;
		if (eff > 3.333333333333333) return 3.333333333333333;
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
}, {
	title: "CHEAPER",
	desc() {
		return "divides the cost of LARGER NUMBERS and COOLHEADED by 2";
	},
	effect() {
		return 2 ** game.wave.upgrades[5];
	},
	cost() {
		return (5 ** game.wave.upgrades[5]) * 500;
	},
	unlocked() {
		return game.wave.upgrades[4] > 0;
	},
}, {
	title: "MATHMATICAL",
	desc() {
		return "improves the effect formula of CALCULATIONS";
	},
	cost() {
		return 7500;
	},
	max: 1,
	unlocked() {
		return game.wave.upgrades[5] > 0;
	},
}, {
	title: "SMOOTH SCALE",
	desc() {
		return "improves the cost formulas of COOLHEADED and LOOSEN CHAINS";
	},
	cost() {
		return 25000;
	},
	max: 1,
	unlocked() {
		return game.wave.upgrades[6] > 0;
	},
}];
