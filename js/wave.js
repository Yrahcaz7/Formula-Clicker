let sinwaves = [];

for (let iteration = 0; iteration <= 615; iteration++) {
	sinwaves.push(Math.round(((50 * Math.sin((iteration * 50) / 2500)) + 50) * 100) / 100);
};

/**
 * Calculates the wave formula.
 * @returns {string} formula
 */
function waveFormula() {
	let max = getWaveMax(), min = getWaveMin();
	let result = "";
	if (min > max) min = max;
	// normal formula
	result += "(" + format(Math.abs((max - min) / 2)) + " * sin(time)) + " + format((max + min) / 2);
	if (waveMult() !== 1) result = format(waveMult()) + "(" + result + ")";
	// add infinity formula piece
	if (game.infinity.milestones[6]) {
		let numbers = [1.02, 2];
		if (game.infinity.milestones[19]) numbers = [1.05, 2.5];
		if (game.infinity.milestones[25]) numbers = [1.1, 5];
		if (result.endsWith(")")) result += "(" + format(numbers[0]) + "<sup>" + infinity + "</sup> + " + format(numbers[1]) + infinity + ")";
		else result = "(" + result + ")(" + format(numbers[0]) + "<sup>" + infinity + "</sup> + " + format(numbers[1]) + infinity + ")";
	} else if (game.infinity.milestones[1]) {
		if (result.endsWith(")")) result += "(" + infinity + " + " + format(1) + ")";
		else result = "(" + result + ")(" + infinity + " + " + format(1) + ")";
	};
	// add beyond formula piece
	if (game.beyond.omega) {
		if (result.endsWith(")")) result += "(" + omega + " + " + format(1) + ")";
		else result = "(" + result + ")(" + omega + " + " + format(1) + ")";
	};
	// return
	return result;
};

const wave_upgrades = [{
	title: "LARGER NUMBERS",
	desc() {return "increases the maximum value of your wave by " + format(0.25)},
	effect() {return game.wave.upgrades[0] * 0.25},
	cost() {return (1.5 ** game.wave.upgrades[0]) * 10 / wave_upgrades[5].effect()},
	unlocked() {return true},
}, {
	title: "COOLHEADED",
	desc() {return "increases the minimum value of your wave by " + format(0.25)},
	effect() {return game.wave.upgrades[1] * 0.25},
	cost() {
		let div = wave_upgrades[5].effect();
		if (game.wave.upgrades[7] > 0) return (1.4 ** game.wave.upgrades[1]) * 25 / div;
		return (1.5 ** game.wave.upgrades[1]) * 25 / div;
	},
	unlocked() {return game.wave.upgrades[0] > 0},
}, {
	title: "LOOSEN CHAINS",
	desc() {return "multiplies your maximum wave points by " + format(2)},
	effect() {return 2 ** game.wave.upgrades[2]},
	cost() {return (game.wave.upgrades[7] > 0 ? (2 ** game.wave.upgrades[2]) * 50 : (2 ** game.wave.upgrades[2]) * 100)},
	unlocked() {return game.wave.upgrades[1] > 0},
}, {
	title: "CALCULATIONS",
	desc() {return "multiplies the " + constant() + " constant based on your best wave points (" + format(this.baseEff()) + "x)"},
	baseEff() {return (game.wave.upgrades[6] > 0 ? (game.wave.pointBest + 1) ** 0.25 : (game.wave.pointBest + 1) ** 0.2)},
	effect() {return new Decimal(this.baseEff()).pow(game.wave.upgrades[3])},
	cost() {return (10 ** game.wave.upgrades[3]) * 200},
	max: 18,
	unlocked() {return game.wave.upgrades[2] > 0},
}, {
	title: "RECURSION",
	desc() {
		if (this.baseEff() == 3.6 && game.improvements[20]) return "multiplies the value of your wave by " + format(3.6) + "x (maxed)";
		if (this.baseEff() == 3.36 && !game.improvements[20]) return "multiplies the value of your wave by " + format(3.36) + "x (maxed)";
		return "multiplies the value of your wave based on your wave points (" + format(this.baseEff()) + "x)";
	},
	baseEff() {
		let eff = (game.wave.points + 1) ** 0.1;
		if (game.improvements[20]) {
			if (eff > 3.6 || eff !== eff) return 3.6;
			return eff;
		};
		if (eff > 3.36 || eff !== eff) return 3.36;
		return eff;
	},
	effect() {return this.baseEff() ** game.wave.upgrades[4]},
	cost() {
		let div = 1;
		if (game.wave.upgrades[9]) div *= 1.75;
		return (5 ** game.wave.upgrades[4]) * 250 / div;
	},
	max() {return game.infinity.milestones[20] ? 100000 : 26},
	unlocked() {return game.wave.upgrades[3] > 0},
}, {
	title: "CHEAPER",
	desc() {return "divides the cost of LARGER NUMBERS and COOLHEADED by " + format(2)},
	effect() {return 2 ** game.wave.upgrades[5]},
	cost() {
		let div = 1;
		if (game.wave.upgrades[9]) div *= 1.75;
		return (5 ** game.wave.upgrades[5]) * 500 / div;
	},
	unlocked() {return game.wave.upgrades[4] > 0},
}, {
	title: "MATHEMATICAL",
	desc: "improves the effect formula of CALCULATIONS",
	cost: 7500,
	max: 1,
	unlocked() {return game.wave.upgrades[5] > 0},
}, {
	title: "SMOOTH SCALE",
	desc: "improves the cost formulas of COOLHEADED and LOOSEN CHAINS",
	cost: 25000,
	max: 1,
	unlocked() {return game.wave.upgrades[6]},
}, {
	title: "UNSTOPPABLE",
	desc: "doubles the value of your wave when you have less wave points than your best",
	effect() {return (game.wave.upgrades[8] && game.wave.points < game.wave.pointBest ? 2 : 1)},
	cost: 5e14,
	max: 1,
	unlocked() {return game.wave.upgrades[7] && game.improvements[20]},
}, {
	title: "EVEN CHEAPER",
	desc() {return "divides the cost of RECURSION and CHEAPER by " + format(1.75)},
	cost: 5e18,
	max: 1,
	unlocked() {return game.wave.upgrades[8] && game.improvements[21]},
}];
