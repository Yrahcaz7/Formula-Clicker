const infNum = () => {return new Decimal(1.7976931348620926e308).pow(game.infinity.stage)};

function prestige() {
	game.clicks++;
	if (getInfGain() > 0) {
		game.infinity.points += getInfGain();
		if (game.infinity.points > game.infinity.pointBest) game.infinity.pointBest = game.infinity.points;
		if (game.infinity.points === Infinity || game.infinity.points !== game.infinity.points) game.infinity.points = 1.7976931348620926e308;
		if (game.infinity.pointBest === Infinity || game.infinity.pointBest !== game.infinity.pointBest) game.infinity.pointBest = 1.7976931348620926e308;
	};
	if (game.infinity.milestones[43]) return;
	game.points = new Decimal(0);
	game.pointBest = new Decimal(0);
	game.pointTotal = new Decimal(0);
	if (!game.infinity.milestones[16]) {
		if (game.infinity.milestones[2]) game.clicks = Math.floor(game.clicks * 0.5);
		else game.clicks = 0;
	};
	if (game.infinity.milestones[18]) {
		game.unlocks = ["pd", "vd", "t", "o"];
	} else if (game.infinity.milestones[17]) {
		game.tab = "main";
		game.unlocks = ["pd", "vd"];
	} else {
		game.tab = "main";
		game.unlocks = [];
	};
	game.upgrades = [];
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
	game.wave.points = 0;
	game.wave.pointBest = 0;
	game.wave.pointMax = 100;
	game.wave.pointGen = 0;
	game.wave.frame = 0;
	game.wave.min = 0;
	game.wave.max = 0;
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
	if (!game.infinity.milestones[18]) setPage();
};

function getInfGain() {
	if (game.points.lt(1.7976931348620926e308) || (game.infinity.points >= 45 && game.infinity.stage == 1)) return 0;
	let gain = game.points.log10().div(308.2547155599167).mul(infMul()).floor().toNumber();
	if (game.points > infNum()) gain = infNum().log10().div(308.2547155599167).mul(infMul()).floor().toNumber();
	if (gain !== gain) return 0;
	return gain;
};

function getNextInf() {
	if (getInfGain() / infMul() >= game.infinity.stage) return "Max " + infinity + " gained on reset";
	if (getInfGain() === 0) return "Next " + infinity + " at " + format(1.7976931348620926e308, true, false, false, true) + " points";
	let next = new Decimal(10).pow((getInfGain() + 1) * 308.2547155599167 / infMul());
	if (next.gte(infNum())) return "Max " + infinity + " gained on reset";
	return "Next " + infinity + " at " + format(next, true, false, false, true) + " points";
};

function infMul() {
	let mul = 1;
	if (game.infinity.milestones[29]) mul *= infinity_milestones[29].effect();
	if (game.infinity.milestones[47]) mul *= infinity_milestones[47].effect();
	if (game.infinity.milestones[57]) mul *= infinity_milestones[57].effect();
	return mul;
};

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
	return bulk;
};

const resources = {
	points: "points",
	pointBest: "best points",
	pointTotal: "total points",
	wave_points: "wave points",
	wave_pointBest: "best wave points",
	wave_pointTotal: "total wave points",
	infinity_points: infinity,
	infinity_pointBest: "best " + infinity,
	infinity_pointTotal: "total " + infinity,
};

const infinity_milestones = [{
	desc: "adds the " + infinity + " element to the point gain formula",
	req: {infinity_points: 1},
}, {
	desc: "adds the " + infinity + " element to the sinusoidal wave formula",
	req: {infinity_points: 2},
}, {
	desc() {return "keeps " + format(50, true, false, true) + "% of your clicks on reset"},
	req: {infinity_points: 3},
	merge: [16],
}, {
	desc: "keeps the improvement AUTOMATION on reset",
	req: {infinity_points: 4},
	merge: [17],
}, {
	desc: "keeps the improvement FINALLY! on reset",
	req: {infinity_points: 5},
	merge: [22],
}, {
	desc: "keeps the improvement SUPER AUTO on reset",
	req: {infinity_points: 6},
	merge: [23],
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: {infinity_points: 7},
	merge: [19],
}, {
	desc: "unlocks LARGER NUMBERS autobuyer, which doesn't need to use any wave points",
	req: {infinity_points: 8},
	merge: [11, 15],
}, {
	desc: "unlocks COOLHEADED autobuyer, which doesn't need to use any wave points",
	req: {infinity_points: 9},
	merge: [11, 15],
}, {
	desc: "unlocks LOOSEN CHAINS autobuyer, which doesn't need to use any wave points",
	req: {infinity_points: 10},
	merge: [11, 15],
}, {
	desc: "changes SUPER AUTO to always activate",
	req: {infinity_points: 12},
}, {
	desc: "unlocks the wave upgrade autobuyer",
	req: {infinity_points: 14},
}, {
	desc: "unlocks the improvement autobuyer",
	req: {infinity_points: 16},
}, {
	desc: "improves the " + infinity + " element in the point gain formula",
	req: {infinity_points: 18},
	merge: [24],
}, {
	desc: "improves the upgrade autobuyer to work twice as fast",
	req: {infinity_points: 20},
	merge: [41],
}, {
	desc: "improves the wave upgrade autobuyer to not need to use any wave points",
	req: {infinity_points: 25},
}, {
	desc: "keeps all of your clicks on reset",
	req: {infinity_points: 30},
	merge: [43],
}, {
	desc: "keeps the first four improvements on reset",
	req: {infinity_points: 35},
	merge: [18],
}, {
	desc: "keeps the first five improvements on reset",
	req: {infinity_points: 40},
	merge: [21],
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: {infinity_points: 45},
	merge: [25],
}, {
	desc: "removes the maximum bought on RECURSION, a wave upgrade",
	req: {infinity_points: 50},
}, {
	desc: "keeps the first ten improvements on reset",
	req: {infinity_points: 55},
	merge: [22],
}, {
	desc: "keeps the first fourteen improvements on reset",
	req: {infinity_points: 60},
	merge: [23],
}, {
	desc: "keeps the first twenty-two improvements on reset",
	req: {infinity_points: 66},
	merge: [28],
}, {
	desc: "improves the " + infinity + " element in the point gain formula",
	req: {infinity_points: 75},
}, {
	desc: "improves the " + infinity + " element in the sinusoidal wave formula",
	req: {infinity_points: 86},
}, {
	desc() {
		return "gains " + format(1e-10, true, false, true) + "% of your point gain per second";
	},
	req: {infinity_points: 100},
	merge: [27],
}, {
	desc() {
		return "gains " + format(0.01, true, false, true) + "% of your point gain per second";
	},
	req: {infinity_points: 115},
	merge: [30],
}, {
	desc: "keeps the first twenty-five improvements on reset",
	req: {infinity_points: 132},
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
	req: {infinity_points: 150},
}, {
	desc() {
		return "gains " + format(1, true, false, true) + "% of your point gain per second";
	},
	req: {infinity_points: 170},
	merge: [32],
}, {
	desc: "improves the wave upgrade autobuyer to work twice as fast",
	req: {infinity_points: 195},
	merge: [33],
}, {
	desc() {
		return "gains " + format(100, true, false, true) + "% of your point gain per second and disables manual point gain";
	},
	req: {infinity_points: 225},
}, {
	desc: "improves the wave upgrade autobuyer to work four times as fast",
	req: {infinity_points: 275},
}, {
	desc: "keeps the first wave upgrade on reset",
	req: {infinity_points: 333},
	merge: [35],
}, {
	desc: "keeps the first two wave upgrades on reset",
	req: {infinity_points: 400},
	merge: [36],
}, {
	desc: "keeps the first three wave upgrades on reset",
	req: {infinity_points: 480},
	merge: [37],
}, {
	desc: "keeps the first four wave upgrades on reset",
	req: {infinity_points: 575},
	merge: [38],
}, {
	desc: "keeps the first five wave upgrades on reset",
	req: {infinity_points: 690},
	merge: [39],
}, {
	desc: "keeps the first six wave upgrades on reset",
	req: {infinity_points: 825},
	merge: [40],
}, {
	desc: "keeps all wave upgrades on reset",
	req: {infinity_points: 1000},
	merge: [43],
}, {
	desc: "improves the upgrade autobuyer to work twice as fast",
	req: {infinity_points: 1200},
	merge: [42],
}, {
	desc: "improves the upgrade autobuyer to work twice as fast again",
	req: {infinity_points: 1500},
	merge: [50],
}, {
	desc: "keeps everything on reset",
	req: {infinity_points: 2000},
}, {
	desc: "improves the EFFECIENCY autobuyer to work twice as fast",
	req: {infinity_points: 5000},
	merge: [46],
}, {
	desc: "unlocks the break infinity autobuyer",
	req: {infinity_points: 10000},
}, {
	desc: "improves the EFFECIENCY autobuyer to work twice as fast again",
	req: {infinity_points: 25000},
	merge: [48],
}, {
	desc() {
		return "multiplies " + infinity + " gain based on your " + infinity + " (" + format(this.effect()) + "x)";
	},
	effect() {
		return (game.infinity.points + 1) ** 0.025;
	},
	req: {infinity_points: 50000},
}, {
	desc: "improves the EFFECIENCY autobuyer to work twice as fast again",
	req: {infinity_points: 100000},
	merge: [51],
}, {
	desc: "multiplies the absolute maximum bought for everything by 100",
	req: {infinity_points: 250000},
}, {
	desc: "improves the upgrade autobuyer to work twice as fast again",
	req: {infinity_points: 500000},
	merge: [52],
}, {
	desc() {
		return "sets your amount of EFFECIENCY to " + format(1e10) + " and disables buying it";
	},
	req: {infinity_points: 5000000},
}, {
	desc: "improves the upgrade autobuyer to work five times as fast",
	req: {infinity_points: 2500000},
	merge: [56],
}, {
	desc: "improves the break infinity autobuyer to not reset your points",
	req: {infinity_points: 5000000},
}, {
	desc: "improves the break infinity autobuyer to work five times as fast",
	req: {infinity_points: 10000000},
	merge: [55],
}, {
	desc: "improves the break infinity autobuyer to work five times as fast again",
	req: {infinity_points: 25000000},
	merge: [58],
}, {
	desc: "improves the upgrade autobuyer to work twice as fast",
	req: {infinity_points: 50000000},
}, {
	desc() {
		if (this.effect() == 10) return "multiplies " + infinity + " gain by " + format(10) + "x (maxed)";
		return "multiplies " + infinity + " gain based on your broken infinities (" + format(this.effect()) + "x)";
	},
	effect() {
		let eff = ((game.infinity.stage / 10000) + 1) ** 0.25;
		if (eff > 10 || eff !== eff) return 10;
		return eff;
	},
	req: {infinity_points: 100000000},
}, {
	desc: "improves the break infinity autobuyer to work five times as fast again",
	req: {infinity_points: 250000000},
	merge: [59],
}, {
	desc: "improves the break infinity autobuyer to work twice as fast",
	req: {infinity_points: 500000000},
	merge: [60],
}, {
	desc: "improves the break infinity autobuyer to work twice as fast again",
	req: {infinity_points: 1e9},
	merge: [61],
}, {
	desc: "improves the break infinity autobuyer to work twice as fast again",
	req: {infinity_points: 2.5e9},
	merge: [62],
}, {
	desc: "improves the break infinity autobuyer to work twice as fast again",
	req: {infinity_points: 5e9},
	merge: [63],
}, {
	desc: "improves the break infinity autobuyer to work twice as fast again",
	req: {infinity_points: 1e10},
}, {
	desc: "makes break infinity bulk buy 10x",
	req: {infinity_points: 4.5e10},
	merge: [65],
}, {
	desc: "makes break infinity bulk buy 10x more",
	req: {infinity_points: 2e11},
	merge: [66],
}, {
	desc: "makes break infinity bulk buy 10x more again",
	req: {infinity_points: 1e12},
	merge: [67],
}, {
	desc: "makes break infinity bulk buy 10x more again",
	req: {infinity_points: 7.5e12},
	merge: [68],
}, {
	desc: "makes break infinity bulk buy 10x more again",
	req: {infinity_points: 1e14},
	merge: [69],
}, {
	desc: "makes break infinity bulk buy 100x more",
	req: {infinity_points: 2.5e15},
	merge: [70],
}, {
	desc: "makes break infinity bulk buy 100x more again",
	req: {infinity_points: 1e17},
	merge: [71],
}, {
	desc: "makes break infinity bulk buy 100x more again",
	req: {infinity_points: 5e18},
	merge: [72],
}, {
	desc: "makes break infinity bulk buy 100x more again",
	req: {infinity_points: 5e20},
	merge: [73],
}, {
	desc: "makes break infinity bulk buy 100x more again",
	req: {infinity_points: 7.5e22},
	merge: [74],
}, {
	desc: "makes break infinity bulk buying scale based on your broken infinities",
	req: {infinity_points: 2.5e25},
	merge: [75],
}, {
	desc: "makes break infinity bulk buy scaling 2x greater",
	req: {infinity_points: 1e36},
	merge: [76],
}, {
	desc: "makes break infinity bulk buy scaling 2x greater again",
	req: {infinity_points: 1e55},
	merge: [77],
}, {
	desc: "makes break infinity bulk buy scaling 2x greater again",
	req: {infinity_points: 1e100},
	merge: [78],
}, {
	desc: "makes break infinity bulk buy scaling 2x greater again",
	req: {infinity_points: 1e175},
}, {
	desc() {
		if (game.infinity.milestones[79]) return "unlocks the TRUE ENDING";
		return "does... something...";
	},
	req: {infinity_points: 1.7976931348620926e308},
}];
