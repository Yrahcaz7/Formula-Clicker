function waveFormula(min = game.wave.min, max = game.wave.max) {
	if (min > max) min = max;
	let result = "";
	result += "(" + format(Math.abs((max - min) / 2)) + " * sin(time)) + " + format((max + min) / 2);
	if (waveMult() !== 1) result = format(waveMult()) + "(" + result + ")";
	if (game.infinity.milestones[19]) {
		if (result.endsWith(")")) result += "(" + format(1.02) + "<sup>" + infinity + "</sup> + " + format(2.5) + infinity + ")";
		else result = "(" + result + ")(" + format(1.02) + "<sup>" + infinity + "</sup> + " + format(2.5) + infinity + ")";
	} else if (game.infinity.milestones[6]) {
		if (result.endsWith(")")) result += "(" + format(1.01) + "<sup>" + infinity + "</sup> + " + format(2) + infinity + ")";
		else result = "(" + result + ")(" + format(1.01) + "<sup>" + infinity + "</sup> + " + format(2) + infinity + ")";
	} else if (game.infinity.milestones[1]) {
		if (result.endsWith(")")) result += "(" + infinity + " + " + format(1) + ")";
		else result = "(" + result + ")(" + infinity + " + " + format(1) + ")";
	};
	return result;
};

var sinwaves = [];

for (let iteration = 0; iteration <= 615; iteration++) {
	sinwaves.push(Math.round(((50 * Math.sin((iteration * 50) / 2500)) + 50) * 100) / 100);
};

function waveMult() {
	let mult = 1;
	mult *= wave_upgrades[4].effect();
	mult *= improvements[21].effect();
	return mult;
};

const wave_upgrades = [{
	title: "LARGER NUMBERS",
	desc() {
		return "increases the maximum value of your wave by " + format(0.25);
	},
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
	desc() {
		return "increases the minimum value of your wave by " + format(0.25)
	},
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
	desc() {
		return "multiplies your maximum wave points by " + format(2);
	},
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
	max: 18,
	unlocked() {
		return game.wave.upgrades[2] > 0;
	},
}, {
	title: "RECURSION",
	desc() {
		if (this.baseEff() == 3.6 && game.improvements[20]) return "multiplies the value of your wave by " + format(3.6) + "x (maxed)";
		if (this.baseEff() == 3.333333333333333 && !game.improvements[20]) return "multiplies the value of your wave by " + format(3.33) + "x (maxed)";
		return "multiplies the value of your wave based on your wave points (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		let eff = (game.wave.points + 1) ** 0.1;
		if (game.improvements[20]) {
			if (eff > 3.6) return 3.6;
			return eff;
		};
		if (eff > 3.333333333333333) return 3.333333333333333;
		return eff;
	},
	effect() {
		return this.baseEff() ** game.wave.upgrades[4];
	},
	cost() {
		return (5 ** game.wave.upgrades[4]) * 250;
	},
	max() {
		if (game.infinity.milestones[20]) return Infinity;
		return 26;
	},
	unlocked() {
		return game.wave.upgrades[3] > 0;
	},
}, {
	title: "CHEAPER",
	desc() {
		return "divides the cost of LARGER NUMBERS and COOLHEADED by " + format(2);
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
	desc: "improves the effect formula of CALCULATIONS",
	cost() {
		return 7500;
	},
	max: 1,
	unlocked() {
		return game.wave.upgrades[5] > 0;
	},
}, {
	title: "SMOOTH SCALE",
	desc: "improves the cost formulas of COOLHEADED and LOOSEN CHAINS",
	cost() {
		return 25000;
	},
	max: 1,
	unlocked() {
		return game.wave.upgrades[6] > 0;
	},
}];
