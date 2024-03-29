const infNum = () => { return new Decimal(MAX).pow(Math.min(game.infinity.stage, MAX)) };

let prestiging = false;

/**
 * Resets for infinity points.
 */
function prestige() {
	if (prestiging) return;
	prestiging = true;
	game.clicks += (game.beyond.omega + 1);
	if (getInfGain() > 0) {
		// gain infinity points
		game.infinity.points += getInfGain();
		// fix invalid values
		if (game.infinity.points === Infinity || game.infinity.points !== game.infinity.points) game.infinity.points = MAX;
		// check for new milestones unlocked
		for (let index = 0; index < infinity_milestones.length; index++) {
			if (game.infinity.milestones[index] === undefined) game.infinity.milestones[index] = false;
			if (!game.infinity.milestones[index] && game.infinity.milestones[index - 1] !== false) {
				if (game.infinity.points >= infinity_milestones[index].req) game.infinity.milestones[index] = true;
			};
		};
	};
	if (game.infinity.milestones[43]) {
		prestiging = false;
		return;
	};
	// reset clicks
	if (!game.infinity.milestones[16]) {
		if (game.infinity.milestones[2]) game.clicks = Math.floor(game.clicks * 0.5);
		else game.clicks = 0;
	};
	// reset unlocks
	if (game.infinity.milestones[18]) {
		game.unlocks = ["pd", "vd", "t", "o"];
	} else if (game.infinity.milestones[17]) {
		game.tab = "main";
		game.unlocks = ["pd", "vd"];
	} else {
		game.tab = "main";
		game.unlocks = [];
	};
	if (!game.unlocks.includes("o")) {
		for (let index = 0; index < options.length; index++) {
			const element = options[index];
			if (element.type == "export" || element.type == "import") continue;
			if (element.set) element.set(element.default);
		};
	};
	// reset upgrades
	game.upgrades = [];
	// reset improvements
	let imp = game.improvements;
	game.improvements = [];
	if (game.infinity.milestones[28]) {
		for (let index = 0; index < imp.length && index < 25; index++) {
			if (imp[index]) game.improvements[index] = imp[index];
		};
	} else if (game.infinity.milestones[23]) {
		for (let index = 0; index < imp.length && index < 22; index++) {
			if (imp[index]) game.improvements[index] = imp[index];
		};
	} else {
		if (game.infinity.milestones[22]) {
			for (let index = 0; index < imp.length && index < 14; index++) {
				if (imp[index]) game.improvements[index] = imp[index];
			};
		} else {
			if (game.infinity.milestones[21]) {
				for (let index = 0; index < imp.length && index < 10; index++) {
					if (imp[index]) game.improvements[index] = imp[index];
				};
			} else if (game.infinity.milestones[18]) {
				for (let index = 0; index < imp.length && index < 5; index++) {
					if (imp[index]) game.improvements[index] = imp[index];
				};
			} else if (game.infinity.milestones[17]) {
				for (let index = 0; index < imp.length && index < 4; index++) {
					if (imp[index]) game.improvements[index] = imp[index];
				};
			} else if (game.infinity.milestones[3] && imp[3]) game.improvements[3] = imp[3];
			if (game.infinity.milestones[4] && imp[11]) game.improvements[11] = imp[11];
		};
		if (game.infinity.milestones[5] && imp[16]) game.improvements[16] = imp[16];
	};
	// reset wave upgrades
	if (!game.infinity.milestones[40]) {
		let wvupg = game.wave.upgrades;
		game.wave.upgrades = [];
		let num = 0;
		if (game.infinity.milestones[39]) num = 6;
		else if (game.infinity.milestones[38]) num = 5;
		else if (game.infinity.milestones[37]) num = 4;
		else if (game.infinity.milestones[36]) num = 3;
		else if (game.infinity.milestones[35]) num = 2;
		else if (game.infinity.milestones[34]) num = 1;
		if (num > 0) {
			for (let index = 0; index < wvupg.length && index < num; index++) {
				if (wvupg[index]) game.wave.upgrades[index] = wvupg[index];
			};
		};
	};
	// reset points
	game.points = new Decimal(0);
	game.pointBest = new Decimal(0);
	game.pointTotal = new Decimal(0);
	// reset wave points
	game.wave.points = 0;
	game.wave.pointBest = 0;
	game.wave.frame = 0;
	// reset page
	if (!game.infinity.milestones[22]) setPage();
	prestiging = false;
};

/**
 * Calculates infinity point gain.
 * @returns {number} gain
 */
function getInfGain() {
	if (game.points.lt(MAX)) return 0;
	let gain = game.points.log10().div(308.2547155599167).mul(infMult()).floor().toNumber();
	if (game.infinity.stage == 1 && game.infinity.points + gain >= 45) return 45 - game.infinity.points;
	if (game.points.gte(infNum())) gain = infNum().log10().div(308.2547155599167).mul(infMult()).floor().toNumber();
	if (gain !== gain) return 0;
	if (gain >= MAX) return MAX;
	return gain;
};

/**
 * Calculates "next infinity point at" text.
 * @returns {string} text
 */
function getNextInf() {
	if (getInfGain() / infMult() >= game.infinity.stage || getInfGain() >= MAX) return "Max " + infinity + " gained on prestige";
	if (game.infinity.stage == 1) {
		if (game.infinity.points + getInfGain() >= 45) return infinity + " gain restricted by ???";
		if (getInfGain() === 0) return "Next " + infinity + " at " + format(MAX) + " points";
	};
	let next = new Decimal(10).pow((getInfGain() + 1) * 308.2547155599167 / infMult());
	if (next.gt(infNum())) return "Max " + infinity + " gained on prestige";
	return "Next " + infinity + " at " + format(next.max(MAX), true, false, false, true) + " points";
};

/**
 * Calculates infinity point multiplier.
 * @returns {number} multiplier
 */
function infMult() {
	let mult = 1;
	if (game.infinity.milestones[29]) mult *= infinity_milestones[29].effect();
	if (game.infinity.milestones[47]) mult *= infinity_milestones[47].effect();
	if (game.infinity.milestones[57]) mult *= infinity_milestones[57].effect();
	if (game.beyond.omega > 0) mult *= (game.beyond.omega + 1);
	return mult;
};

/**
 * Calculates break infinity bulk buy amount.
 * @returns {number} bulk
 */
function breakInfBulk() {
	let bulk = 1;
	if (game.infinity.milestones[64]) bulk *= 10;
	if (game.infinity.milestones[65]) bulk *= 10;
	if (game.infinity.milestones[66]) bulk *= 10;
	if (game.infinity.milestones[67]) bulk *= 10;
	if (game.infinity.milestones[68]) bulk *= 10;
	if (game.infinity.milestones[69]) bulk *= 100;
	if (game.infinity.milestones[70]) bulk *= 100;
	if (game.infinity.milestones[71]) bulk *= 100;
	if (game.infinity.milestones[72]) bulk *= 100;
	if (game.infinity.milestones[73]) bulk *= 100;
	if (game.infinity.milestones[74]) {
		let mul = 1;
		if (game.infinity.milestones[75]) mul *= 2;
		if (game.infinity.milestones[76]) mul *= 2;
		if (game.infinity.milestones[77]) mul *= 2;
		if (game.infinity.milestones[78]) mul *= 2;
		bulk += game.infinity.stage / 500000 * mul;
	};
	if (game.beyond.omega > 0) bulk *= (game.beyond.omega + 1);
	return bulk;
};

const infinity_milestones = [{
	desc: "adds the " + infinity + " element to the point gain formula",
	req: 1,
}, {
	desc: "adds the " + infinity + " element to the sinusoidal wave formula",
	req: 2,
}, {
	desc() {return "keeps " + format(50, true, false, true) + "% of your clicks on prestige"},
	req: 3,
	merge: [16],
}, {
	desc: "keeps the improvement AUTOMATION on prestige",
	req: 4,
	merge: [17],
}, {
	desc: "keeps the improvement FINALLY! on prestige",
	req: 5,
	merge: [22],
}, {
	desc: "keeps the improvement SUPER AUTO on prestige",
	req: 6,
	merge: [23],
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: 7,
	merge: [19],
}, {
	desc: "unlocks the LARGER NUMBERS autobuyer, which doesn't spend any wave points",
	req: 8,
	merge: [11, 15],
}, {
	desc: "unlocks the COOLHEADED autobuyer, which doesn't spend any wave points",
	req: 9,
	merge: [11, 15],
}, {
	desc: "unlocks the WEAKEN CHAINS autobuyer, which doesn't spend any wave points",
	req: 10,
	merge: [11, 15],
}, {
	desc: "changes SUPER AUTO to always activate",
	req: 12,
}, {
	desc: "unlocks the wave upgrade autobuyer",
	req: 14,
}, {
	desc: "unlocks the improvement autobuyer",
	req: 16,
}, {
	desc: "improves the " + infinity + " element in the point gain formula",
	req: 18,
	merge: [24],
}, {
	desc: "improves the upgrade autobuyer to work twice as fast",
	req: 20,
	merge: [41],
}, {
	desc: "improves the wave upgrade autobuyer to not spend any wave points",
	req: 25,
}, {
	desc: "keeps all of your clicks on prestige",
	req: 30,
	merge: [43],
}, {
	desc: "keeps the first four improvements on prestige",
	req: 35,
	merge: [18],
}, {
	desc: "keeps the first five improvements on prestige",
	req: 40,
	merge: [21],
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: 45,
	merge: [25],
}, {
	desc: "removes the maximum bought on RECURSION, a wave upgrade",
	req: 50,
}, {
	desc: "keeps the first ten improvements on prestige",
	req: 55,
	merge: [22],
}, {
	desc: "keeps the first fourteen improvements on prestige",
	req: 60,
	merge: [23],
}, {
	desc: "keeps the first twenty two improvements on prestige",
	req: 66,
	merge: [28],
}, {
	desc: "improves the " + infinity + " element in the point gain formula",
	req: 75,
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: 86,
}, {
	desc() { return "gains " + format(1e-10, true, false, true) + "% of your point gain per second" },
	req: 100,
	merge: [27],
}, {
	desc() { return "gains " + format(0.01, true, false, true) + "% of your point gain per second" },
	req: 115,
	merge: [30],
}, {
	desc: "keeps the first twenty five improvements on prestige",
	req: 132,
	merge: [43],
}, {
	desc() {
		if (this.effect() == 1.75) return "multiplies " + infinity + " gain by " + format(1.75) + "x (maxed)";
		return "multiplies " + infinity + " gain based on your wave points (" + format(this.effect()) + "x)";
	},
	effect() {
		let eff = (game.wave.points + 1) ** 0.002;
		if (eff > 1.75 || eff !== eff) return 1.75;
		return eff;
	},
	req: 150,
}, {
	desc() { return "gains " + format(1, true, false, true) + "% of your point gain per second" },
	req: 170,
	merge: [32],
}, {
	desc: "improves the wave upgrade autobuyer to work twice as fast",
	req: 195,
	merge: [33],
}, {
	desc() { return "gains " + format(100, true, false, true) + "% of your point gain per second and disables manual point gain" },
	req: 225,
}, {
	desc: "improves the wave upgrade autobuyer to work four times as fast",
	req: 275,
}, {
	desc: "keeps the first wave upgrade on prestige",
	req: 333,
	merge: [35],
}, {
	desc: "keeps the first two wave upgrades on prestige",
	req: 400,
	merge: [36],
}, {
	desc: "keeps the first three wave upgrades on prestige",
	req: 480,
	merge: [37],
}, {
	desc: "keeps the first four wave upgrades on prestige",
	req: 575,
	merge: [38],
}, {
	desc: "keeps the first five wave upgrades on prestige",
	req: 690,
	merge: [39],
}, {
	desc: "keeps the first six wave upgrades on prestige",
	req: 825,
	merge: [40],
}, {
	desc: "keeps all wave upgrades on prestige",
	req: 1000,
	merge: [43],
}, {
	desc: "improves the upgrade autobuyer to work four times as fast",
	req: 1200,
	merge: [42],
}, {
	desc: "improves the upgrade autobuyer to work eight times as fast",
	req: 1500,
	merge: [50],
}, {
	desc: "keeps everything on prestige",
	req: 2000,
}, {
	desc: "improves the EFFECIENCY autobuyer to work twice as fast",
	req: 5000,
	merge: [46],
}, {
	desc: "unlocks the break infinity autobuyer",
	req: 10000,
}, {
	desc: "improves the EFFECIENCY autobuyer to work four times as fast",
	req: 25000,
	merge: [48],
}, {
	desc() { return "multiplies " + infinity + " gain based on your " + infinity + " (" + format(this.effect()) + "x)" },
	effect() { return (game.infinity.points + 1) ** 0.025 },
	req: 50000,
}, {
	desc: "improves the EFFECIENCY autobuyer to work eight times as fast",
	req: 100000,
	merge: [51],
}, {
	desc() { return "increases the absolute maximum bought from " + format(100000) + " to " + format(10000000) },
	req: 250000,
}, {
	desc: "improves the upgrade autobuyer to work sixteen times as fast",
	req: 500000,
	merge: [52],
}, {
	desc() { return "sets your amount of EFFECIENCY to " + format(1e10) + " and disables buying it" },
	req: 1000000,
}, {
	desc: "improves the upgrade autobuyer to work eighty times as fast",
	req: 2500000,
	merge: [56],
}, {
	desc: "improves the break infinity autobuyer to not reset your points",
	req: 5000000,
}, {
	desc: "improves the break infinity autobuyer to work five times as fast",
	req: 10000000,
	merge: [55],
}, {
	desc: "improves the break infinity autobuyer to work twenty five times as fast",
	req: 25000000,
	merge: [58],
}, {
	desc: "improves the upgrade autobuyer to work one hundred sixty times as fast",
	req: 50000000,
}, {
	desc() {
		if (this.effect() == 10) return "multiplies " + infinity + " gain by " + format(10) + "x (maxed)";
		return "multiplies " + infinity + " gain based your number of broken Infinity (" + format(this.effect()) + "x)";
	},
	effect() {
		let eff = (((game.infinity.stage - 1) / 10000) + 1) ** 0.25;
		if (eff > 10 || eff !== eff) return 10;
		return eff;
	},
	req: 100000000,
}, {
	desc: "improves the break infinity autobuyer to work one hundred twenty five times as fast",
	req: 250000000,
	merge: [59],
}, {
	desc: "improves the break infinity autobuyer to work two hundred fifty times as fast",
	req: 500000000,
	merge: [60],
}, {
	desc: "improves the break infinity autobuyer to work five hundred times as fast",
	req: 1e9,
	merge: [61],
}, {
	desc: "improves the break infinity autobuyer to work one thousand times as fast",
	req: 2.5e9,
	merge: [62],
}, {
	desc: "improves the break infinity autobuyer to work two thousand times as fast",
	req: 5e9,
	merge: [63],
}, {
	desc: "improves the break infinity autobuyer to work four thousand times as fast",
	req: 1e10,
}, {
	desc() { return "makes break infinity bulk " + format(10) + "x broken Infinity" },
	req: 4.5e10,
	merge: [65],
}, {
	desc() { return "makes break infinity bulk " + format(100) + "x broken Infinity" },
	req: 2e11,
	merge: [66],
}, {
	desc() { return "makes break infinity bulk " + format(1000) + "x broken Infinity" },
	req: 1e12,
	merge: [67],
}, {
	desc() { return "makes break infinity bulk " + format(10000) + "x broken Infinity" },
	req: 7.5e12,
	merge: [68],
}, {
	desc() { return "makes break infinity bulk " + format(100000) + "x broken Infinity" },
	req: 1e14,
	merge: [69],
}, {
	desc() { return "makes break infinity bulk " + format(10000000) + "x broken Infinity" },
	req: 2.5e15,
	merge: [70],
}, {
	desc() { return "makes break infinity bulk " + format(1e9) + "x broken Infinity" },
	req: 1e17,
	merge: [71],
}, {
	desc() { return "makes break infinity bulk " + format(1e11) + "x broken Infinity" },
	req: 5e18,
	merge: [72],
}, {
	desc() { return "makes break infinity bulk " + format(1e13) + "x broken Infinity" },
	req: 5e20,
	merge: [73],
}, {
	desc() { return "makes break infinity bulk " + format(1e15) + "x broken Infinity" },
	req: 7.5e22,
	merge: [74],
}, {
	desc: "makes break infinity bulk scale based on your number of broken Infinity",
	req: 2.5e25,
}, {
	desc: "makes break infinity bulk scaling twice as much",
	req: 1e36,
	merge: [76],
}, {
	desc: "makes break infinity bulk scaling four times as much",
	req: 1e55,
	merge: [77],
}, {
	desc: "makes break infinity bulk scaling eight times as much",
	req: 1e100,
	merge: [78],
}, {
	desc: "makes break infinity bulk scaling sixteen times as much",
	req: 1e175,
}, {
	desc: "unlocks the 13th upgrade (look at the main tab)",
	req: MAX,
}];
